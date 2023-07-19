import type { Chic, ChicPlugin } from 'chic';

/** Get image data from a source by drawing it to a canvas and converting the pixel data into `rgba(r, g, b, a)` strings
 * @param image */
const generateRGBAStrings = (drawFont: Chic, data: Uint8ClampedArray) => {
  const hexStrs: string[] = [];
  let curPixel: number[] = [];
  for (let idx = 0; idx < data.length; idx++) {
    if (!(idx % 4)) curPixel = [];
    curPixel.push(data[idx]);
    if (curPixel.length < 4) continue;
    const rgba = `rgba(${curPixel.join(',')})`;
    hexStrs.push(drawFont.backgroundColor[rgba].border[`solid ${rgba} 5px`]());
  }
  return hexStrs;
};
// TODO: documentation
const install = (chic: Chic) => {
  // prettier-ignore
  const drawFont = chic
    .fontFamily.monospace
    .fontSize  ._10px
    .lineHeight._10px
    .margin    ._0
    .padding   ._0
    .fix();
  const drawStyle = drawFont();
  /** Draws an image to the console, if it is drawable to an HTML Canvas */
  return <DrawImage>(image => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    const { height, width } = parseDimensions(image);
    Object.assign(canvas, { height, width });
    ctx.drawImage(image, 0, 0);
    const { data } = ctx.getImageData(0, 0, width, height);
    const hexStyles = generateRGBAStrings(drawFont, data);
    const text = [];
    const styles = [];
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        text.push('  ');
        styles.push(hexStyles[col + row * width]);
      }
      text.push('\n');
      styles.push(drawStyle);
    }
    chic.log(text, ...styles);
  });
};

/** Get the height and width values as numbers from a CanvasImageSource
 * @param image */
const parseDimensions = (
  image: CanvasImageSource & { height?: number | SVGAnimatedLength; width?: number | SVGAnimatedLength }
) => {
  let { height = 0, width = 0 } = image;
  if (height instanceof SVGAnimatedLength) height = height.animVal.value;
  if (width instanceof SVGAnimatedLength) width = width.animVal.value;
  if (height * width > 65355) throw new TypeError('Image too large for Chic to render');
  return { height, width };
};

// TODO: documentation
const drawImage = <ChicPlugin>{ id: 'drawImage', install };

export { drawImage };

/** Draws an image to the console. Works best with small pixel artwork no larger than 256 x 256 (or approximately 65,536 pixels). Internally uses an `HTMLCanvasElement` to obtain pixel color data. */
export interface DrawImage {
  (image: CanvasImageSource): void;
}

declare module 'chic' {
  interface ChicPlugins {
    /** Draws an image to the console. Works best with small pixel artwork no larger than 256 x 256 (or approximately 65,536 pixels). Internally uses an `HTMLCanvasElement` to obtain pixel color data.
     * @internal */
    drawImage: DrawImage;
  }
}
