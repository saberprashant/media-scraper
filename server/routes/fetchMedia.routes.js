module.exports = function(app){

  app.get('/api', function(req, res){
    res.json({ message: "Welcome to Media Scraper App 333." });
  });

  //other routes..
}