(() => {
  function toDataUrl(fileId: string): string {
    const blob = DriveApp.getFileById(fileId).getBlob();
    return `data:${blob.getContentType()};base64,${Utilities.base64Encode(blob.getBytes())}`;
  }

  Genshin.spiralAbyss.createImage = (hours) => {
    Logger.log(`Start to create spiral abyss image | Hours=${hours}`);

    const image = toDataUrl('1ESTC71ucNOR-ctKaFXYbadzjZfL_ojLH');
    const hoursPositionX = hours < 10 ? 320 : 260;

    const html = `
<!DOCTYPE html>
<html lang="ja">
  <head>
    <base target="_top">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet">
    <script>
      function successSaveImage(fileId) {
        google.script.run.successSaveSpiralAbyssImage(fileId);
      }

      function failureSaveImage(error) {
        google.script.run.failureSaveSpiralAbyssImage(error);
      }

      function draw() {
        document.body.append(document.createTextNode('Draw image to canvas'));

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const baseImage = new Image();
        const grad=ctx.createLinearGradient(0, 0, 0, 400);
        grad.addColorStop(0, 'yellow');
        grad.addColorStop(1, 'orange');
        
        baseImage.onload = function() {
          document.body.append(document.createTextNode('On load image'));

          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;
          ctx.drawImage(baseImage, 0, 0, 768, 512);

          ctx.font = '110px "Yusei Magic"';
          ctx.fillStyle = 'white';
          ctx.fillText('あと', 70, 380);
          ctx.fillText('時間', 520, 380);

          ctx.font = '240px "Yusei Magic"';
          ctx.fillStyle = grad;
          ctx.fillText(${hours}, ${hoursPositionX}, 380);

          const fileName = 'spiral-abyss.png';
          const imageType = 'image/png';
          const base64 = canvas.toDataURL(imageType);
          const imageData = { fileName, imageType, base64 };

          document.body.append(document.createTextNode('Created image base64'));

          try {
          google.script.run
            .withSuccessHandler(successSaveImage)
            .withFailureHandler(failureSaveImage)
            .saveSpiralAbyssImage(imageData);
          }catch(e){
            document.body.append(document.createTextNode(e));
          }
        }
        baseImage.src = '${image}';
      }

      window.onload = () => { draw() }
    </script>
  </head>
  <body>
    <canvas id="canvas" style="width: 768px; height: 512px;"></canvas>
  </body>
</html>
    `;

    const output = HtmlService.createHtmlOutput(html);
    const blob = output.getBlob().setName('spiral-abyss.pdf');
    DriveApp.createFile(blob.getAs(MimeType.PDF));

    const imageFolder = DriveApp.getFolderById(GENSHIN_SPIRAL_ABYSS_IMAGE_FOLDER_ID);
    const imageFile = imageFolder.getFiles().next();

    Logger.log(`Completed create spiral abyss image`);

    return imageFile;
  }
})();
