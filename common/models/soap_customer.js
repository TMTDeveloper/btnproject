'use strict';

module.exports = function(Soapcustomer) {
    Soapcustomer.getListBTNConsumer = function (cb) {
        Soapcustomer.GetListBTNConsumer({Data: 'SP3K',Tanggal: "20160107",uid:"$up3rPAN"}, function (err, response) {
          var result = response;
          cb(err, result);
        });
      };

      Soapcustomer.remoteMethod(
        'getListBTNConsumer', {
          returns: {arg: 'result', type: 'string', root: true},
          http: {verb: 'get', path: '/getlistconsumer'}
        }
    );
};
