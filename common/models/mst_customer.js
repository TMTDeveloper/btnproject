'use strict';

module.exports = function(Mstcustomer) {

    Mstcustomer.getfromto = function (datetoday, dateto, cb) {

        var datefrom = datetoday + " 00:00:00.00";
        var dateto = dateto + " 24:00:00.00";
    
        Mstcustomer.find({
          where: {
            DATE_TIME_CREATE: {
              between: [datefrom, dateto]
            }
          }
        }, function (err, data) {
          cb(null, data)
        })
      };
    
    
      Mstcustomer.remoteMethod(
        'getfromto', {
          http: {
            path: '/fromto',
            verb: 'post'
          },
          accepts: [{
            arg: 'datefrom',
            type: 'string'
          }, {
            arg: 'dateto',
            type: 'string'
    
          }],
          returns: {
            arg: 'data',
            type: 'string'
          }
        })
    
    
      Mstcustomer.gettoday = function (datetoday, cb) {
    
        var datefrom = datetoday + " 00:00:00.00";
        var dateto = datetoday + " 24:00:00.00";
    
        Mstcustomer.find({
          where: {
            DATE_TIME_CREATE: {
              between: [datefrom, dateto]
            }
          }
        }, function (err, data) {
          cb(null, data)
        })
      };
    
    
      Mstcustomer.remoteMethod(
        'gettoday', {
          http: {
            path: '/today',
            verb: 'post'
          },
          accepts: {
            arg: 'datetoday',
            type: 'string'
          },
          returns: {
            arg: 'data',
            type: 'string'
          }
        }
      )
      Mstcustomer.getall = function (cb) {
    
    
        Mstcustomer.find({
        }, function (err, data) {
          cb(null, data)
        })
      };
    
    
      Mstcustomer.remoteMethod(
        'getall', {
          http: {
            path: '/all',
            verb: 'get'
          },
          returns: {
            arg: 'data',
            type: 'string'
          }
        }
      )

};
