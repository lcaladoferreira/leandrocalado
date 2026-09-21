import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(`dist/${file}`, 'utf8');
const amazonAnchor = /<a\b[^>]*href="https:\/\/www\.amazon\.com\/dp\/B0HHHDL9TB"[^>]*>/;
const bookPath = '/books/nobody-told-it-to-lie';
for (const lang of ['', 'pt/', 'es/', 'fr/', 'it/', 'ja/']) {
  for (const route of ['ai-crime-files', 'ai-crime-files/agent-invented-humans-malware-github']) {
    for (const suffix of ['.html', '/index.html']) {
      const file = `${lang}${route}${suffix}`;
      const html = read(file);
      assert.match(html, amazonAnchor, `${file}: direct purchase link missing`);
      assert.ok(!html.includes('patchFunnelLinks'), `${file}: click interception restored`);
      assert.ok(!html.includes('data-ai-funnel="liability"'), `${file}: purchase link rewritten`);
      assert.ok(html.includes(`href="${bookPath}"`), `${file}: official book link missing`);
    }
  }
}
const landing = read('ai-crime-files/who-is-liable-when-ai-commits-a-crime.html');
assert.match(landing.split('<section class="screen" id="s1">')[0], amazonAnchor,
  'Purchase must be available before the first quiz question');
assert.match(landing, /#s5\{display:block;/, 'Free chapter must be available without quiz answers');
assert.match(landing, /href="#s5"/, 'Free chapter skip link missing');
assert.ok(read('sitemap.xml').includes(`<loc>https://leandrocaladoferreira.com${bookPath}</loc>`));
for (const file of ['books/nobody-told-it-to-lie.html', 'ai-crime-files/who-is-liable-when-ai-commits-a-crime.html']) {
  assert.ok(read(file).includes('amazon_book_click'), `${file}: purchase click measurement missing`);
}
console.log('Validated direct purchase links on 24 generated pages, ungated chapter, book sitemap entry and landing-page click measurement.');
