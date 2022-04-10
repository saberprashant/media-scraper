const db = require("../models");
const Media = db.media;
const Op = db.Sequelize.Op;
const rp = require('request-promise');
const cheerio = require('cheerio');

// POST: Create and Save a new Media
exports.findAssets = (req, res) => {
  // Validate request
  if (!req.body.urls) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const urls = req.body.urls;
  const fetchedAssets = {};

  Promise.all(urls.map(url => {
    return rp(url)
      .then(function(html){
        //success
        fetchedAssets[url] = [];
        const $ = cheerio.load(html);

        let imgNodes = $('img');
        let videoNodes = $('video');

        for(let i = 0; i < imgNodes.length; i++) {
          let obj = {
            url: '',
            type: 'img'
          }
          let u = imgNodes[i].attribs.src;
          if(u[0] === '/' && u[1] === '/') {
            u = u.slice(2);
          }
          obj.url = u;
          fetchedAssets[url].push(obj);
        }
        
        for(let i = 0; i < videoNodes.length; i++) {
          let obj = {
            url: '',
            type: 'video'
          }
          let u = videoNodes[i].children('source').attribs.src;
          if(u[0] === '/' && u[1] === '/') {
            u = u.slice(2);
          }
          obj.url = u;
          fetchedAssets[url].push(obj);
        }
      })
      .catch(function(err){
        //handle error

      });
  }))
  .then(r => {
    return res.json({ data: fetchedAssets, message: "Results for the entered URLs" });
  })
};

// GET: Fetch media 
exports.fetchAssets = (req, res) => {

  //fetch all assets from database
  Media.findAll({})
  res.json({ data: data, message: "Fetched media results." });

};