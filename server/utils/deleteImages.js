const fs = require('fs');

const deleteImages = (path) => {
  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) {
    console.error(err);
  }
};

module.exports = deleteImages;
