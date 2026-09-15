/**
 * Bind a LeadsHunter Pages host and its www alias.
 * www.<host> CNAME → <project>.pages.dev (proxied).
 * Hostname 301 is functions/_middleware.js (Pages _redirects ignore Host).
 */
import { loadCloudflarePagesEnv } from './load-cloudflare-pages-env.mjs';

loadCloudflarePagesEnv();

const ZONE_NAME = 'lancloudtech.com';
const HOST = process.env.CF_PAGES_HOST || 'leadshunter.lancloudtech.com';
const WWW_HOST = `www.${HOST}`;
const PAGES_PROJECT = process.env.CF_PAGES_PROJECT || 'leadshunter-webpage';
const PAGES_TARGET = process.env.CF_PAGES_TARGET || `${PAGES_PROJECT}.pages.dev`;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;

if (!token) {
  console.error('Need ~/.config/lanxin/env/cloudflare/pages.env (or CLOUDFLARE_API_TOKEN with Pages + DNS).');
  process.exit(1);
}

const api = async (path, { method = 'GET', body } = {}) => {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(`${method} ${path}: ${JSON.stringify(data.errors)}`);
  }
  return data.result;
};

const zones = await api(`/zones?name=${ZONE_NAME}`);
const zoneId = zones[0]?.id;
if (!zoneId) throw new Error(`Zone not found: ${ZONE_NAME}`);

const upsertCname = async (name) => {
  for (const type of ['A', 'AAAA']) {
    const records = await api(`/zones/${zoneId}/dns_records?type=${type}&name=${name}`);
    for (const rec of records) {
      await api(`/zones/${zoneId}/dns_records/${rec.id}`, { method: 'DELETE' });
      console.log('deleted', type, name);
    }
  }

  const cnames = await api(`/zones/${zoneId}/dns_records?type=CNAME&name=${name}`);
  const cnamePayload = {
    type: 'CNAME',
    name,
    content: PAGES_TARGET,
    ttl: 1,
    proxied: true,
  };

  if (cnames[0]) {
    const updated = await api(`/zones/${zoneId}/dns_records/${cnames[0].id}`, {
      method: 'PATCH',
      body: cnamePayload,
    });
    console.log('updated CNAME', name, '→', updated.content, 'proxied=', updated.proxied);
  } else {
    const created = await api(`/zones/${zoneId}/dns_records`, {
      method: 'POST',
      body: cnamePayload,
    });
    console.log('created CNAME', name, '→', created.content, 'proxied=', created.proxied);
  }
};

const attachPagesDomain = async (name) => {
  if (!ACCOUNT_ID) return;
  const domains = await api(`/accounts/${ACCOUNT_ID}/pages/projects/${PAGES_PROJECT}/domains`);
  const list = Array.isArray(domains) ? domains : [];
  const has = list.some((item) => item.name === name);
  if (!has) {
    await api(`/accounts/${ACCOUNT_ID}/pages/projects/${PAGES_PROJECT}/domains`, {
      method: 'POST',
      body: { name },
    });
    console.log('attached Pages custom domain', name);
  } else {
    console.log('Pages custom domain already attached', name);
  }
};

for (const name of [HOST, WWW_HOST]) {
  await upsertCname(name);
  await attachPagesDomain(name);
}

console.log('leadshunter DNS ready →', PAGES_TARGET, '(orange cloud); www 301 via Pages middleware');
