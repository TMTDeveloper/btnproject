'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var http = require('http');
var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) {
    console.log(err)
  }

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

var moment = require('moment');
var CronJob = require('cron').CronJob;
new CronJob('1 */1 * * * *', function () {
  console.log('cronjob every 10 minutes run');
  app.models.SOAP_CUSTOMER.getListBTNConsumerPKfromto(moment().format('YYYYMMDD'),moment().format('YYYYMMDD'),function(err,succ){
    
  });
  app.models.SOAP_CUSTOMER.getListBTNConsumerSP3Kfromto(moment().format('YYYYMMDD'),moment().format('YYYYMMDD'),function(err,succ){
    
  });


}, null, true);

