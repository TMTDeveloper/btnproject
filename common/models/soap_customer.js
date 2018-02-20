'use strict';

module.exports = function (Soapcustomer) {
  var app = require('../../server/server');
  Soapcustomer.getListBTNConsumer = function (cb, datetoday) {
    var date = datetoday //tanggal yyyymmdd
    Soapcustomer.GetListBTNConsumer({
      Data: 'SP3K',
      Tanggal: date, //"20160107",
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
          console.log(inst);
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

      cb(err, result);
    });
  };

  Soapcustomer.remoteMethod(
    'getListBTNConsumer', {
      accepts: {
        arg: 'datetoday',
        type: 'string'
      },
      returns: {
        arg: 'result',
        type: 'string',
        root: true
      },
      http: {
        verb: 'post',
        path: '/getlistconsumer'
      }
    });

};
