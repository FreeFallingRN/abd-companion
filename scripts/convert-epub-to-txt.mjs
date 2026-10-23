import fs from 'fs';
import path from 'path';

const baseDir = process.cwd();
const extractedOebps = path.join(baseDir, '_archive', 'epub_extracted', 'OEBPS');
const outputDir = path.join(baseDir, 'chapters');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to decode HTML entities
function decodeHtml(html) {
  let prev;
  let curr = html;
  // Multi-pass decoding in case of double-escaped entities
  for (let i = 0; i < 3; i++) {
    prev = curr;
    curr = curr
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&#x2019;|&#8217;/g, "’")
      .replace(/&#x2018;|&#8216;/g, "‘")
      .replace(/&#x201C;|&#8220;/g, "“")
      .replace(/&#x201D;|&#8221;/g, "”")
      .replace(/&#x2013;|&#8211;/g, "–")
      .replace(/&#x2014;|&#8212;/g, "—")
      .replace(/&#x2026;|&#8230;/g, "…")
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    if (prev === curr) break;
  }
  return curr;
}

// Convert HTML to clean text
function htmlToText(html) {
  // Remove scripts, styles, and HTML comments
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Extract content inside <div id="article"> or <body> if present
  const articleMatch = text.match(/<div id="article">([\s\S]*?)<\/div>/i);
  if (articleMatch) {
    text = articleMatch[1];
  } else {
    const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) text = bodyMatch[1];
  }

  // Convert paragraph and break tags to newlines
  text = text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<[^>]+>/g, '');

  // Decode entities
  text = decodeHtml(text);

  // Clean extra whitespace
  const lines = text.split('\n').map((l) => l.trimEnd());
  const cleanLines = [];
  let prevBlank = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (!prevBlank) {
        cleanLines.push('');
        prevBlank = true;
      }
    } else {
      cleanLines.push(trimmed);
      prevBlank = false;
    }
  }

  return cleanLines.join('\n').trim();
}

// Sanitize filename
function sanitizeFilename(str) {
  return str
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function run() {
  console.log('Reading Table of Contents from toc.ncx...');
  const tocPath = path.join(extractedOebps, 'toc.ncx');
  if (!fs.existsSync(tocPath)) {
    console.error('toc.ncx not found in', extractedOebps);
    process.exit(1);
  }

  const tocContent = fs.readFileSync(tocPath, 'utf8');

  // Match navPoints: <navPoint ... playOrder="1" ...> <navLabel><text>(.*?)</text></navLabel> <content src="(.*?)" />
  const navRegex = /<navPoint[^>]*playOrder="(\d+)"[^>]*>[\s\S]*?<navLabel>\s*<text>(.*?)<\/text>\s*<\/navLabel>[\s\S]*?<content src="(.*?)"\s*\/>/gi;

  const chapters = [];
  let match;
  while ((match = navRegex.exec(tocContent)) !== null) {
    const playOrder = parseInt(match[1], 10);
    const title = decodeHtml(match[2].trim());
    const src = match[3].trim();
    chapters.push({ playOrder, title, src });
  }

  console.log(`Discovered ${chapters.length} chapters in Table of Contents.`);

  let processedCount = 0;

  for (const ch of chapters) {
    const htmlFile = path.join(extractedOebps, ch.src);
    if (!fs.existsSync(htmlFile)) {
      console.warn(`File not found: ${ch.src}`);
      continue;
    }

    const htmlContent = fs.readFileSync(htmlFile, 'utf8');
    const plainText = htmlToText(htmlContent);

    // Format pad number, e.g. 001, 002...
    const padNum = String(ch.playOrder).padStart(3, '0');
    
    // Clean title for filename
    let cleanTitle = sanitizeFilename(ch.title);
    // If title starts with CH.1:, replace with cleaner format
    cleanTitle = cleanTitle.replace(/^CH\.?\s*\d+\s*[:\-]\s*/i, '');
    
    const fileName = `Chapter_${padNum} - ${cleanTitle}.txt`;
    const outputPath = path.join(outputDir, fileName);

    // Format content with header
    const fileHeader = `================================================================================\nCHAPTER ${ch.playOrder}: ${cleanTitle}\n================================================================================\n\n`;
    fs.writeFileSync(outputPath, fileHeader + plainText + '\n', 'utf8');
    processedCount++;
  }

  console.log(`\n✓ Successfully converted ${processedCount} chapters into: ${outputDir}`);
}

run().catch((err) => {
  console.error('Extraction error:', err);
  process.exit(1);
});
