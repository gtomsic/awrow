const sharp = require('sharp');
const fs = require('fs');

const imageResize = async (data) => {
  // Create a user folder
  // Link to users_id
  let dir = `./users/${data.username}/${data.album}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await sharp(data.path)
    .resize({
      width: data.width,
      height: data.height,
      position: sharp.strategy.entropy,
    })
    .toFormat('jpeg')
    .jpeg({ quality: data.quality })
    .toFile(data.location);
};

module.exports = imageResize;
