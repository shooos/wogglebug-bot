(() => {
  const imageBlob = DriveApp.getFileById('1gqqFqbwYWzd5AtzhpJzHgLPwciyixZk0').getBlob();

  const createImage = (): Bluesky.AttachImage => {
    const imageSize = Image.getRectangleSize!(imageBlob);

    return {
      altText: `Spiral Abyss`,
      blob: imageBlob,
      aspectRatio: { ...imageSize },
    }
  }

  Genshin.spiralAbyss!.open = () => {
    const body = `🌀深境螺旋が更新されました🌀

今期も全力で挑もう！⚔ #原神`;

    const message: Bluesky.Message = {
      body,
      images: [createImage()],
    };

    const token = Bsky.createSession!();

    Bsky.postMessage!(token, message, Bluesky.BotType.regular);
  }
})();