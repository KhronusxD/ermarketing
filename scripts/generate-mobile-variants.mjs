/**
 * Generates -sm.avif + -sm.jpg variants of every /public/photos-food/*.jpg.
 * Mobile UAs get the smaller variant via <source media="(max-width: 768px)">.
 *
 * Run: node scripts/generate-mobile-variants.mjs
 */
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = path.resolve('public/photos-food');
const TARGET_W = 480; // 2x of typical mobile render box (~240px CSS width)
const AVIF_QUALITY = 50;
const JPG_QUALITY = 72;

const files = (await readdir(SRC_DIR)).filter(
    (f) => f.endsWith('.jpg') && !f.endsWith('-sm.jpg'),
);

for (const f of files) {
    const base = f.replace(/\.jpg$/, '');
    const inPath = path.join(SRC_DIR, f);
    const avifOut = path.join(SRC_DIR, `${base}-sm.avif`);
    const jpgOut = path.join(SRC_DIR, `${base}-sm.jpg`);

    const meta = await sharp(inPath).metadata();
    const w = Math.min(TARGET_W, meta.width ?? TARGET_W);

    await sharp(inPath).resize({ width: w }).avif({ quality: AVIF_QUALITY }).toFile(avifOut);
    await sharp(inPath).resize({ width: w }).jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(jpgOut);

    const [a, j] = await Promise.all([stat(avifOut), stat(jpgOut)]);
    console.log(`${f.padEnd(10)} -> ${base}-sm.avif (${(a.size / 1024).toFixed(0)} KiB) | ${base}-sm.jpg (${(j.size / 1024).toFixed(0)} KiB)`);
}
