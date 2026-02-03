import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      prerender: { default: true },
      strict: true
    }),
    paths: {
      base: dev ? '' : '/portfolio_website'
    }
  }
};

export default config;
