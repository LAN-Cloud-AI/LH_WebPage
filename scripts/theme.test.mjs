import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../public/theme-init.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function browser({ dark = false, saved = null, legacy = null, denied = false, hostname = 'localhost', protocol = 'https:', cookie = '', cookieDenied = false } = {}) {
  const events = {};
  const media = { matches: dark, addEventListener: (_name, listener) => { events.media = listener; } };
  const root = { dataset: {}, style: {} };
  const meta = { content: '', setAttribute: (_name, value) => { meta.content = value; } };
  const storage = new Map([
    ...(saved === null ? [] : [['lancloud.theme', saved]]),
    ...(legacy === null ? [] : [['lh-theme', legacy]]),
  ]);
  const localStorage = {
    getItem: (key) => { if (denied) throw Error('denied'); return storage.get(key) ?? null; },
    setItem: (key, value) => { if (denied) throw Error('denied'); storage.set(key, value); },
    removeItem: (key) => { if (denied) throw Error('denied'); storage.delete(key); },
  };
  const dispatched = [];
  const window = { matchMedia: () => media, addEventListener: (name, listener) => { events[name] = listener; }, dispatchEvent: (event) => { dispatched.push(event); } };
  class CustomEvent { constructor(type, options) { this.type = type; this.detail = options.detail; } }
  const cookieWrites = [];
  let jar = cookie;
  const document = {
    documentElement: root, querySelector: () => meta, hidden: false,
    addEventListener: (name, listener) => { events[name] = listener; },
    get cookie() { if (cookieDenied) throw Error('denied'); return jar; },
    set cookie(value) { if (cookieDenied) throw Error('denied'); cookieWrites.push(value); jar = value.split(';')[0]; },
  };
  vm.runInNewContext(source, { window, document, localStorage, CustomEvent, location: { hostname, protocol } });
  return {
    root, meta, storage, dispatched, cookieWrites, controller: window.__lhTheme,
    system(next) { media.matches = next; events.media(); },
    storageEvent(key, newValue) { events.storage({ key, newValue }); },
    cookie(value) { jar = value; },
    restore() { events.pageshow(); },
    visibility(hidden) { document.hidden = hidden; events.visibilitychange(); },
  };
}

function expectTheme(page, theme, preference = 'system') {
  assert.equal(page.root.dataset.theme, theme);
  assert.equal(page.root.dataset.themePreference, preference);
  assert.equal(page.root.style.colorScheme, theme);
  assert.equal(page.meta.content, theme === 'dark' ? '#080b11' : '#f3f5f8');
  assert.equal(page.controller.getSnapshot().theme, theme);
}

test('first paint follows light/dark systems with no preference, invalid values, or denied storage', () => {
  for (const dark of [false, true]) {
    for (const options of [{}, { saved: 'invalid' }, { saved: 'system' }, { denied: true }]) {
      expectTheme(browser({ dark, ...options }), dark ? 'dark' : 'light');
    }
  }
  assert.ok(html.indexOf('src="/theme-init.js"') < html.indexOf('src="/src/main.tsx"'));
  assert.equal((html.match(/name="theme-color"/g) || []).length, 1);
});

test('existing explicit preferences survive opposite system settings and system changes', () => {
  for (const saved of ['light', 'dark']) {
    const page = browser({ dark: saved === 'light', saved });
    expectTheme(page, saved, saved);
    page.system(saved !== 'light');
    expectTheme(page, saved, saved);
  }
});

test('runtime system changes update subscribers; explicit choices freeze them until system is selected', () => {
  const page = browser();
  let notifications = 0;
  const unsubscribe = page.controller.subscribe(() => notifications++);
  page.system(true);
  expectTheme(page, 'dark');
  page.controller.setPreference('light');
  expectTheme(page, 'light', 'light');
  assert.equal(page.storage.get('lancloud.theme'), 'light');
  page.system(false);
  page.system(true);
  expectTheme(page, 'light', 'light');
  assert.equal(notifications, 2);
  page.controller.setPreference('system');
  expectTheme(page, 'dark');
  assert.equal(page.storage.get('lancloud.theme'), 'system');
  unsubscribe();
  page.system(false);
  expectTheme(page, 'light');
  assert.equal(notifications, 3);
});

test('cross-tab changes and clearing storage update theme without accepting unrelated events', () => {
  const page = browser();
  page.storageEvent('lancloud.theme', 'dark');
  expectTheme(page, 'dark', 'dark');
  page.storageEvent('other-key', 'light');
  expectTheme(page, 'dark', 'dark');
  page.storageEvent('lancloud.theme', null);
  expectTheme(page, 'light');
  page.controller.setPreference('dark');
  page.storageEvent(null, null);
  expectTheme(page, 'light');
});

test('storage failure does not prevent an explicit choice or returning to the system', () => {
  const page = browser({ dark: true, denied: true });
  page.controller.setPreference('light');
  expectTheme(page, 'light', 'light');
  page.controller.setPreference('system');
  expectTheme(page, 'dark');
});

test('migrates the earlier preference without overriding a newer choice or resurrecting system mode', () => {
  const migrated = browser({ dark: false, legacy: 'dark' });
  expectTheme(migrated, 'dark', 'dark');
  assert.equal(migrated.storage.get('lancloud.theme'), 'dark');
  assert.equal(migrated.storage.has('lh-theme'), false);
  migrated.controller.setPreference('system');
  expectTheme(migrated, 'light');
  const current = browser({ dark: true, saved: 'light', legacy: 'dark' });
  expectTheme(current, 'light', 'light');
  assert.equal(current.storage.has('lh-theme'), false);
  expectTheme(browser({ saved: 'system', legacy: 'dark' }), 'light');
});

test('announces resolved theme and preference through the company-wide event contract', () => {
  const page = browser();
  assert.equal(page.dispatched[0].type, 'lan:theme-change');
  assert.equal(page.dispatched[0].detail.theme, 'light');
  assert.equal(page.dispatched[0].detail.preference, 'system');
  page.controller.setPreference('dark');
  assert.equal(page.dispatched.at(-1).detail.theme, 'dark');
  assert.equal(page.dispatched.at(-1).detail.preference, 'dark');
  const count = page.dispatched.length;
  page.system(true);
  assert.equal(page.dispatched.length, count);
});

test('company subdomains prioritize the shared preference cookie over stale local choices before paint', () => {
  expectTheme(browser({ hostname: 'leadshunter.lancloudtech.com', saved: 'dark', cookie: 'other=1; lancloud_theme=light' }), 'light', 'light');
  expectTheme(browser({ hostname: 'leadshunter.lancloudtech.com', saved: 'dark', cookie: 'lancloud_theme=system' }), 'light');
  expectTheme(browser({ hostname: 'leadshunter.lancloudtech.com', saved: 'light', cookie: 'lancloud_theme=invalid' }), 'light', 'light');
  expectTheme(browser({ hostname: 'localhost', saved: 'light', cookie: 'lancloud_theme=dark' }), 'light', 'light');
  expectTheme(browser({ hostname: 'notlancloudtech.com', saved: 'light', cookie: 'lancloud_theme=dark' }), 'light', 'light');
});

test('explicit choices and system mode persist a shared secure preference on the production domain only', () => {
  const page = browser({ hostname: 'leadshunter.lancloudtech.com' });
  page.controller.setPreference('dark');
  assert.equal(page.cookieWrites.at(-1), 'lancloud_theme=dark; Domain=lancloudtech.com; Path=/; Max-Age=31536000; SameSite=Lax; Secure');
  page.controller.setPreference('system');
  assert.equal(page.storage.get('lancloud.theme'), 'system');
  assert.match(page.cookieWrites.at(-1), /^lancloud_theme=system;/);
  const local = browser();
  local.controller.setPreference('dark');
  assert.equal(local.cookieWrites.length, 0);
});

test('returning from another subdomain updates the resolved theme on visibility and back-forward restore', () => {
  const page = browser({ hostname: 'leadshunter.lancloudtech.com', cookie: 'lancloud_theme=light' });
  page.cookie('lancloud_theme=dark');
  page.visibility(true);
  expectTheme(page, 'light', 'light');
  page.visibility(false);
  expectTheme(page, 'dark', 'dark');
  page.cookie('lancloud_theme=system');
  page.restore();
  expectTheme(page, 'light');
  page.system(true);
  expectTheme(page, 'dark');
});

test('blocked cookies or local storage do not prevent explicit choices or the remaining persistence option', () => {
  const page = browser({ hostname: 'leadshunter.lancloudtech.com', cookieDenied: true });
  page.controller.setPreference('light');
  expectTheme(page, 'light', 'light');
  assert.equal(page.storage.get('lancloud.theme'), 'light');
  const cookiesOnly = browser({ hostname: 'leadshunter.lancloudtech.com', denied: true, cookie: 'lancloud_theme=dark' });
  expectTheme(cookiesOnly, 'dark', 'dark');
  cookiesOnly.controller.setPreference('light');
  expectTheme(cookiesOnly, 'light', 'light');
  assert.match(cookiesOnly.cookieWrites.at(-1), /^lancloud_theme=light;/);
});
