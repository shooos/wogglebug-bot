(() => {
  const imageId = '1CzfxDs1IHUHq5aFNeChSHMXMH5MVALGq';
  const imageBlob = DriveApp.getFileById(imageId).getBlob();

  DailyInfo.loginBonus = (currentDate) => {
    Utils.log(`Subscribe login bonus notification`);

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const morning = currentHours === 5 && currentMinutes < 15;
    const night = currentHours === 23 && currentMinutes > 44;

    if (!morning && !night) {
      Utils.log(`Unsubscribe login bonus notification`);
      return null;
    }

    let topMessage: string = '';
    if (morning) {
      topMessage = `粕莉頑律縺ｮ繝ｭ繧ｰ繧､繝ｳ繝懊・繝翫せ繧貞女縺大叙繧翫↓陦後％縺・ｼ～;
    } else if (night) {
      topMessage = `粕莉頑律縺ｮ繝ｭ繧ｰ繧､繝ｳ繝懊・繝翫せ蜿励￠蜿悶ｊ蠢倥ｌ縺ｦ縺ｪ縺・!`;
    }

    const body = `${topMessage}

套[ 蜴溽･槭Ο繧ｰ繧､繝ｳ繝懊・繝翫せ ]

套[ 繧ｼ繝ｳ繧ｼ繝ｭ繝ｭ繧ｰ繧､繝ｳ繝懊・繝翫せ ]

套[ 繧ｹ繧ｿ繝ｬ繝ｭ繧ｰ繧､繝ｳ繝懊・繝翫せ ]

繝ｳ繝翫Φ繝奇ｼ・
・亥推繧ｲ繝ｼ繝縺斐→縺ｮ HoYoLAB 繝・う繝ｪ繝ｼ繝ｭ繧ｰ繧､繝ｳ繝懊・繝翫せ繝壹・繧ｸ縺檎峩謗･髢九￠縺｡繧・≧・・ｼ荏

    const unicodeString = new Bluesky.UnicodeString(body)

    const facets = [
      Bsky.detectCustomFacet!(unicodeString, /(蜴溽･槭Ο繧ｰ繧､繝ｳ繝懊・繝翫せ)/gim, 'https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481&lang=ja-jp'),
      Bsky.detectCustomFacet!(unicodeString, /(繧ｼ繝ｳ繧ｼ繝ｭ繝ｭ繧ｰ繧､繝ｳ繝懊・繝翫せ)/gim, 'https://act.hoyolab.com/bbs/event/signin/zzz/e202406031448091.html?act_id=e202406031448091&lang=ja-jp'),
      Bsky.detectCustomFacet!(unicodeString, /(繧ｹ繧ｿ繝ｬ繝ｭ繧ｰ繧､繝ｳ繝懊・繝翫せ)/gim, 'https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=e202303301540311&lang=ja-jp'),
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


