import type { ChicPlugin } from 'chic';
declare const drawImage: ChicPlugin;
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
