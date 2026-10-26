const copy = {
  'zh-Hans': {
    company: '兰芯云朵官网',
    domestic: '线索猎手（中国版）',
    global: 'LeadsHunter Global',
    appstore: '应用商店',
  },
  'zh-Hant': {
    company: '蘭芯雲朵官網',
    domestic: '線索獵手（中國版）',
    global: 'LeadsHunter Global',
    appstore: '應用商店',
  },
  en: {
    company: 'LAN Cloud AI',
    domestic: 'LeadsHunter (China)',
    global: 'LeadsHunter Global',
    appstore: 'App Store',
  },
};

export function relatedSites(locale) {
  const labels = copy[locale];
  if (!labels) throw new Error(`Unsupported related-site locale: ${locale}`);
  const companyPath = locale === 'en' ? 'en/' : locale === 'zh-Hant' ? 'zh-Hant/' : '';
  const globalPath = locale === 'zh-Hans' ? 'zh-Hans/' : locale === 'zh-Hant' ? 'zh-Hant/' : '';
  return [
    { id: 'company', href: `https://lancloudtech.com/${companyPath}`, label: labels.company },
    { id: 'domestic', href: `https://leadshunter.lancloudtech.com/${companyPath}`, label: labels.domestic },
    { id: 'global', href: `https://global-leadshunter.lancloudtech.com/${globalPath}`, label: labels.global },
    { id: 'appstore', href: 'https://appstore.lancloudtech.com/', label: labels.appstore },
  ];
}
