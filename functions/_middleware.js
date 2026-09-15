/**
 * www.<host> → <host> 301. Pages _redirects only match paths, not Host.
 */
export const onRequest = ({ request, next }) => {
  const url = new URL(request.url);
  if (!url.hostname.startsWith('www.')) return next();
  url.hostname = url.hostname.slice(4);
  return Response.redirect(url.toString(), 301);
};
