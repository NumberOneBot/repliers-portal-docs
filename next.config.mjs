import nextra from 'nextra';

const withNextra = nextra({
  defaultShowCopyCode: true,
});

// Static GitHub Pages export is opt-in so in-monorepo dev/build/start stays unchanged.
// The standalone Pages repo enables it via PAGES_DEPLOY=1 (set in .github/workflows/deploy.yml).
const pagesDeploy = process.env.PAGES_DEPLOY === '1';

// Project-page path https://<user>.github.io/repliers-portal-docs/ (empty for a custom domain).
const basePath = pagesDeploy ? '/repliers-portal-docs' : '';

export default withNextra({
  reactStrictMode: true,
  // export → static HTML in out/; unoptimized images (Pages has no Image Optimization endpoint).
  ...(pagesDeploy && { output: 'export', images: { unoptimized: true } }),
  basePath,
  // Exposed so hardcoded asset paths (logo/favicon) can be prefixed in the layout.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
});
