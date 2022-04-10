const media_controller = require('../controllers/media.controller');

module.exports = function(app){
  app.post('/api/findAssets', media_controller.findAssets);

  app.get('/api/fetchAssets', media_controller.fetchAssets);
}