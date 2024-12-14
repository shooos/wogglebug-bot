(() => {
  function toDataUrl(fileId: string): string {
    const blob = DriveApp.getFileById(fileId).getBlob();
    return `data:${blob.getContentType()};base64,${Utilities.base64Encode(blob.getBytes())}`;
  }

  Genshin.spiralAbyss.createImage = (hours) => {
    const image = toDataUrl('1ESTC71ucNOR-ctKaFXYbadzjZfL_ojLH');
    const hoursPositionX = hours < 10 ? 260 : 340;

    const html = `
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet">
  </head>
  <body>
    <canvas id="canvas" style="width: 768px; height: 512px;"></canvas>

    <script>
      function draw() {
        const canvas = document.getElementById('canvas');
          const ctx = canvas.getContext('2d');
          const baseImage = new Image();
          const grad=ctx.createLinearGradient(0, 0, 0, 400);
          grad.addColorStop(0, 'yellow');
          grad.addColorStop(1, 'orange');
          
          baseImage.onload = function() {
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            ctx.drawImage(baseImage, 0, 0, 768, 512);

            ctx.font = '110px "Yusei Magic"';
            ctx.fillStyle = 'white';
            ctx.fillText('あと', 70, 380);
            ctx.fillText('時間', 520, 380);

            ctx.font = '240px "Yusei Magic"';
            ctx.fillStyle = grad;
            ctx.fillText(${hours}, ${hoursPositionX}, 380)
          }
          baseImage.src = ${image}
      }

      draw()
    </script>
  </body>
</html>
    `;

    const blob = Utilities.newBlob(html, MimeType.HTML).setName('spiral-abyss-image.png');
    return DriveApp.createFile(blob.getAs(MimeType.PNG));
  }
})();
