/*
  Generates public/og.jpg — the social share card.

  Run after changing the photo or the strings below:  node scripts/og.mjs

  Uses sharp (already a dependency) rather than a headless browser: the card is
  a flat composite, so a full renderer would be a dependency for nothing.
  Latin-only text, so it does not depend on a Korean font being installed.
*/
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const W = 1200;
const H = 630;
const AVATAR = 280;

const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#0d1117"/>
  <rect x="0" y="0" width="${W}" height="6" fill="#3fb950"/>
</svg>`);

const mono = 'Consolas, ui-monospace, monospace';
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="520" y="250" font-family="${mono}" font-size="26" fill="#8b949e">
    <tspan fill="#3fb950">$</tspan> whoami
  </text>
  <text x="520" y="322" font-family="${mono}" font-size="58" font-weight="700" fill="#e6edf3">Seongjae Kim</text>
  <text x="520" y="378" font-family="${mono}" font-size="28" fill="#58a6ff">product owner · 11 years</text>
  <text x="520" y="452" font-family="${mono}" font-size="24" fill="#8b949e">felixproduct.com</text>
</svg>`);

// Circular mask for the photo.
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${AVATAR}" height="${AVATAR}">
  <circle cx="${AVATAR / 2}" cy="${AVATAR / 2}" r="${AVATAR / 2}" fill="#fff"/>
</svg>`);

const avatar = await sharp(readFileSync('public/profile.jpg'))
	.resize(AVATAR, AVATAR, { fit: 'cover' })
	.composite([{ input: mask, blend: 'dest-in' }])
	.png()
	.toBuffer();

const out = await sharp(bg)
	.composite([
		{ input: avatar, top: Math.round((H - AVATAR) / 2), left: 150 },
		{ input: text, top: 0, left: 0 },
	])
	.jpeg({ quality: 88 })
	.toBuffer();

writeFileSync('public/og.jpg', out);
console.log(`public/og.jpg written (${(out.length / 1024).toFixed(0)} KB)`);
