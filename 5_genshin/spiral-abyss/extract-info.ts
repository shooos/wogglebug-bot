

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

    const rawTexts = body.split(/深境螺旋第\d期は/).slice(1);

    rawTexts.forEach(raw => {
      const match = raw.match(/(\d+年)?(\d+月\d+日)より開放/);
      if (match == null) return;

      const date = parseMixFormatDate(match[2]);
      if (!date) throw new Error('Failed to parse date');

      const infoLines = raw.split('◆').slice(1);

      const floor11 = infoLines.find(it => it.includes('第11層の地脈異常'));
      const floor12 = infoLines.find(it => it.includes('第12層の地脈異常'));
      const leyLineDisorders: Genshin.SpiralAbyssInfo['leyLineDisorders'] = {
        floor11: floor11?.split(/。\s/)?.slice(1)?.filter(it => it) ?? [],
        floor12: floor12?.split(/。\s/)?.slice(1)?.filter(it => it) ?? [],
      };

      const blessingOfTheAbyssMoon = infoLines.find(it => it.includes('淵月の祝福'))?.replace(/。\s.*/, '。') ?? '';

      results.push({
        date,
        leyLineDisorders,
        blessingOfTheAbyssMoon,
        articleUrl: `https://www.hoyolab.com/article/${id}`,
      });
    });

    Logger.log(`Finish extracting Spiral Abyss information | Results=${JSON.stringify(results)}`);

    return results;
  }
})();
