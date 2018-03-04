'use strict';

module.exports = function (Mstcustomerpk) {
  Mstcustomerpk.getfromto = function (datetoday, dateto, cb) {

    var datefrom = datetoday + " 00:00:00.00";
    var dateto = dateto + " 24:00:00.00";

    Mstcustomerpk.find({
      where: {
        DATE_TIME_CREATE: {
          between: [datefrom, dateto]
        }
      }
    }, function (err, data) {
      cb(null, data)
    })
  };


  Mstcustomerpk.remoteMethod(
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


  Mstcustomerpk.gettoday = function (datetoday, cb) {

    var datefrom = datetoday + " 00:00:00.00";
    var dateto = datetoday + " 24:00:00.00";

    Mstcustomerpk.find({
      where: {
        DATE_TIME_CREATE: {
          between: [datefrom, dateto]
        }
      }
    }, function (err, data) {
      cb(null, data)
    })
  };


  Mstcustomerpk.remoteMethod(
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
  Mstcustomerpk.getall = function (cb) {


    Mstcustomerpk.find({}, function (err, data) {
      cb(null, data)
    })
  };


  Mstcustomerpk.remoteMethod(
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
