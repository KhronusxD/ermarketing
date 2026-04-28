/**
 * Generates -sm.avif + -sm.jpg variants of every JPG in:
 *   /public/photos-food/  — gallery + hero LCP candidates
 *   /public/video-posters/ — <video poster> images on the LP hero/cases
 *
 * Mobile UAs get the smaller variant via <source media="(max-width: 768px)">.
 *
 * Run: node scripts/generate-mobile-variants.mjs
 */
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const TARGETS = [
    {
        dir: path.resolve('public/photos-food'),
        targetW: 480, // 2x of ~240px CSS render box on mobile
        avifQuality: 38, // Lighthouse asked for ~50% more compression on p-1-sm.avif; AVIF holds up well at 38
        jpgQuality: 70,
    },
    {
        dir: path.resolve('public/video-posters'),
        // Lighthouse measured the hero poster at 307×547 CSS px on Moto G Power
        // (slow 4G simulation). 384 wide gives ~1.25× headroom over a 307 box,
        // covering 1.5× DPR cleanly without overshooting and burning bytes on
        // a poster that is hidden the moment the video starts playing.
        targetW: 384,
        avifQuality: 40,
        jpgQuality: 70,
    },
];

for (const { dir, targetW, avifQuality, jpgQuality } of TARGETS) {
    const files = (await readdir(dir)).filter(
        (f) => f.endsWith('.jpg') && !f.endsWith('-sm.jpg'),
    );
    console.log(`\n[${path.basename(dir)}] target ${targetW}px, avif q${avifQuality}, jpg q${jpgQuality}`);
    for (const f of files) {
        const base = f.replace(/\.jpg$/, '');
        const inPath = path.join(dir, f);
        const avifOut = path.join(dir, `${base}-sm.avif`);
        const jpgOut = path.join(dir, `${base}-sm.jpg`);

        const meta = await sharp(inPath).metadata();
        const w = Math.min(targetW, meta.width ?? targetW);

        await sharp(inPath).resize({ width: w }).avif({ quality: avifQuality }).toFile(avifOut);
        await sharp(inPath).resize({ width: w }).jpeg({ quality: jpgQuality, mozjpeg: true }).toFile(jpgOut);

        const [a, j] = await Promise.all([stat(avifOut), stat(jpgOut)]);
        console.log(`  ${f.padEnd(28)} -> ${base}-sm.avif (${(a.size / 1024).toFixed(0)} KiB) | ${base}-sm.jpg (${(j.size / 1024).toFixed(0)} KiB)`);
    }
}
