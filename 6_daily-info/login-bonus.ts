(() => {
  const imageId = '1CzfxDs1IHUHq5aFNeChSHMXMH5MVALGq';
  const imageBlob = DriveApp.getFileById(imageId).getBlob();

  DailyInfo.loginBonus = (currentDate) => {
    Logger.log(`Subscribe login bonus notification`);

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const morning = currentHours === 5 && currentMinutes < 15;
    const night = currentHours === 23 && currentMinutes > 44;

    if (!morning && !night) {
      Logger.log(`Unsubscribe login bonus notification`);
      return null;
    }

    let topMessage: string = '';
    if (morning) {
      topMessage = `🔔今日のログインボーナスを受け取りに行こう！`;
    } else if (night) {
      topMessage = `🔔今日のログインボーナス受け取り忘れてない?!`;
    }

    const body = `${topMessage}

📅[ 原神ログインボーナス ]

📅[ ゼンゼロログインボーナス ]

📅[ スタレログインボーナス ]

ンナンナ！
（各ゲームごとの HoYoLAB デイリーログインボーナスページが直接開けちゃう！）`

    const unicodeString = new Bluesky.UnicodeString(body)

    const facets = [
      Bsky.detectCustomFacet!(unicodeString, /(原神ログインボーナス)/gim, 'https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481&lang=ja-jp'),
      Bsky.detectCustomFacet!(unicodeString, /(ゼンゼロログインボーナス)/gim, 'https://act.hoyolab.com/bbs/event/signin/zzz/e202406031448091.html?act_id=e202406031448091&lang=ja-jp'),
      Bsky.detectCustomFacet!(unicodeString, /(スタレログインボーナス)/gim, 'https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=e202303301540311&lang=ja-jp'),
    ];

    const imageSize = Image.getRectangleSize!(imageBlob);

    return {
      body,
      images: [
        {
          altText: 'Daily Login Bonus',
          blob: imageBlob,
          aspectRatio: {
            width: imageSize.width,
            height: imageSize.height,
          },
        }
      ],
      customFacets: facets,
    }
  }
})();
