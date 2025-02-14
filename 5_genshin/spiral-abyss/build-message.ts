(() => {
  Genshin.spiralAbyss!.buildMessage = (hours, image) => {
    const imageSize = Image.getRectangleSize!(image);
    const body = `次回の螺旋更新日まで あと [ ${hours} ] 時間！ #原神

✅ いけるとこまでいった？
✅ 報酬の受取り忘れてない？`

    return {
      body,
      images: [{
        altText: 'Spiral Abyss',
        blob: image,
        aspectRatio: {
          width: imageSize.width,
          height: imageSize.height,
        }
      }],
    }
  }
})();
