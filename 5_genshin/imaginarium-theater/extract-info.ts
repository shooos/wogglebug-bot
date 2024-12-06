(() => {
  function parseMixFormatDate(dateString: string) {
    function parse(dateString: string, format: string): Date | null {
      try {
        return Utilities.parseDate(dateString, 'JST', format);
      } catch (e) {
        return null;
      }
    }

    const formats = [
      'yyyy/MM/dd hh:mm',
      'M月d日',
      'y年M月d日',
    ];

    for (let format of formats) {
      const date = parse(dateString, format);

      if (!!date) return date;
    }
  }

  Genshin.imaginariumTheater.extractInfo = (releasePost) => {
    Logger.log(`Start extracting imaginarium theater information | PostId=${releasePost.id}`);

    const { id, body } = releasePost;
    const matches = body.matchAll(/幻想シアターは(.{4,16})より開放されます。\s指定元素タイプ：([炎雷氷水岩草風])元素.([炎雷氷水岩草風])元素.([炎雷氷水岩草風])元素\s開幕キャスト：「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」\s[^\s]+\s特別招待キャスト：「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」/simg);

    const results: Genshin.ImaginariumTheaterInfo[] = [];
    matches.forEach((match) => {
      Logger.log(`Matched=${JSON.stringify(match)}`);

      results.push({
        date: parseMixFormatDate(match[1]),
        elementals: [...match.slice(2, 5)],
        principalCastMembers: [...match.slice(5, 11)],
        alternateCastMembers: [...match.slice(11, 15)],
        articleUrl: `https://www.hoyolab.com/article/${id}`,
      });
    });

    Logger.log(`Finish extracting imaginarium theater information | Results=${JSON.stringify(results)}`);

    return results;
  }
})();
