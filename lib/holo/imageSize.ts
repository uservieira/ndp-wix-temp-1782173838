// Reads type and pixel size from the first bytes of an image. Only the raster formats
// we accept from Holo are recognised; anything else (SVG, HTML, unknown) returns null.
export type ImageInfo = { ext: 'png' | 'jpg' | 'gif' | 'webp' | 'avif'; width: number; height: number };

export function imageInfo(b: Buffer): ImageInfo | null {
  try {
    if (b.length < 30) return null;
    // PNG
    if (b.readUInt32BE(0) === 0x89504e47 && b.readUInt32BE(4) === 0x0d0a1a0a) {
      return ok('png', b.readUInt32BE(16), b.readUInt32BE(20));
    }
    // GIF
    const head = b.toString('latin1', 0, 6);
    if (head === 'GIF87a' || head === 'GIF89a') return ok('gif', b.readUInt16LE(6), b.readUInt16LE(8));
    // JPEG: walk the segments to the start-of-frame marker.
    if (b[0] === 0xff && b[1] === 0xd8) {
      let o = 2;
      while (o + 9 < b.length) {
        if (b[o] !== 0xff) { o++; continue; }
        const m = b[o + 1];
        if (m === 0xff) { o++; continue; }
        if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { o += 2; continue; }
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
          return ok('jpg', b.readUInt16BE(o + 7), b.readUInt16BE(o + 5));
        }
        o += 2 + b.readUInt16BE(o + 2);
      }
      return null;
    }
    // WebP
    if (b.toString('latin1', 0, 4) === 'RIFF' && b.toString('latin1', 8, 12) === 'WEBP') {
      const chunk = b.toString('latin1', 12, 16);
      if (chunk === 'VP8 ') return ok('webp', b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff);
      if (chunk === 'VP8L') {
        const bits = b.readUInt32LE(21);
        return ok('webp', (bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1);
      }
      if (chunk === 'VP8X') return ok('webp', 1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3));
      return null;
    }
    // AVIF
    if (b.toString('latin1', 4, 8) === 'ftyp' && /^avi[fs]$/.test(b.toString('latin1', 8, 12))) {
      const i = b.indexOf('ispe', 0, 'latin1');
      if (i > 0 && i + 16 <= b.length) return ok('avif', b.readUInt32BE(i + 8), b.readUInt32BE(i + 12));
      return null;
    }
    return null;
  } catch {
    return null;
  }
}

function ok(ext: ImageInfo['ext'], width: number, height: number): ImageInfo | null {
  return width > 0 && height > 0 && width <= 20000 && height <= 20000 ? { ext, width, height } : null;
}
