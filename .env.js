//API_URL: process.env.API_URL || 'http://localhost:8081',

module.exports = {
  API_URL: process.env.API_URL || 'http://localhost/api',
  NODE_ENV: process.env.NODE_ENV || 'DEVELOPMENT',
  SUBDOMAIN: process.env.SUBDOMAIN || 'staging'
};
