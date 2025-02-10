(() => {
  interface Item {
    domainName: string;
    itemName: string;
    country: string;
  };

  const weaponAscensionMaterials = ((dayOfWeek: number): Item[] => {
    const monday_thirsday: Item[] = [
      {
        domainName: 'セシリアの苗床',
        itemName: '高塔の王',
        country: 'モンド',
      },
      {
        domainName: '震雷連山密宮',
        itemName: '孤雲寒林',
        country: '璃月',
      },
      {
        domainName: '砂流ノ庭',
        itemName: '遠海夷地',
        country: '稲妻',
      },
      {
        domainName: '有頂の塔',
        itemName: '静謐な森のしずく',
        country: 'スメール',
      },
      {
        domainName: '深潮の余韻',
        itemName: '悠久の弦',
        country: 'フォンテーヌ',
      },
      {
        domainName: '古の眺望台',
        itemName: '灼心を捧げる',
        country: 'ナタ'
      },
    ];
    const tuesday_friday = [
      {
        domainName: 'セシリアの苗床',
        itemName: '凛風奔狼',
        country: 'モンド',
      },
      {
        domainName: '震雷連山密宮',
        itemName: '霧海雲間',
        country: '璃月',
      },
      {
        domainName: '砂流ノ庭',
        itemName: '鳴神御霊',
        country: '稲妻',
      },
      {
        domainName: '有頂の塔',
        itemName: 'オアシスガーデン',
        country: 'スメール',
      },
      {
        domainName: '深潮の余韻',
        itemName: '純聖な雫',
        country: 'フォンテーヌ',
      },
      {
        domainName: '古の眺望台',
        itemName: '狂乱の聖主',
        country: 'ナタ'
      },
    ];
    const wednesday_saturday = [
      {
        domainName: 'セシリアの苗床',
        itemName: '獅牙戦士',
        country: 'モンド',
      },
      {
        domainName: '震雷連山密宮',
        itemName: '漆黒の隕鉄',
        country: '璃月',
      },
      {
        domainName: '砂流ノ庭',
        itemName: '今昔劇画',
        country: '稲妻',
      },
      {
        domainName: '有頂の塔',
        itemName: '烈日権威',
        country: 'スメール',
      },
      {
        domainName: '深潮の余韻',
        itemName: '無垢な海',
        country: 'フォンテーヌ',
      },
      {
        domainName: '古の眺望台',
        itemName: '神秘なる煙',
        country: 'ナタ'
      },
    ];

    return [
      [/* sunday */],
      monday_thirsday,
      tuesday_friday,
      wednesday_saturday,
      monday_thirsday,
      tuesday_friday,
      wednesday_saturday,
    ][dayOfWeek];
  });

  const talentsItemDomains = ((dayOfWeek: number): Item[] => {
    const monday_thirsday: Item[] = [
      {
        domainName: '忘却の峡谷',
        itemName: '自由',
        country: 'モンド',
      }, {
        domainName: '太山府',
        itemName: '繁栄',
        country: '璃月',
      }, {
        domainName: '菫色ノ庭',
        itemName: '浮世',
        country: '稲妻',
      }, {
        domainName: '無学の塔',
        itemName: '忠言',
        country: 'スメール',
      }, {
        domainName: '蒼白の遺栄',
        itemName: '公平',
        country: 'フォンテーヌ',
      }, {
        domainName: '秘炎の幽墟',
        itemName: '角逐',
        country: 'ナタ',
      },
    ];
    const tuesday_friday = [
      {
        domainName: '忘却の峡谷',
        itemName: '抗争',
        country: 'モンド',
      }, {
        domainName: '太山府',
        itemName: '勤労',
        country: '璃月',
      }, {
        domainName: '菫色ノ庭',
        itemName: '風雅',
        country: '稲妻',
      }, {
        domainName: '無学の塔',
        itemName: '創意',
        country: 'スメール',
      }, {
        domainName: '蒼白の遺栄',
        itemName: '正義',
        country: 'フォンテーヌ',
      }, {
        domainName: '秘炎の幽墟',
        itemName: '焚燼',
        country: 'ナタ',
      },
    ];
    const wednesday_saturday = [
      {
        domainName: '忘却の峡谷',
        itemName: '詩文',
        country: 'モンド',
      }, {
        domainName: '太山府',
        itemName: '黄金',
        country: '璃月',
      }, {
        domainName: '菫色ノ庭',
        itemName: '天光',
        country: '稲妻',
      }, {
        domainName: '無学の塔',
        itemName: '篤行',
        country: 'スメール',
      }, {
        domainName: '蒼白の遺栄',
        itemName: '秩序',
        country: 'フォンテーヌ',
      }, {
        domainName: '秘炎の幽墟',
        itemName: '紛争',
        country: 'ナタ',
      },
    ];

    return [
      [/* sunday */],
      monday_thirsday,
      tuesday_friday,
      wednesday_saturday,
      monday_thirsday,
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
    Logger.log(`Subscribe domain message notification`);

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const morning = currentHours === 8 && currentMinutes < 15;

    if (!morning) {
      Logger.log(`Unsubscribe domain message notification`);
      return null;
    }

    const currentDay = currentDate.getDay();

    if (currentDay === 0) {
      // 日曜日
      const talentImages: Bluesky.AttachImage[] = TALENT_DOMAIN_IMAGES.map(id => {
        const blob = DriveApp.getFileById(id).getBlob();
        const size = Image.getRectangleSize(blob);

        return {
          altText: 'Character Talent Materials',
          blob,
          aspectRatio: { ...size }
        };
      });

      const weaponImages: Bluesky.AttachImage[] = WEAPON_ASCENSION_MATERIAL_IMAGES.map(id => {
        const blob = DriveApp.getFileById(id).getBlob();
        const size = Image.getRectangleSize(blob);

        return {
          altText: 'Character Talent Materials',
          blob,
          aspectRatio: { ...size }
        };
      })

      return [
        {
          body: `日曜日は全開放！天賦素材のおさらい📖 #原神`,
          images: talentImages,
        },
        {
          body: `日曜日は全開放！武器突破素材のおさらい⚔️ #原神`,
          images: weaponImages,
        },
      ];
    } else {
      // 月曜日～土曜日
      const talents = talentsItemDomains(currentDay);
      const weapons = weaponAscensionMaterials(currentDay);

      const talentImage = getTalentDomainImage(currentDay);
      const talentImageSize = Image.getRectangleSize(talentImage);

      const weaponImage = getWeaponAscensionMaterialImage(currentDay);
      const weaponImageSize = Image.getRectangleSize(weaponImage);

      return [
        {
          body: `今日の天賦秘境のおしらせ📖 #原神

${talents.map(it => `${it.domainName}（${it.country}）：${it.itemName}`).join('\n')}`,
          images: [{
            altText: 'Character Talent Materials',
            blob: talentImage,
            aspectRatio: { ...talentImageSize }
          }],
        },
        {
          body: `今日の武器突破素材のおしらせ⚔️ #原神

${weapons.map(it => `${it.domainName}（${it.country}）：${it.itemName}`).join('\n')}`,
          images: [{
            altText: 'Weapon Ascension Materials',
            blob: weaponImage,
            aspectRatio: { ...weaponImageSize }
          }],
        },
      ];
    }
  }
})();
