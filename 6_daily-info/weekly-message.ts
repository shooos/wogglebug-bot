(() => {
  const randomMessages = (): string => {
    const messages = [
      '今日もテイワットを駆け巡ろう！',
      '特産品のリポップ確認は大丈夫かな？',
      '魚のリポップ確認は大丈夫かな？',
      '変わったヒルチャールでも探してみようか！',
      '刹那樹脂は使ったかな？',
      '今週の刹那樹脂、買い忘れてない？',
      '今日はどこを探索しようか',
      '聖遺物厳選は順調かな？',
      '魔神任務は順調かな？',
      '世界任務は順調かな？',
      '今週のウィークリー任務は順調？',
      '今期の深境螺旋は順調？',
      '目当てのキャラは引けたかな？',
      '目当ての武器は引けたかな？',
      '隠し宝箱でも探しに出かけよっか！',
      'テイワット探索楽しんでる？',
      '今日はフォンテーヌ探索でもしてみよう！',
      '今日はモンド探索でもしてみよう！',
      '今日は璃月探索でもしてみよう！',
      '今日は稲妻探索でもしてみよう！',
      '今日はスメール探索でもしてみよう！',
      '今日はナタ探索でもしてみよう！',
      '塵歌壺の畑の収穫も忘れないようにね！',
    ];

    const index = Math.floor(Math.random() * messages.length);

    return messages[index];
  };

  const getImageFileRandom = (): GoogleAppsScript.Drive.File => {
    const folder = DriveApp.getFolderById('1oRpbJGAYLuSk2Fy3optFbc4inwkTpMLl');
    const files = folder.getFiles();
    const filesArray: GoogleAppsScript.Drive.File[] = [];

    while (files.hasNext()) {
      filesArray.push(files.next());
    }

    const index = Math.floor(Math.random() * filesArray.length);

    return filesArray[index];
  }

  const MESSAGES = [
    // Sunday
    `日曜日🌞
やり忘れたことはない？

✅ 征討領域
✅ 討伐懸賞
✅ 住民リクエスト
✅ 深紅の願い
✅ その他紀行ウィークリー任務

明日のリセットに備えよう！ #原神`,

    // Monday
    `月曜日🌕

✅ 紀行ウィークリー任務がリセット
✅ 征討領域の報酬がリセット
✅ 討伐懸賞の挑戦回数がリセット
✅ 住民リクエストの進捗がリセット
✅ 深紅の願いの挑戦回数がリセット

今週もテイワットを駆け巡ろう！ #原神`,

    // Tuesday
    `火曜日🔥

${randomMessages()} #原神`,

    // Wednesday
    `水曜日💧

${randomMessages()} #原神`,

    // Thursday
    `木曜日🌳

✅ 各聖遺物ショップの購入回数がリセット
（石榴、琳琅、張順、山城健太、アフシン、クラッサ、エクチュア）

${randomMessages()} #原神`,

    // Friday
    `金曜日✨

✅ 塵歌壺に周遊する壺の精霊が到来
✅ 深紅の願いの挑戦回数がリセット

${randomMessages()} #原神`,

    // Saturday
    `土曜日🪨

✅ フレンドの塵歌壺で周遊する壺の精霊から買い物ができるようになった

${randomMessages()} #原神`,
  ];

  DailyInfo.weeklyMessage = (currentDate) => {
    Logger.log(`Subscribe weekly message notification`);

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const morning = currentHours === 7 && currentMinutes > 44;
    const night = currentHours === 20 && currentMinutes > 44;

    if (!morning && !night) {
      Logger.log(`Unsubscribe weekly message notification`);
      return null;
    }

    const dateStr = Utils.formatToViewDateJPN(currentDate);
    const currentDay = currentDate.getDay();

    const imageBlob = getImageFileRandom().getBlob();
    const imageSize = Image.getRectangleSize(imageBlob);

    return {
      body: `今日は ${dateStr} ${MESSAGES[currentDay]}`,
      images: [
        {
          altText: '',
          blob: imageBlob,
          aspectRatio: {
            width: imageSize.width,
            height: imageSize.height,
          },
        },
      ],
    };
  };
})();
