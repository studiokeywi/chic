const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
/** Allows you to draw an image to the console via Chic */
const drawImage = {
    install: chic => {
        const drawFont = chic.fontFamily.monospace.fontSize._10px.lineHeight._10px.margin._0.padding._0.fix();
        // TODO: figure out how to apply intellisense from here to actual object, if possible
        /** Draws an image to the console, if it is drawable to an HTML Canvas
         * @param  image */
        const drawImage = (image) => {
            const { height, width } = parseDimensions(image);
            if (height * width > 65355)
                throw new TypeError('Image too large for Chic to render');
            const hexValues = generateRGBAStrings(image);
            const text = [];
            const styles = [];
            for (let row = 0; row < height; row++) {
                for (let col = 0; col < width; col++) {
                    text.push('  ');
                    styles.push(hexValues[col + row * width]);
                }
                text.push('\n');
                styles.push(drawFont());
            }
            chic.log(text, ...styles);
        };
        const formatRGBA = (out, val, idx) => {
            if (!(idx % 4))
                out.push([]);
            const color = out.at(-1);
            color.push(val);
            if (color.length === 4) {
                const rgb = `rgba(${color.join(',')})`;
                const hex = drawFont.backgroundColor[rgb].border[`solid ${rgb} 5px`]();
                out.pop();
                out.push(hex);
            }
            return out;
        };
        /** Get image data from a source by drawing it to a canvas and converting the pixel data into `rgba(r, g, b, a)` strings
         * @param  image */
        const generateRGBAStrings = (image) => {
            const { height, width } = parseDimensions(image);
            canvas.height = height;
            canvas.width = width;
            ctx.drawImage(image, 0, 0);
            return ctx.getImageData(0, 0, width, height).data.reduce(formatRGBA, []);
        };
        /** Get the height and width values as numbers from a CanvasImageSource */
        const parseDimensions = (image) => {
            let { height, width } = image;
            if (height instanceof SVGAnimatedLength)
                height = height.animVal.value;
            if (width instanceof SVGAnimatedLength)
                width = width.animVal.value;
            return { height, width };
        };
        chic.plugins.drawImage = drawImage;
    },
};
export default drawImage;
//# sourceMappingURL=drawImage.js.map