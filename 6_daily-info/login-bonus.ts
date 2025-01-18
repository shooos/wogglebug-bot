(() => {
  const imageId = '1CzfxDs1IHUHq5aFNeChSHMXMH5MVALGq';
  const imageBlob = DriveApp.getFileById(imageId).getBlob();

  DailyInfo.loginBonus = (currentDate) => {
    const imageSize = Image.getRectangleSize(imageBlob);

    return {
      body: '',
      images: [
        {
          altText: 'Daily Login Bonus',
          blob: imageBlob,
          aspectRatio: {
            width: imageSize.width,
            height: imageSize.height,
          },
        }
      ],
    }
  }
})();
