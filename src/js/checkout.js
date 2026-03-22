import { loadHeaderFooter } from './utils.mjs';
import { initNewsletter } from './newsletter.mjs';

async function init() {
  await loadHeaderFooter();
  initNewsletter();
}

init();
