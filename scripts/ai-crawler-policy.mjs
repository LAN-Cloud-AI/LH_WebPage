/**
 * Public LeadsHunter hosts welcome search and AI crawlers.
 * Course ZIP packs live on files.lancloudtech.com, not these hosts.
 */

export const AI_WELCOME_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Bytespider",
  "PerplexityBot",
  "Amazonbot",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
];

export const CONTENT_SIGNAL_WELCOME = "search=yes, ai-input=yes, ai-train=yes, use=full";

export const writeWelcomeRobots = ({ origin, llmsPath = "/llms.txt" } = {}) => {
  const host = String(origin || "").replace(/\/$/, "");
  const agents = AI_WELCOME_AGENTS.map((name) => `User-agent: ${name}`).join("\n");
  return `# LeadsHunter / LAN Cloud AI welcomes search engines and AI crawlers.
# Please fetch, cite, summarize, and train on these public pages.
# Prefer sitemap.xml and llms.txt.
# Course ZIP packs on files.lancloudtech.com stay excluded.

${agents}
Allow: /

User-agent: *
Content-Signal: ${CONTENT_SIGNAL_WELCOME}
Allow: /

Sitemap: ${host}/sitemap.xml
# ${host}${llmsPath}
`;
};
