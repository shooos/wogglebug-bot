(() => {
  Image.getRectangleSize = (target) => {
    const ret = ImgApp.getSize(target);

    return {
      width: ret.width,
      height: ret.height,
    };
  }
})();
