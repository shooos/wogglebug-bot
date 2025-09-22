

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

  Genshin.spiralAbyss!.extractInfo = (releasePost): Genshin.SpiralAbyssInfo[] => {
    Logger.log(`Start extracting Spiral Abyss information | PostId=${releasePost.id}`);

    const results: Genshin.SpiralAbyssInfo[] = [];

    const { id, body } = releasePost;

    const updates = body.split(/[一二三四五六七八九十]{1,2}、/);
    const updateText = updates.find(it => /深境螺旋第\d期は/.test(it));

    if (updateText == null) {
      Logger.log('Not found to Spyral Abyss Information');
      return [];
    }

    const rawTexts = updateText.split(/深境螺旋第\d期は/).slice(1);

    rawTexts.forEach(raw => {
      const match = raw.match(/(\d+年)?(\d+月\d+日)より開放/);
      if (match == null) return;

      const date = parseMixFormatDate(match[2]);
      if (!date) throw new Error('Failed to parse date');

      const infoLines = raw.split('◆').slice(1);

      const floor11 = infoLines.find(it => it.includes('第11層の地脈異常'));
      const floor12 = infoLines.find(it => it.includes('第12層の地脈異常'));
      const leyLineDisorders: Genshin.SpiralAbyssInfo['leyLineDisorders'] = {
        floor11: floor11?.split('。')?.slice(1)?.filter(it => it) ?? [],
        floor12: floor12?.split('。')?.slice(1)?.filter(it => it) ?? [],
      };

      const blessingOfTheAbyssMoon = infoLines.find(it => it.includes('淵月の祝福'))?.match(/淵月の祝福(.{1,4}の月)(.*。)/)?.slice(1, 3);

      if (blessingOfTheAbyssMoon == null) {
        Logger.log('Blessing of the Abyss moon is not found.');
        return [];
      }

      results.push({
        date,
        leyLineDisorders,
        blessingOfTheAbyssMoon: `${blessingOfTheAbyssMoon[0]} ${blessingOfTheAbyssMoon[1]}`,
        articleUrl: `https://www.hoyolab.com/article/${id}`,
      });
    });

    Logger.log(`Finish extracting Spiral Abyss information | Results=${JSON.stringify(results)}`);

    return results;
  }
})();
