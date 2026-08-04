// Vercel Edge Middleware
// Redirects visitors hitting the root "/" straight to the right region,
// based on the country Vercel's edge network detects automatically.
// Philippines -> /ph/   |   everyone else -> /global/

export const config = {
  matcher: '/',
};

export default function middleware(request) {
  const country = request.headers.get('x-vercel-ip-country') || '';
  const url = new URL(request.url);

  url.pathname = country === 'PH' ? '/ph/' : '/global/';

  return Response.redirect(url, 307);
}
