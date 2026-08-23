export const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

export const getSiteUrl = () => {
  const configuredUrl = process.env.SITE_URL || process.env.URL || 'http://localhost:8888';
  const siteUrl = new URL(configuredUrl);

  if (!['http:', 'https:'].includes(siteUrl.protocol)) {
    throw new Error('SITE_URL must use http or https.');
  }

  return siteUrl.origin;
};
