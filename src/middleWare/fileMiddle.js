const path = require("path");
const Jimp = require("jimp");
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file");
const multer = require("koa-multer");
const avatarStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, AVATAR_PATH);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const avaterUpload = new multer({
  storage: avatarStorage,
});
const avatarHandler = avaterUpload.single("avatar");

const pictureStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, PICTURE_PATH);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const pictureUpload = new multer({
  storage: pictureStorage,
});
const picturesHandler = pictureUpload.array("picture", 9);

const pictureResize = async (ctx, next) => {
  try {
    const files = ctx.req.files;
    for (const file of files) {
      const destPath = path.join(file.destination, file.filename);
      Jimp.read(file.path).then((image) => {
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
        image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
      });
    }
    await next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  avatarHandler,
  picturesHandler,
  pictureResize,
};
