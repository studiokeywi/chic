const install = (chic) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const drawFont = chic.fontFamily.monospace.fontSize._10px.lineHeight._10px.margin._0.padding._0.fix();
  const drawStyle = drawFont();
  const generateRGBAStrings = (data) => {
    const hexStrs = [];
    let curPixel;
    for (let idx = 0; idx < data.length; idx++) {
      if (!(idx % 4))
        curPixel = [];
      curPixel.push(data[idx]);
      if (curPixel.length !== 4)
        continue;
      const rgba = `rgba(${curPixel.join(",")})`;
      hexStrs.push(drawFont.backgroundColor[rgba].border[`solid ${rgba} 5px`]());
    }
    return hexStrs;
  };
  const parseDimensions = (image) => {
    let { height, width } = image;
    if (height instanceof SVGAnimatedLength)
      height = height.animVal.value;
    if (width instanceof SVGAnimatedLength)
      width = width.animVal.value;
    if (height * width > 65355)
      throw new TypeError("Image too large for Chic to render");
    return { height, width };
  };
  return (image) => {
    const { height, width } = parseDimensions(image);
    canvas.height = height;
    canvas.width = width;
    ctx.drawImage(image, 0, 0);
    const { data } = ctx.getImageData(0, 0, width, height);
    const hexValues = generateRGBAStrings(data);
    const text = [];
    const styles = [];
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        text.push("  ");
        styles.push(hexValues[col + row * width]);
      }
      text.push("\n");
      styles.push(drawStyle);
    }
    chic.log(text, ...styles);
  };
};
var drawImage_default = { id: "drawImage", install };
export {
  drawImage_default as default
};
//# sourceMappingURL=drawImage.js.map
