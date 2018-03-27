'use strict';
var moment = require('moment');
var async = require('async');
module.exports = function (Soapcustomer) {
  var app = require('../../server/server');

  Soapcustomer.getListBTNConsumerSP3KToday = function (datetoday, cb) {
    const a = moment(datetoday, 'YYYYMMDD');
    Soapcustomer.GetListBTNConsumer({
      Data: 'SP3K',
      Tanggal: a.format('YYYYMMDD'), //yyymmdd
      uid: "$up3rPAN"
    }, function (err, response) {
      var result = JSON.parse(response.GetListBTNConsumerResult);
      var Mstcustomersp3k = app.models.MST_CUSTOMER_SP3K;
      for (var data in result.data) {
        Mstcustomersp3k.create({
          "CUSTOMER_ID": result.data[data].NO_APLIKASI,
          "KODE_CABANG": result.data[data].KODE_CABANG,
          "CABANG": result.data[data].CABANG,
          "KANWIL": result.data[data].KANWIL,
          "NO_APLIKASI": result.data[data].NO_APLIKASI,
          "NAMA_DEBITUR": result.data[data].NAMA_DEBITUR,
          "GENDER": result.data[data].GENDER,
          "ALAMAT_DEBITUR": result.data[data].ALAMAT_DEBITUR,
          "ALAMAT_AGUNAN": result.data[data].ALAMAT_AGUNAN,
          "TANGGAL_LAHIR": result.data[data].TANGGAL_LAHIR,
          "USIA": parseInt(result.data[data].USIA),
          "SP3K_DATE": result.data[data].SP3K_DATE,
          "JANGKA_WAKTU": result.data[data].JANGKA_WAKTU,
          "JENIS_KREDIT": result.data[data].JENIS_KREDIT,
          "PLAFOND_KREDIT": parseInt(result.data[data].PLAFOND_KREDIT),
          "HARGA_BANGUNAN": parseInt(result.data[data].HARGA_BANGUNAN),
          "PEKERJAAN": result.data[data].PEKERJAAN,
          "ASURANSI_JIWA": parseInt(result.data[data].ASURANSI_JIWA),
          "ASURANSI_FIRE": parseInt(result.data[data].ASURANSI_FIRE),
          "ASURANSI_KREDIT": parseInt(result.data[data].ASURANSI_KREDIT),
          "DATE_TIME_CREATE": "2018-02-14T11:40:48.637Z"
        }, function (err, inst) {

        });
      };
      //          cust.create(
      // {"CUSTOMER_ID":}
      //          )
      //          String customerId = consumer.getString("NO_APLIKASI");
      //          String kodeCabang = consumer.getString("KODE_CABANG"); // data
      //          String cabang = consumer.getString("CABANG");
      //          String kanwil = consumer.getString("KANWIL");
      //          String noAplikasi = consumer.getString("NO_APLIKASI");
      //          System.out.println(noAplikasi);
      //          String namaDebitur = consumer.getString("NAMA_DEBITUR");
      //          String gender = consumer.getString("GENDER");
      //          String alamatDebitur = consumer.getString("ALAMAT_DEBITUR");
      //          String alamatAgunan = consumer.getString("ALAMAT_AGUNAN");
      //          String tanggakLahir = consumer.getString("TANGGAL_LAHIR");
      //          int usia = consumer.getInt("USIA");
      //          String pkDate = consumer.getString("SP3K_DATE");
      //          String jangkaWaktu = consumer.getString("JANGKA_WAKTU");
      //          String jenisKredit = consumer.getString("JENIS_KREDIT");
      //          double plafond = consumer.getDouble("PLAFOND_KREDIT");
      //          double hargaBangunan = consumer.getDouble("HARGA_BANGUNAN");
      //          String pekerjaan = consumer.getString("PEKERJAAN");
      //          double asuransiJiwa = consumer.getDouble("ASURANSI_JIWA");
      //          double asuransiFire = consumer.getDouble("ASURANSI_FIRE");
      //          double asuransiKredit = consumer.getDouble("ASURANSI_KREDIT");
      var data = {
        message: result.message,
        error: err || null
      }
      cb(err, data);
    });
  };

  Soapcustomer.remoteMethod(
    'getListBTNConsumerSP3KToday', {
      accepts: {
        arg: 'datetoday',
        type: 'string'
      },
      returns: {
        arg: 'data',
        type: 'object',
        root: true
      },
      http: {
        verb: 'post',
        path: '/getListBTNConsumerSP3KToday'
      }
    });

  Soapcustomer.getListBTNConsumerSP3Kfromto = function (datefrom, dateto, cb) {

    const a = moment(datefrom);
    const b = moment(dateto);
    var m = moment(datefrom);


    async function getSoap(date, callback) {
      await Soapcustomer.GetListBTNConsumer({
        Data: 'SP3K',
        Tanggal: date,
        uid: "$up3rPAN"
      }, async function (err, response) {
        console.log(date);
        if (err !== null) {
          var data = {
            message: "success",
            error: err
            // point: "btn connect"
          }
          cb(null, data)
        }

        let result = JSON.parse(response.GetListBTNConsumerResult);
        if (result.data.length > 0) {
          async.eachOf(result.data, function (value, data, err) {
            
            var Mstcustomersp3k = app.models.MST_CUSTOMER_SP3K;
            Mstcustomersp3k.upsert({
              "CUSTOMER_ID": result.data[data].NO_APLIKASI,
              "KODE_CABANG": result.data[data].KODE_CABANG,
              "CABANG": result.data[data].CABANG,
              "KANWIL": result.data[data].KANWIL,
              "NO_APLIKASI": result.data[data].NO_APLIKASI,
              "NAMA_DEBITUR": result.data[data].NAMA_DEBITUR,
              "GENDER": result.data[data].GENDER,
              "ALAMAT_DEBITUR": result.data[data].ALAMAT_DEBITUR,
              "ALAMAT_AGUNAN": result.data[data].ALAMAT_AGUNAN,
              "TANGGAL_LAHIR": result.data[data].TANGGAL_LAHIR,
              "USIA": parseInt(result.data[data].USIA),
              "SP3K_DATE": result.data[data].SP3K_DATE,
              "JANGKA_WAKTU": result.data[data].JANGKA_WAKTU,
              "JENIS_KREDIT": result.data[data].JENIS_KREDIT,
              "PLAFOND_KREDIT": parseInt(result.data[data].PLAFOND_KREDIT),
              "HARGA_BANGUNAN": parseInt(result.data[data].HARGA_BANGUNAN),
              "PEKERJAAN": result.data[data].PEKERJAAN,
              "ASURANSI_JIWA": parseInt(result.data[data].ASURANSI_JIWA),
              "ASURANSI_FIRE": parseInt(result.data[data].ASURANSI_FIRE),
              "ASURANSI_KREDIT": parseInt(result.data[data].ASURANSI_KREDIT),
              "DATE_TIME_CREATE": "2018-02-14T11:40:48.637Z"
            }, (err) => {
              console.log("upsert" + err)
              if (err) {
                var data = { 
                  message: "Proses Gagal",
                  error: err
                  // point: "insert"
                }
                cb(null, data);
              }
              // configs is now a map of JSON data

            });



          }, function (err) {
            console.log("looping" + err)
            if (err) {
              var data = {
                message: "Proses Gagal",
                error: err,
                // point: "looping"
              }
              cb(null, data);
            }
          })



        };
        callback(err);

      });
    }

    function loopdata(x) {
      getSoap(x.format('YYYYMMDD'), function (error) {
        x.add(1, 'days');
        var s=moment(datefrom).diff(moment(dateto),'days');
        console.log(s);
        console.log(x.diff(b, 'days'));
        console.log(x.diff(b, 'days'));
        if (x.diff(b, 'days') <= 0) {

          loopdata(x);
        } else if (x.diff(b, 'days') > 0 || isNaN(x.diff(b, 'days'))) {

          var data = {
            message: "success",
            error: error
          }
          cb(null, data);
        }



      });
    }

    loopdata(m);

  };

  Soapcustomer.remoteMethod(
    'getListBTNConsumerSP3Kfromto', {
      accepts: [
        {
          arg: 'datefrom',
          type: 'string'
        }, {
          arg: 'dateto',
          type: 'string'
        }
      ],
      returns: {
        arg: 'data',
        type: 'object',
        root: true
      },
      http: {
        verb: 'post',
        path: '/getListBTNConsumerSP3Kfromto'
      }
    });

  Soapcustomer.getListBTNConsumerPKToday = function (datetoday, cb) {

    const a = moment(datetoday, 'YYYYMMDD');
    Soapcustomer.GetListBTNConsumer({
      Data: 'PK',
      Tanggal: a.format('YYYYMMDD'), //yyymmdd
      uid: "$up3rPAN"
    }, function (err, response) {
      var result = JSON.parse(response.GetListBTNConsumerResult);
      var Mstcustomerpk = app.models.MST_CUSTOMER_PK;
      for (var data in result.data) {
        Mstcustomerpk.create({
          "CUSTOMER_ID": result.data[data].NO_APLIKASI,
          "KODE_CABANG": result.data[data].KODE_CABANG,
          "CABANG": result.data[data].CABANG,
          "KANWIL": result.data[data].KANWIL,
          "NO_APLIKASI": result.data[data].NO_APLIKASI,
          "NAMA_DEBITUR": result.data[data].NAMA_DEBITUR,
          "GENDER": result.data[data].GENDER,
          "ALAMAT_DEBITUR": result.data[data].ALAMAT_DEBITUR,
          "ALAMAT_AGUNAN": result.data[data].ALAMAT_AGUNAN,
          "TANGGAL_LAHIR": result.data[data].TANGGAL_LAHIR,
          "USIA": parseInt(result.data[data].USIA),
          "PK_DATE": result.data[data].PK_DATE,
          "JANGKA_WAKTU": result.data[data].JANGKA_WAKTU,
          "JENIS_KREDIT": result.data[data].JENIS_KREDIT,
          "PLAFOND_KREDIT": parseInt(result.data[data].PLAFOND_KREDIT),
          "HARGA_BANGUNAN": parseInt(result.data[data].HARGA_BANGUNAN),
          "PEKERJAAN": result.data[data].PEKERJAAN,
          "ASURANSI_JIWA": parseInt(result.data[data].ASURANSI_JIWA),
          "ASURANSI_FIRE": parseInt(result.data[data].ASURANSI_FIRE),
          "ASURANSI_KREDIT": parseInt(result.data[data].ASURANSI_KREDIT),
          "DATE_TIME_CREATE": "2018-02-14T11:40:48.637Z"
        }, function (err, inst) {

        });
      };

      var data = {
        message: result.message,
        error: err || null
      }
      cb(err, data);
    });
  };

  Soapcustomer.remoteMethod(
    'getListBTNConsumerPKToday', {
      accepts: {
        arg: 'datetoday',
        type: 'string'
      },
      returns: {
        arg: 'data',
        type: 'object',
        root: true
      },
      http: {
        verb: 'post',
        path: '/getlistconsumerPKtoday'
      }
    });

  Soapcustomer.getListBTNConsumerPKfromto = function ( datefrom, dateto, cb) {

    const a = moment(datefrom);
    const b = moment(dateto);
    var m = moment(datefrom);


    async function getSoap(date, callback) {
      await Soapcustomer.GetListBTNConsumer({
        Data: 'PK',
        Tanggal: date,
        uid: "$up3rPAN"
      }, async function (err, response) {
        console.log(date + response)
        if (err !== null) {
          var data = {
            message: "success",
            error: err
          }
          cb(null, data)
        }

        let result = JSON.parse(response.GetListBTNConsumerResult);
        if (result.data.length > 0) {
          async.eachOf(result.data, function (value, data, err) {

            var Mstcustomerpk = app.models.MST_CUSTOMER_PK;
            Mstcustomerpk.upsert({
              "CUSTOMER_ID": result.data[data].NO_APLIKASI,
              "KODE_CABANG": result.data[data].KODE_CABANG,
              "CABANG": result.data[data].CABANG,
              "KANWIL": result.data[data].KANWIL,
              "NO_APLIKASI": result.data[data].NO_APLIKASI,
              "NAMA_DEBITUR": result.data[data].NAMA_DEBITUR,
              "GENDER": result.data[data].GENDER,
              "ALAMAT_DEBITUR": result.data[data].ALAMAT_DEBITUR,
              "ALAMAT_AGUNAN": result.data[data].ALAMAT_AGUNAN,
              "TANGGAL_LAHIR": result.data[data].TANGGAL_LAHIR,
              "USIA": parseInt(result.data[data].USIA),
              "PK_DATE": result.data[data].PK_DATE,
              "JANGKA_WAKTU": result.data[data].JANGKA_WAKTU,
              "JENIS_KREDIT": result.data[data].JENIS_KREDIT,
              "PLAFOND_KREDIT": parseInt(result.data[data].PLAFOND_KREDIT),
              "HARGA_BANGUNAN": parseInt(result.data[data].HARGA_BANGUNAN),
              "PEKERJAAN": result.data[data].PEKERJAAN,
              "ASURANSI_JIWA": parseInt(result.data[data].ASURANSI_JIWA),
              "ASURANSI_FIRE": parseInt(result.data[data].ASURANSI_FIRE),
              "ASURANSI_KREDIT": parseInt(result.data[data].ASURANSI_KREDIT),
              "DATE_TIME_CREATE": "2018-02-14T11:40:48.637Z"
            }, (err) => {
              console.log("upsert" + err)
              if (err) {
                var data = {
                  message: "Proses Gagal",
                  error: err
                }
                cb(null, data);
              }
              // configs is now a map of JSON data

            });



          }, function (err) {
            console.log("looping" + err)
            if (err) {
              var data = {
                message: "Proses Gagal",
                error: err
              }
              cb(null, data);
            }
          })



        };
        callback(err);

      });
    }

    function loopdata(x) {
      getSoap(x.format('YYYYMMDD'), function (error) {
        x.add(1, 'days');
        var s=moment(datefrom).diff(moment(dateto),'days');
        console.log(s);
        console.log(x.diff(b, 'days'));
        console.log(x.diff(b, 'days'));
        if (x.diff(b, 'days') <= 0) {

          loopdata(x);
        } else if (x.diff(b, 'days') > 0 || isNaN(x.diff(b, 'days'))) {

          var data = {
            message: "success",
            error: error
          }
          cb(null, data);
        }



      });
    }

    loopdata(m);

  };

  Soapcustomer.remoteMethod(
    'getListBTNConsumerPKfromto', {
      accepts: [
        {
          arg: 'datefrom',
          type: 'string'
        }, {
          arg: 'dateto',
          type: 'string'
        }
      ],
      returns: {
        arg: 'data',
        type: 'object',
        root: true
      },
      http: {
        verb: 'post',
        path: '/getListBTNConsumerPKfromto'
      }
    });

  // Soapcustomer.getListBTNConsumerToday = function (datetoday, datatype, cb) {
  //   const a = moment(datetoday, 'YYYYMMDD');
  //   Soapcustomer.GetListBTNConsumer({
  //     Data: datatype,
  //     Tanggal: a.format('YYYYMMDD'), //yyymmdd
  //     uid: "$up3rPAN"
  //   }, function (err, response) {
  //     var result = JSON.parse(response.GetListBTNConsumerResult);
  //     var Mstcustomer = app.models.MST_CUSTOMER;
  //     var Mstcustomerpk = app.models.MST_CUSTOMER_PK;
  //     for (var data in result.data) {
  //       Mstcustomerpk.create({
  //         "CUSTOMER_ID": result.data[data].NO_APLIKASI,
  //         "KODE_CABANG": result.data[data].KODE_CABANG,
  //         "CABANG": result.data[data].CABANG,
  //         "KANWIL": result.data[data].KANWIL,
  //         "NO_APLIKASI": result.data[data].NO_APLIKASI,
  //         "NAMA_DEBITUR": result.data[data].NAMA_DEBITUR,
  //         "GENDER": result.data[data].GENDER,
  //         "ALAMAT_DEBITUR": result.data[data].ALAMAT_DEBITUR,
  //         "ALAMAT_AGUNAN": result.data[data].ALAMAT_AGUNAN,
  //         "TANGGAL_LAHIR": result.data[data].TANGGAL_LAHIR,
  //         "USIA": parseInt(result.data[data].USIA),
  //         "PK_DATE": result.data[data].PK_DATE,
  //         "JANGKA_WAKTU": result.data[data].JANGKA_WAKTU,
  //         "JENIS_KREDIT": result.data[data].JENIS_KREDIT,
  //         "PLAFOND_KREDIT": parseInt(result.data[data].PLAFOND_KREDIT),
  //         "HARGA_BANGUNAN": parseInt(result.data[data].HARGA_BANGUNAN),
  //         "PEKERJAAN": result.data[data].PEKERJAAN,
  //         "ASURANSI_JIWA": parseInt(result.data[data].ASURANSI_JIWA),
  //         "ASURANSI_FIRE": parseInt(result.data[data].ASURANSI_FIRE),
  //         "ASURANSI_KREDIT": parseInt(result.data[data].ASURANSI_KREDIT),
  //         "DATE_TIME_CREATE": "2018-02-14T11:40:48.637Z"
  //       }, function (err, inst) {

  //       });
  //     };
  //     for (var data in result.data) {
  //       Mstcustomer.create({
  //         "CUSTOMER_ID": result.data[data].NO_APLIKASI,
  //         "KODE_CABANG": result.data[data].KODE_CABANG,
  //         "CABANG": result.data[data].CABANG,
  //         "KANWIL": result.data[data].KANWIL,
  //         "NO_APLIKASI": result.data[data].NO_APLIKASI,
  //         "NAMA_DEBITUR": result.data[data].NAMA_DEBITUR,
  //         "GENDER": result.data[data].GENDER,
  //         "ALAMAT_DEBITUR": result.data[data].ALAMAT_DEBITUR,
  //         "ALAMAT_AGUNAN": result.data[data].ALAMAT_AGUNAN,
  //         "TANGGAL_LAHIR": result.data[data].TANGGAL_LAHIR,
  //         "USIA": parseInt(result.data[data].USIA),
  //         "PK_DATE": result.data[data].SP3K_DATE,
  //         "JANGKA_WAKTU": result.data[data].JANGKA_WAKTU,
  //         "JENIS_KREDIT": result.data[data].JENIS_KREDIT,
  //         "PLAFOND_KREDIT": parseInt(result.data[data].PLAFOND_KREDIT),
  //         "HARGA_BANGUNAN": parseInt(result.data[data].HARGA_BANGUNAN),
  //         "PEKERJAAN": result.data[data].PEKERJAAN,
  //         "ASURANSI_JIWA": parseInt(result.data[data].ASURANSI_JIWA),
  //         "ASURANSI_FIRE": parseInt(result.data[data].ASURANSI_FIRE),
  //         "ASURANSI_KREDIT": parseInt(result.data[data].ASURANSI_KREDIT),
  //         "DATE_TIME_CREATE": "2018-02-14T11:40:48.637Z"
  //       }, function (err, inst) {

  //       });
  //     };

  //    var data={
  //      message: result.message,
  //      error:err||null
  //    }
  //     cb(err, data);
  //   });
  // };

  // Soapcustomer.remoteMethod(
  //   'getListBTNConsumerToday', {
  //     accepts: [{
  //       arg: 'datatype',
  //       type: 'string'
  //     }, {
  //       arg: 'datetoday',
  //       type: 'string'
  //     }],
  //     returns: {
  //       arg: 'data',
  //       type: 'object',
  //       root: true
  //     },
  //     http: {
  //       verb: 'post',
  //       path: '/getlistconsumertoday'
  //     }
  //   });


};
