module.exports = (sequelize, Sequelize) => {
  const Media = sequelize.define("media", {
    url: {
      type: Sequelize.STRING
    },
    media: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING    //img or video
    }
  });
  return Media;
};