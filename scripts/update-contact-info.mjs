import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const PUBLIC_DIR = join(process.cwd(), 'public');

async function updateContactInfo() {
  const files = await readdir(PUBLIC_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html'));

  let totalReplacements = 0;

  for (const file of htmlFiles) {
    const filePath = join(PUBLIC_DIR, file);
    let content = await readFile(filePath, 'utf-8');
    const original = content;

    // === PHONE NUMBERS ===

    // Footer phone: replace both phone number lines with single number
    // Pattern 1: Two lines with (888) 456 7890 and (888) 1234-4567
    content = content.replace(
      /<a href="tel:8884567890" class="rt-text-soft-grey rt-footer-link[^"]*">\(888\) 456 7890<\/a>\s*\n\s*<a href="tel:88812344567" class="rt-text-soft-grey rt-footer-link[^"]*">\(888\) 1234-4567<\/a>/g,
      '<a href="tel:+971563318899" class="rt-text-soft-grey rt-footer-link">+971 56 331 8899</a>'
    );

    // Contact page phone links: (888)123-4567
    content = content.replace(
      /<a href="tel:8881234567">\(888\)123-4567<\/a>/g,
      '<a href="tel:+971563318899">+971 56 331 8899</a>'
    );

    // Service-two phone with rt-number-text class
    content = content.replace(
      /<a href="tel:8881234567" class="rt-number-text">\(888\) 123 4567<\/a>/g,
      '<a href="tel:+971563318899" class="rt-number-text">+971 56 331 8899</a>'
    );

    // Overview phone number text
    content = content.replace(
      /class="rt-number-text rt-number--one">\(888\) 123 4567</g,
      'class="rt-number-text rt-number--one">+971 56 331 8899'
    );
    content = content.replace(
      /class="rt-number-text rt-number-two">\(888\) 123 4567</g,
      'class="rt-number-text rt-number-two">+971 56 331 8899'
    );

    // "Call us" button text
    content = content.replace(
      /Call us: \+\(888\) 123 4567/g,
      'Call us: +971 56 331 8899'
    );

    // Phone button wrapper href
    content = content.replace(
      /href="tel:8881234567"/g,
      'href="tel:+971563318899"'
    );

    // === EMAIL ===
    content = content.replace(
      /<a href="mailto:info@example\.com" class="rt-text-soft-grey rt-footer-link rt-text-underline">info@example\.com<\/a>/g,
      '<a href="mailto:m.tarik@detroitholding.com" class="rt-text-soft-grey rt-footer-link rt-text-underline">m.tarik@detroitholding.com</a>\n<a href="mailto:m.oumekki@detroitholding.com" class="rt-text-soft-grey rt-footer-link rt-text-underline">m.oumekki@detroitholding.com</a>'
    );

    // Also check for email in contact page body areas (non-footer)
    content = content.replace(
      /info@example\.com/g,
      'm.tarik@detroitholding.com'
    );

    // === ADDRESS ===
    content = content.replace(
      /410 Sandtown, California 94001, USA/g,
      'Office 204-404, National Company of General Insurances<br>Dubai, UAE'
    );

    // Also replace plain text address (for contact pages that may use different format)
    content = content.replace(
      /410 Sandtown, California<br\s*\/?>94001, USA/g,
      'Office 204-404, National Company of General Insurances<br>Dubai, UAE'
    );

    // === COPYRIGHT / CREDIT ===
    content = content.replace(
      /<div class="rt-text-soft-grey">Designed by <a href="https:\/\/www\.radianttemplates\.com\/"><span class="rt-text-soft-grey rt-footer-link">Radiant Templates<\/span><\/a>, Powered by <a href="https:\/\/webflow\.com\/"><span class="rt-text-soft-grey rt-footer-link">Webflow<\/span><\/a>\s*\n?\s*<\/div>/g,
      '<div class="rt-text-soft-grey">\u00A9 2025 DETROIT HOLDING. ALL RIGHTS RESERVED.</div>'
    );

    if (content !== original) {
      await writeFile(filePath, content, 'utf-8');
      totalReplacements++;
      console.log(`Updated: ${file}`);
    } else {
      console.log(`No changes: ${file}`);
    }
  }

  console.log(`\nDone! Updated ${totalReplacements} files.`);
}

updateContactInfo().catch(console.error);
