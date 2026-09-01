

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
      'M譛・譌･',
      'y蟷ｴM譛・譌･',
    ];

    for (let format of formats) {
      const date = parse(dateString, format);

      if (!!date) return date;
    }
  }

  Genshin.spiralAbyss!.extractInfo = (releasePost): Genshin.SpiralAbyssInfo[] => {
    Utils.log(`Start extracting Spiral Abyss information | PostId=${releasePost.id}`);

    const results: Genshin.SpiralAbyssInfo[] = [];

    const { id, body } = releasePost;

    const updates = body.split(/[荳莠御ｸ牙屁莠泌・荳・・荵晏香]{1,2}縲・);
    const updateText = updates.find(it => /豺ｱ蠅・楴譌狗ｬｬ\d譛溘・/.test(it));

    if (updateText == null) {
      Utils.log('Not found to Spyral Abyss Information');
      return [];
    }

    const rawTexts = updateText.split(/豺ｱ蠅・楴譌狗ｬｬ\d譛溘・/).slice(1);

    rawTexts.forEach(raw => {
      const match = raw.match(/(\d+蟷ｴ)?(\d+譛・d+譌･)繧医ｊ髢区叛/);
      if (match == null) return;

      const date = parseMixFormatDate(match[2]);
      if (!date) throw new Error('Failed to parse date');

      const infoLines = raw.split('笳・).slice(1);

      const floor11 = infoLines.find(it => it.includes('隨ｬ11螻､縺ｮ蝨ｰ閼育焚蟶ｸ'));
      const floor12 = infoLines.find(it => it.includes('隨ｬ12螻､縺ｮ蝨ｰ閼育焚蟶ｸ'));
      const leyLineDisorders: Genshin.SpiralAbyssInfo['leyLineDisorders'] = {
        floor11: floor11?.split('縲・)?.slice(1)?.filter(it => it) ?? [],
        floor12: floor12?.split('縲・)?.slice(1)?.filter(it => it) ?? [],
      };

      const blessingOfTheAbyssMoon = infoLines.find(it => it.includes('豺ｵ譛医・逾晉ｦ・))?.match(/豺ｵ譛医・逾晉ｦ・.{1,4}縺ｮ譛・(.*縲・/)?.slice(1, 3);

      if (blessingOfTheAbyssMoon == null) {
        Utils.log('Blessing of the Abyss moon is not found.');
        return [];
      }

      results.push({
        date,
        leyLineDisorders,
        blessingOfTheAbyssMoon: `${blessingOfTheAbyssMoon[0]} ${blessingOfTheAbyssMoon[1]}`,
        articleUrl: `https://www.hoyolab.com/article/${id}`,
      });
    });

    Utils.log(`Finish extracting Spiral Abyss information | Results=${JSON.stringify(results)}`);

    return results;
  }
})();


