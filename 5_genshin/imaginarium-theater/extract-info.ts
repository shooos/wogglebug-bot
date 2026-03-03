(() => {
  function parseMixFormatDate(dateString: string): Date | undefined {
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

  Genshin.imaginariumTheater!.extractInfo = (releasePost) => {
    Logger.log(`Start extracting imaginarium theater information | PostId=${releasePost.id}`);

    const { id, body } = releasePost;
    outputLogToFile(body);
    const matches = body.matchAll(/幻想シアターは(.{4,16})より開放されます。/simg).toArray();

    if (!matches.length) {
      throw new Error(`Failed extracting imaginarium theater information | PostId=${releasePost.id}`);
    }

    const dates = body.matchAll(/幻想シアターは(.{4,16})より開放されます。/simg).toArray();
    const elementals = body.matchAll(/指定元素タイプ[：|:]([炎雷氷水岩草風])元素.([炎雷氷水岩草風])元素.([炎雷氷水岩草風])元素/simg).toArray();
    const principalCastMembers = body.matchAll(/開幕キャスト[：|:]「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」/simg).toArray();
    const alternateCastMembers = body.matchAll(/特別招待キャスト[：|:]「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」「[^「」]*・([^「」]*)（[炎雷氷水岩草風]）」/simg).toArray();

    const results: Genshin.ImaginariumTheaterInfo[] = [];
    matches.forEach((match, index) => {
      Logger.log(`Matches index=${JSON.stringify(index)}`);

      const date = parseMixFormatDate(dates[index][1]);
      if (!date) throw new Error('Failed to parse date');

      results.push({
        date,
        elementals: [...elementals[index].slice(2, 5)],
        principalCastMembers: [...principalCastMembers[index].slice(5, 11)],
        alternateCastMembers: [...alternateCastMembers[index].slice(12, 16)],
        articleUrl: `https://www.hoyolab.com/article/${id}`,
      });
    });

    Logger.log(`Finish extracting imaginarium theater information | Results=${JSON.stringify(results)}`);

    return results;
  }
})();
