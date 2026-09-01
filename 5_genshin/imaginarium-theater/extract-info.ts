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

  Genshin.imaginariumTheater!.extractInfo = (releasePost) => {
    Utils.log(`Start extracting imaginarium theater information | PostId=${releasePost.id}`);

    const { id, body } = releasePost;
    outputLogToFile(body);
    const matches = body.matchAll(/蟷ｻ諠ｳ繧ｷ繧｢繧ｿ繝ｼ縺ｯ(.{4,16})繧医ｊ髢区叛縺輔ｌ縺ｾ縺吶・simg).toArray();

    if (!matches.length) {
      throw new Error(`Failed extracting imaginarium theater information | PostId=${releasePost.id}`);
    }

    const dates = body.matchAll(/蟷ｻ諠ｳ繧ｷ繧｢繧ｿ繝ｼ縺ｯ(.{4,16})繧医ｊ髢区叛縺輔ｌ縺ｾ縺吶・simg).toArray();
    const elementals = body.matchAll(/謖・ｮ壼・邏繧ｿ繧､繝夕・嘶:]([轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ])蜈・ｴ.([轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ])蜈・ｴ.([轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ])蜈・ｴ/simg).toArray();
    const principalCastMembers = body.matchAll(/髢句ｹ輔く繝｣繧ｹ繝・・嘶:]縲啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨阪啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨阪啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨阪啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨阪啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨阪啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨・simg).toArray();
    const alternateCastMembers = body.matchAll(/迚ｹ蛻･諡帛ｾ・く繝｣繧ｹ繝・・嘶:]縲啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨阪啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨阪啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨阪啓^縲後江*繝ｻ([^縲後江*)・・轤朱峭豌ｷ豌ｴ蟯ｩ闕蛾｢ｨ]・峨・simg).toArray();

    const results: Genshin.ImaginariumTheaterInfo[] = [];
    matches.forEach((match, index) => {
      Utils.log(`Matches index=${JSON.stringify(index)}`);

      const date = parseMixFormatDate(dates[index][1]);
      if (!date) throw new Error('Failed to parse date');

      results.push({
        date,
        elementals: [...(elementals[index].slice(1, 4))],
        principalCastMembers: [...(principalCastMembers[index].slice(1, 7))],
        alternateCastMembers: [...(alternateCastMembers[index].slice(1, 5))],
        articleUrl: `https://www.hoyolab.com/article/${id}`,
      });
    });

    Utils.log(`Finish extracting imaginarium theater information | Results=${JSON.stringify(results)}`);

    return results;
  }
})();


