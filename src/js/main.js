import { loadHeaderFooter } from './utils.mjs';
import { initNewsletter } from './newsletter.mjs';
import Alert from './Alert.js';

async function init() {
  await loadHeaderFooter();
  initNewsletter();

  const alertSystem = new Alert();
  await alertSystem.init();
}

init();
