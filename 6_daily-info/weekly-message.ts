(() => {
  const makeCharacterVoiceMap = (): Record<string, string[]> => {
    const characterVoiceSpreadsheet = SpreadsheetApp.openById('1GJA_PYToRyNOicHrVsSuuYkiDRV1V6McvCnk4RbXYOA');
    const characterVoiceSheet = characterVoiceSpreadsheet.getSheetByName('蜈・ｴ辷・匱Voice');
    const lastRow = characterVoiceSheet?.getLastRow() || 0;
    const dataRange = characterVoiceSheet?.getRange(2, 1, lastRow - 1, 7);
    const characterVoiceData = dataRange?.getValues() || [];
    const characterVoiceMap: Record<string, string[]> = characterVoiceData.reduce((map, row: string[]) => {
      const characterName = row[0];
      const voices = [row[1], row[2], row[3], row[4], row[5], row[6]];

      if (!map[characterName]) {
        map[characterName] = [];
      }

      map[characterName].push(...(voices.filter(voice => voice !== null && voice !== undefined && voice !== '')));
      return map;
    }, {} as Record<string, string[]>);

    return characterVoiceMap;
  };

  const randomMessages = (): string => {
    const messages = [
      '莉頑律繧ゅユ繧､繝ｯ繝・ヨ繧帝ｧ・￠蟾｡繧阪≧・・,
      '迚ｹ逕｣蜩√・繝ｪ繝昴ャ繝礼｢ｺ隱阪・螟ｧ荳亥､ｫ縺九↑・・,
      '鬲壹・繝ｪ繝昴ャ繝礼｢ｺ隱阪・螟ｧ荳亥､ｫ縺九↑・・,
      '螟峨ｏ縺｣縺溘ヲ繝ｫ繝√Ε繝ｼ繝ｫ縺ｧ繧よ爾縺励※縺ｿ繧医≧縺具ｼ・,
      '蛻ｹ驍｣讓ｹ閼ゅ・菴ｿ縺｣縺溘°縺ｪ・・,
      '莉企ｱ縺ｮ蛻ｹ驍｣讓ｹ閼ゅ∬ｲｷ縺・ｿ倥ｌ縺ｦ縺ｪ縺・ｼ・,
      '莉頑律縺ｯ縺ｩ縺薙ｒ謗｢邏｢縺励ｈ縺・°',
      '閨夜⊆迚ｩ蜴ｳ驕ｸ縺ｯ鬆・ｪｿ縺九↑・・,
      '鬲皮･樔ｻｻ蜍吶・鬆・ｪｿ縺九↑・・,
      '荳也阜莉ｻ蜍吶・鬆・ｪｿ縺九↑・・,
      '莉企ｱ縺ｮ繧ｦ繧｣繝ｼ繧ｯ繝ｪ繝ｼ莉ｻ蜍吶・鬆・ｪｿ・・,
      '莉頑悄縺ｮ豺ｱ蠅・楴譌九・鬆・ｪｿ・・,
      '逶ｮ蠖薙※縺ｮ繧ｭ繝｣繝ｩ縺ｯ蠑輔￠縺溘°縺ｪ・・,
      '逶ｮ蠖薙※縺ｮ豁ｦ蝎ｨ縺ｯ蠑輔￠縺溘°縺ｪ・・,
      '髫縺怜ｮ晉ｮｱ縺ｧ繧よ爾縺励↓蜃ｺ縺九￠繧医▲縺具ｼ・,
      '繝・う繝ｯ繝・ヨ謗｢邏｢讌ｽ縺励ｓ縺ｧ繧具ｼ・,
      '莉頑律縺ｯ繝輔か繝ｳ繝・・繝梧爾邏｢縺ｧ繧ゅ＠縺ｦ縺ｿ繧医≧・・,
      '莉頑律縺ｯ繝｢繝ｳ繝画爾邏｢縺ｧ繧ゅ＠縺ｦ縺ｿ繧医≧・・,
      '莉頑律縺ｯ迺・怦謗｢邏｢縺ｧ繧ゅ＠縺ｦ縺ｿ繧医≧・・,
      '莉頑律縺ｯ遞ｲ螯ｻ謗｢邏｢縺ｧ繧ゅ＠縺ｦ縺ｿ繧医≧・・,
      '莉頑律縺ｯ繧ｹ繝｡繝ｼ繝ｫ謗｢邏｢縺ｧ繧ゅ＠縺ｦ縺ｿ繧医≧・・,
      '莉頑律縺ｯ繝翫ち謗｢邏｢縺ｧ繧ゅ＠縺ｦ縺ｿ繧医≧・・,
      '蝪ｵ豁悟｣ｺ縺ｮ逡代・蜿守ｩｫ繧ょｿ倥ｌ縺ｪ縺・ｈ縺・↓縺ｭ・・,
    ];

    const index = Math.floor(Math.random() * messages.length);

    return messages[index];
  };

  const resolveCharacterVoices = (charaName: string): string | null => {
    const characterVoiceMap = makeCharacterVoiceMap();
    const voices = characterVoiceMap[charaName];
    return voices?.[Math.floor(Math.random() * voices.length)] || null;
  }

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
    `譌･譖懈律捲
繧・ｊ蠢倥ｌ縺溘％縺ｨ縺ｯ縺ｪ縺・ｼ・

笨・蠕∬ｨ朱伜沺
笨・險惹ｼ先・雉・
笨・菴乗ｰ代Μ繧ｯ繧ｨ繧ｹ繝・
笨・豺ｱ邏・・鬘倥＞
笨・縺昴・莉也ｴ陦後え繧｣繝ｼ繧ｯ繝ｪ繝ｼ莉ｻ蜍兪,

    // Monday
    `譛域屆譌･剣

笨・邏陦後え繧｣繝ｼ繧ｯ繝ｪ繝ｼ莉ｻ蜍吶′繝ｪ繧ｻ繝・ヨ
笨・蠕∬ｨ朱伜沺縺ｮ蝣ｱ驟ｬ縺後Μ繧ｻ繝・ヨ
笨・險惹ｼ先・雉槭・謖第姶蝗樊焚縺後Μ繧ｻ繝・ヨ
笨・菴乗ｰ代Μ繧ｯ繧ｨ繧ｹ繝医・騾ｲ謐励′繝ｪ繧ｻ繝・ヨ
笨・豺ｱ邏・・鬘倥＞縺ｮ謖第姶蝗樊焚縺後Μ繧ｻ繝・ヨ`,

    // Tuesday
    `轣ｫ譖懈律櫨`,

    // Wednesday
    `豌ｴ譖懈律挑`,

    // Thursday
    `譛ｨ譖懈律元

笨・蜷・＊驕ｺ迚ｩ繧ｷ繝ｧ繝・・縺ｮ雉ｼ蜈･蝗樊焚縺後Μ繧ｻ繝・ヨ
・育浹讎ｴ縲∫正逅・∝ｼｵ鬆・∝ｱｱ蝓主▼螟ｪ縲√い繝輔す繝ｳ縲√け繝ｩ繝・し縲√お繧ｯ繝√Η繧｢縲√Ξ繧ｳ・荏,

    // Friday
    `驥第屆譌･笨ｨ

笨・蝪ｵ豁悟｣ｺ縺ｫ蜻ｨ驕翫☆繧句｣ｺ縺ｮ邊ｾ髴翫′蛻ｰ譚･
笨・豺ｱ邏・・鬘倥＞縺ｮ謖第姶蝗樊焚縺後Μ繧ｻ繝・ヨ`,

    // Saturday
    `蝨滓屆譌･ｪｨ

笨・繝輔Ξ繝ｳ繝峨・蝪ｵ豁悟｣ｺ縺ｧ蜻ｨ驕翫☆繧句｣ｺ縺ｮ邊ｾ髴翫°繧芽ｲｷ縺・黄縺後〒縺阪ｋ繧医≧縺ｫ縺ｪ縺｣縺歔,
  ];

  DailyInfo.weeklyMessage = (currentDate) => {
    Utils.log(`Subscribe weekly message notification`);

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const morning = currentHours === 7 && currentMinutes > 44;
    const night = currentHours === 20 && currentMinutes > 44;

    if (!morning && !night) {
      Utils.log(`Unsubscribe weekly message notification`);
      return null;
    }

    const dateStr = Utils.formatToViewDateJPN(currentDate);
    const currentDay = currentDate.getDay();

    const imageFile = getImageFileRandom();
    const imageBlob = imageFile.getBlob();
    const imageSize = Image.getRectangleSize!(imageBlob);

    const charaName = imageFile.getName().split('.')[0];
    const voice = resolveCharacterVoices(charaName);

    return {
      body: ` #蜴溽･・
莉頑律縺ｯ ${dateStr} ${MESSAGES[currentDay]}

矧 ${voice || ''}`,
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


