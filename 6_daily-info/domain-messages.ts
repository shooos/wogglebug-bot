(() => {
  interface Item {
    domainName: string;
    itemName: string;
    country: string;
  };

  const weaponAscensionMaterials = ((dayOfWeek: number): Item[] => {
    const monday_thursday: Item[] = [
      {
        domainName: '繧ｻ繧ｷ繝ｪ繧｢縺ｮ闍怜ｺ・,
        itemName: '鬮伜｡斐・邇・,
        country: '繝｢繝ｳ繝・,
      },
      {
        domainName: '髴・峭騾｣螻ｱ蟇・ｮｮ',
        itemName: '蟄､髮ｲ蟇呈棊',
        country: '迺・怦',
      },
      {
        domainName: '遐よｵ√ヮ蠎ｭ',
        itemName: '驕豬ｷ螟ｷ蝨ｰ',
        country: '遞ｲ螯ｻ',
      },
      {
        domainName: '譛蛾ゅ・蝪・,
        itemName: '髱呵ｬ舌↑譽ｮ縺ｮ縺励★縺・,
        country: '繧ｹ繝｡繝ｼ繝ｫ',
      },
      {
        domainName: '豺ｱ貎ｮ縺ｮ菴咎渊',
        itemName: '謔荵・・蠑ｦ',
        country: '繝輔か繝ｳ繝・・繝・,
      },
      {
        domainName: '蜿､縺ｮ逵ｺ譛帛床',
        itemName: '轣ｼ蠢・ｒ謐ｧ縺偵ｋ',
        country: '繝翫ち'
      },
      {
        domainName: '螟ｱ繧上ｌ縺滓怦縺ｮ蠎ｭ',
        itemName: '螂・ｦ吶↑陬・ｽｮ',
        country: '繝翫ラ繝ｻ繧ｯ繝ｩ繧､',
      },
    ];
    const tuesday_friday = [
      {
        domainName: '繧ｻ繧ｷ繝ｪ繧｢縺ｮ闍怜ｺ・,
        itemName: '蜃幃｢ｨ螂皮蕎',
        country: '繝｢繝ｳ繝・,
      },
      {
        domainName: '髴・峭騾｣螻ｱ蟇・ｮｮ',
        itemName: '髴ｧ豬ｷ髮ｲ髢・,
        country: '迺・怦',
      },
      {
        domainName: '遐よｵ√ヮ蠎ｭ',
        itemName: '魑ｴ逾槫ｾ｡髴・,
        country: '遞ｲ螯ｻ',
      },
      {
        domainName: '譛蛾ゅ・蝪・,
        itemName: '繧ｪ繧｢繧ｷ繧ｹ繧ｬ繝ｼ繝・Φ',
        country: '繧ｹ繝｡繝ｼ繝ｫ',
      },
      {
        domainName: '豺ｱ貎ｮ縺ｮ菴咎渊',
        itemName: '邏碑＊縺ｪ髮ｫ',
        country: '繝輔か繝ｳ繝・・繝・,
      },
      {
        domainName: '蜿､縺ｮ逵ｺ譛帛床',
        itemName: '迢ゆｹｱ縺ｮ閨紋ｸｻ',
        country: '繝翫ち'
      },
      {
        domainName: '螟ｱ繧上ｌ縺滓怦縺ｮ蠎ｭ',
        itemName: '髟ｷ螟懊・轣ｯ轣ｫ',
        country: '繝翫ラ繝ｻ繧ｯ繝ｩ繧､',
      },
    ];
    const wednesday_saturday = [
      {
        domainName: '繧ｻ繧ｷ繝ｪ繧｢縺ｮ闍怜ｺ・,
        itemName: '迯・甥謌ｦ螢ｫ',
        country: '繝｢繝ｳ繝・,
      },
      {
        domainName: '髴・峭騾｣螻ｱ蟇・ｮｮ',
        itemName: '貍・ｻ偵・髫暮延',
        country: '迺・怦',
      },
      {
        domainName: '遐よｵ√ヮ蠎ｭ',
        itemName: '莉頑・蜉・判',
        country: '遞ｲ螯ｻ',
      },
      {
        domainName: '譛蛾ゅ・蝪・,
        itemName: '辜域律讓ｩ螽・,
        country: '繧ｹ繝｡繝ｼ繝ｫ',
      },
      {
        domainName: '豺ｱ貎ｮ縺ｮ菴咎渊',
        itemName: '辟｡蝙｢縺ｪ豬ｷ',
        country: '繝輔か繝ｳ繝・・繝・,
      },
      {
        domainName: '蜿､縺ｮ逵ｺ譛帛床',
        itemName: '逾樒ｧ倥↑繧狗・',
        country: '繝翫ち'
      },
      {
        domainName: '螟ｱ繧上ｌ縺滓怦縺ｮ蠎ｭ',
        itemName: '讌ｵ蛹励・譛ｫ陬・,
        country: '繝翫ラ繝ｻ繧ｯ繝ｩ繧､',
      },
    ];

    return [
      [/* sunday */],
      monday_thursday,
      tuesday_friday,
      wednesday_saturday,
      monday_thursday,
      tuesday_friday,
      wednesday_saturday,
    ][dayOfWeek];
  });

  const talentsItemDomains = ((dayOfWeek: number): Item[] => {
    const monday_thursday: Item[] = [
      {
        domainName: '蠢伜唆縺ｮ蟲｡隹ｷ',
        itemName: '閾ｪ逕ｱ',
        country: '繝｢繝ｳ繝・,
      }, {
        domainName: '螟ｪ螻ｱ蠎・,
        itemName: '郢∵・,
        country: '迺・怦',
      }, {
        domainName: '闖ｫ濶ｲ繝主ｺｭ',
        itemName: '豬ｮ荳・,
        country: '遞ｲ螯ｻ',
      }, {
        domainName: '辟｡蟄ｦ縺ｮ蝪・,
        itemName: '蠢險',
        country: '繧ｹ繝｡繝ｼ繝ｫ',
      }, {
        domainName: '闥ｼ逋ｽ縺ｮ驕ｺ譬・,
        itemName: '蜈ｬ蟷ｳ',
        country: '繝輔か繝ｳ繝・・繝・,
      }, {
        domainName: '遘倡ｎ縺ｮ蟷ｽ蠅・,
        itemName: '隗帝・,
        country: '繝翫ち',
      }, {
        domainName: '蜈峨↑縺肴ｷｱ驛ｽ',
        itemName: '譛亥・',
        country: '繝翫ラ繝ｻ繧ｯ繝ｩ繧､',
      },
    ];
    const tuesday_friday = [
      {
        domainName: '蠢伜唆縺ｮ蟲｡隹ｷ',
        itemName: '謚嶺ｺ・,
        country: '繝｢繝ｳ繝・,
      }, {
        domainName: '螟ｪ螻ｱ蠎・,
        itemName: '蜍､蜉ｴ',
        country: '迺・怦',
      }, {
        domainName: '闖ｫ濶ｲ繝主ｺｭ',
        itemName: '鬚ｨ髮・,
        country: '遞ｲ螯ｻ',
      }, {
        domainName: '辟｡蟄ｦ縺ｮ蝪・,
        itemName: '蜑ｵ諢・,
        country: '繧ｹ繝｡繝ｼ繝ｫ',
      }, {
        domainName: '闥ｼ逋ｽ縺ｮ驕ｺ譬・,
        itemName: '豁｣鄒ｩ',
        country: '繝輔か繝ｳ繝・・繝・,
      }, {
        domainName: '遘倡ｎ縺ｮ蟷ｽ蠅・,
        itemName: '辟夂・',
        country: '繝翫ち',
      }, {
        domainName: '蜈峨↑縺肴ｷｱ驛ｽ',
        itemName: '讌ｽ蝨・,
        country: '繝翫ラ繝ｻ繧ｯ繝ｩ繧､',
      },
    ];
    const wednesday_saturday = [
      {
        domainName: '蠢伜唆縺ｮ蟲｡隹ｷ',
        itemName: '隧ｩ譁・,
        country: '繝｢繝ｳ繝・,
      }, {
        domainName: '螟ｪ螻ｱ蠎・,
        itemName: '鮟・≡',
        country: '迺・怦',
      }, {
        domainName: '闖ｫ濶ｲ繝主ｺｭ',
        itemName: '螟ｩ蜈・,
        country: '遞ｲ螯ｻ',
      }, {
        domainName: '辟｡蟄ｦ縺ｮ蝪・,
        itemName: '遽､陦・,
        country: '繧ｹ繝｡繝ｼ繝ｫ',
      }, {
        domainName: '闥ｼ逋ｽ縺ｮ驕ｺ譬・,
        itemName: '遘ｩ蠎・,
        country: '繝輔か繝ｳ繝・・繝・,
      }, {
        domainName: '遘倡ｎ縺ｮ蟷ｽ蠅・,
        itemName: '邏帑ｺ・,
        country: '繝翫ち',
      }, {
        domainName: '蜈峨↑縺肴ｷｱ驛ｽ',
        itemName: '豬∵ｵｪ',
        country: '繝翫ラ繝ｻ繧ｯ繝ｩ繧､',
      },
    ];

    return [
      [/* sunday */],
      monday_thursday,
      tuesday_friday,
      wednesday_saturday,
      monday_thursday,
      tuesday_friday,
      wednesday_saturday,
    ][dayOfWeek];
  });

  const TALENT_DOMAIN_IMAGES = [
    '1HoiXguZOaooMabbysboPqIWt587vR2hy',
    '1qWSowwYsSEdTWDwAUOoOLCx6U3C8nhAm',
    '1Rbjfu26j9M8XkwjnI_337b-_dcSmcGcX',
  ] as const;

  const WEAPON_ASCENSION_MATERIAL_IMAGES = [
    '1ZLGU--hbD16z2euz_0U05k8kI3PFBBHh',
    '1-vc-8jILsCp8257iF1U8ZnRAOZZ-amQ_',
    '1iyuMGUNXNh0V83xxog7ujJRSrbxh-jr0',
  ] as const;

  const getTalentDomainImage = (dayOfWeek: number): GoogleAppsScript.Base.Blob | null => {
    const imageId = [
      null,
      ...TALENT_DOMAIN_IMAGES,
      ...TALENT_DOMAIN_IMAGES,
    ][dayOfWeek];

    if (imageId != null) return DriveApp.getFileById(imageId).getBlob();

    return null;
  }

  const getWeaponAscensionMaterialImage = (dayOfWeek: number): GoogleAppsScript.Base.Blob | null => {
    const imageId = [
      null,
      ...WEAPON_ASCENSION_MATERIAL_IMAGES,
      ...WEAPON_ASCENSION_MATERIAL_IMAGES,
    ][dayOfWeek];

    if (imageId != null) return DriveApp.getFileById(imageId).getBlob();

    return null;
  }

  DailyInfo.domainMessages = (currentDate) => {
    Utils.log(`Subscribe domain message notification`);

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const morning = currentHours === 8 && currentMinutes < 15;

    if (!morning) {
      Utils.log(`Unsubscribe domain message notification`);
      return [];
    }

    const currentDay = currentDate.getDay();

    if (currentDay === 0) {
      // 譌･譖懈律
      const talentImages: Bluesky.AttachImage[] = TALENT_DOMAIN_IMAGES.map(id => {
        const blob = DriveApp.getFileById(id).getBlob();
        const size = Image.getRectangleSize!(blob);

        return {
          altText: 'Character Talent Materials',
          blob,
          aspectRatio: { ...size }
        };
      });

      const weaponImages: Bluesky.AttachImage[] = WEAPON_ASCENSION_MATERIAL_IMAGES.map(id => {
        const blob = DriveApp.getFileById(id).getBlob();
        const size = Image.getRectangleSize!(blob);

        return {
          altText: 'Character Talent Materials',
          blob,
          aspectRatio: { ...size }
        };
      })

      return [
        {
          body: `譌･譖懈律縺ｯ蜈ｨ髢区叛・∝､ｩ雉ｦ邏譚舌・縺翫＆繧峨＞当 #蜴溽･杼,
          images: talentImages,
        },
        {
          body: `譌･譖懈律縺ｯ蜈ｨ髢区叛・∵ｭｦ蝎ｨ遯∫ｴ邏譚舌・縺翫＆繧峨＞笞費ｸ・#蜴溽･杼,
          images: weaponImages,
        },
      ];
    } else {
      // 譛域屆譌･・槫悄譖懈律
      const talents = talentsItemDomains(currentDay);
      const weapons = weaponAscensionMaterials(currentDay);

      const talentImage = getTalentDomainImage(currentDay);
      const weaponImage = getWeaponAscensionMaterialImage(currentDay);

      return [
        {
          body: `莉頑律縺ｮ螟ｩ雉ｦ遘伜｢・・縺翫＠繧峨○当 #蜴溽･・

${talents.map(it => `${it.domainName}・・{it.country}・会ｼ・{it.itemName}`).join('\n')}`,
          images: talentImage ? [{
            altText: 'Character Talent Materials',
            blob: talentImage,
            aspectRatio: { ...Image.getRectangleSize!(talentImage) }
          }] : [],
        },
        {
          body: `莉頑律縺ｮ豁ｦ蝎ｨ遯∫ｴ邏譚舌・縺翫＠繧峨○笞費ｸ・#蜴溽･・

${weapons.map(it => `${it.domainName}・・{it.country}・会ｼ・{it.itemName}`).join('\n')}`,
          images: weaponImage ? [{
            altText: 'Weapon Ascension Materials',
            blob: weaponImage,
            aspectRatio: { ...Image.getRectangleSize!(weaponImage) }
          }] : [],
        },
      ];
    }
  }
})();


