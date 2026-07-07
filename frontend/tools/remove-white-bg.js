import sharp from 'sharp';
import fs from 'fs';

const input = new URL('../public/ChatGPT Image Apr 23, 2026, 11_16_22 PM.png', import.meta.url);
const output = new URL('../public/bg-transparent.png', import.meta.url);

(async () => {
  if (!fs.existsSync(input)) {
    console.error('Input image not found:', input.pathname);
    process.exit(1);
  }

  try {
    const img = sharp(input.pathname).ensureAlpha();
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

    // Replace nearly-white pixels with transparent
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = info.channels === 4 ? data[i + 3] : 255;
      // consider pixel white if r,g,b all > 240
      if (r > 240 && g > 240 && b > 240) {
        if (info.channels === 4) data[i + 3] = 0; // set alpha to 0
      }
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
      .png()
      .toFile(output.pathname);

    console.log('Saved transparent image to', output.pathname);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();