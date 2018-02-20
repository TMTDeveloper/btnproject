'use strict';
var moment = require('moment');

module.exports = function (Soapcustomer) {
  var app = require('../../server/server');
  Soapcustomer.getListBTNConsumerToday = function (datetoday, cb) {
    const a = moment(datetoday, 'YYYYMMDD');
    Soapcustomer.GetListBTNConsumer({
      Data: 'SP3K',
      Tanggal: a.format('YYYYMMDD'), //yyymmdd
      uid: "$up3rPAN"
    }, function (err, response) {
      var result = JSON.parse(response.GetListBTNConsumerResult);
      var Mstcustomer = app.models.MST_CUSTOMER;
      for (var data in result.data) {
        Mstcustomer.create({
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
          "PK_DATE": result.data[data].SP3K_DATE,
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

      cb(err, result.message);
    });
  };

  Soapcustomer.remoteMethod(
    'getListBTNConsumerToday', {
      accepts: {
        arg: 'datetoday',
        type: 'string'
      },
      returns: {
        arg: 'status',
        type: 'string',
        root: true
      },
      http: {
        verb: 'post',
        path: '/getlistconsumertoday'
      }
    });

  Soapcustomer.getListBTNConsumerfromto = function (httpReq, datefrom, dateto, cb) {
    httpReq.setTimeout(0);
    const a = moment(datefrom, 'YYYYMMDD');
    const b = moment(dateto, 'YYYYMMDD');
    var m = moment(a);


    async function getSoap(date, callback) {
      await Soapcustomer.GetListBTNConsumer({
        Data: 'SP3K',
        Tanggal: date,
        uid: "$up3rPAN"
      }, async function (err, response) {
        console.log(err);

        let result = JSON.parse(response.GetListBTNConsumerResult);
        if (result.data.length > 0) {
          for (let data in result.data) {
            try {
              await app.dataSources.MST_CUSTOMER.transaction(async models => {
                await models.MST_CUSTOMER.create({
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
                  "PK_DATE": result.data[data].SP3K_DATE,
                  "JANGKA_WAKTU": result.data[data].JANGKA_WAKTU,
                  "JENIS_KREDIT": result.data[data].JENIS_KREDIT,
                  "PLAFOND_KREDIT": parseInt(result.data[data].PLAFOND_KREDIT),
                  "HARGA_BANGUNAN": parseInt(result.data[data].HARGA_BANGUNAN),
                  "PEKERJAAN": result.data[data].PEKERJAAN,
                  "ASURANSI_JIWA": parseInt(result.data[data].ASURANSI_JIWA),
                  "ASURANSI_FIRE": parseInt(result.data[data].ASURANSI_FIRE),
                  "ASURANSI_KREDIT": parseInt(result.data[data].ASURANSI_KREDIT),
                  "DATE_TIME_CREATE": "2018-02-14T11:40:48.637Z"
                });

              }, {
                timeout: 50
              });
            } catch (e) {
              console.log(e); // Error: Transaction is rolled back due to timeout
              console.log(e.code); // TRANSACTION_TIMEOUT
            }

          };
        };
        callback(err);

      });
    }

    function loopdata(x) {
      getSoap(x.format('YYYYMMDD'), function (error) {
        x.add(1, 'days');
        console.log(x.diff(b, 'days'))
        if (x.diff(b, 'days') <= 0) {
          console.log("done");
          loopdata(x);
        } else if (x.diff(b, 'days') > 0) {
          console.log('sfinished')
          cb(error, "done");
        }



      });
    }

    loopdata(m);

  };

  Soapcustomer.remoteMethod(
    'getListBTNConsumerfromto', {
      accepts: [{
          arg: "req",
          type: "object",
          http: {
            source: "req"
          }
        },
        {
          arg: 'datefrom',
          type: 'string'
        }, {
          arg: 'dateto',
          type: 'string'
        }
      ],
      returns: {
        arg: 'status',
        type: 'string',
        root: true
      },
      http: {
        verb: 'post',
        path: '/getlistconsumerfromto'
      }
    });

};
