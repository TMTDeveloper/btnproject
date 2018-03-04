'use strict';

module.exports = function(Mstcustomersp3k) {

    Mstcustomersp3k.getfromto = function (datetoday, dateto, cb) {

        var datefrom = datetoday + " 00:00:00.00";
        var dateto = dateto + " 24:00:00.00";
    
        Mstcustomersp3k.find({
          where: {
            DATE_TIME_CREATE: {
              between: [datefrom, dateto]
            }
          }
        }, function (err, data) {
          cb(null, data)
        })
      };
    
    
      Mstcustomersp3k.remoteMethod(
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
    
    
      Mstcustomersp3k.gettoday = function (datetoday, cb) {
    
        var datefrom = datetoday + " 00:00:00.00";
        var dateto = datetoday + " 24:00:00.00";
    
        Mstcustomersp3k.find({
          where: {
            DATE_TIME_CREATE: {
              between: [datefrom, dateto]
            }
          }
        }, function (err, data) {
          cb(null, data)
        })
      };
    
    
      Mstcustomersp3k.remoteMethod(
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
      Mstcustomersp3k.getall = function (cb) {
    
    
        Mstcustomersp3k.find({
        }, function (err, data) {
          cb(null, data)
        })
      };
    
    
      Mstcustomersp3k.remoteMethod(
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
