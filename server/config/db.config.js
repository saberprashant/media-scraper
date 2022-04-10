module.exports = {
  HOST: "localhost",
  USER: "prashantjain",
  PASSWORD: "",
  DB: "media_scraper",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};