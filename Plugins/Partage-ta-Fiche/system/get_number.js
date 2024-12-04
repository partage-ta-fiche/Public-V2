const mysql = require("mysql");


const db = require("../../../System/db");

let usersql = "SELECT COUNT(*)user FROM user";

function getusernumber(callback) {
  db.query(usersql, (err, result) => {
    let formed = JSON.stringify(result);
    let reformed = JSON.parse(formed);
    callback(reformed[0].user);
  });
}

exports.getUserNumber = getusernumber;

function getfichenumber(callback) {
  let fichesql = "SELECT COUNT(*)fiche FROM fiche";

  db.query(fichesql, (err, result) => {
    let formed = JSON.stringify(result);
    let reformed = JSON.parse(formed);
    callback(reformed[0].fiche);
  });
}

exports.getFicheNumber = getfichenumber;
