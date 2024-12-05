(() => {
  Videos.buildMessages = (videoInfos) => videoInfos.map(video => {
    const message: Bluesky.Message = {
      body: `YouTube 原神公式アカウントが動画を公開しました #原神 #原神公式情報

${video.title}
公開日時 : ${Utils.formatToViewDate(video.published)}`,
      images: [],
      linkUrl: video.url,
    };

    if (video.thumbnailUrl) {
      const rawBlob = Utils.fetchBlob(video.thumbnailUrl);

      const validBlob = rawBlob.getBytes().length > Bluesky.MAX_IMAGE_SIZE ?
        Image.compress(rawBlob, Bluesky.MAX_IMAGE_SIZE) : rawBlob;

      const size = Image.getRectangleSize(validBlob);

      message.images.push({
        altText: `Video Thumbnail - ${video.title}`,
        blob: validBlob,
        aspectRatio: {
          width: size.width,
          height: size.height,
        },
      })
    }

    return message;
  })
})();
