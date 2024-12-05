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

  Genshin.imagenariumTheater.extractInfo = (releasePost) => {
    const { id, body } = releasePost;
    const matches = body.matchAll(/幻想シアターは(.{4,16})より開放されます。\s指定元素タイプ：([炎雷氷水岩草風])元素.([炎雷氷水岩草風])元素.([炎雷氷水岩草風])元素\s開幕キャスト：「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」\s[^\s]+\s特別招待キャスト：「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」/img);

    const results = [];
    for (let match of Array.from(matches)) {
      results.push({
        date: Utilities.formatDate(parseMixFormatDate(match[1]), 'JST', 'M月d日'),
        elementals: [...match.slice(2, 5)],
        principalCastMembers: [...match.slice(5, 11)],
        alternateCastMembers: [...match.slice(11, 15)],
        articleURL: `https://www.hoyolab.com/article/${id}`,
      });
    }

    Logger.log(JSON.stringify(results));

    return results;
  }
})();
