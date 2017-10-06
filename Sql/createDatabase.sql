DROP DATABASE IF EXISTS attilios_db;

CREATE DATABASE attilios_db;

USE attilios_db;

CREATE table records(
  record_id INTEGER(10) AUTO_INCREMENT,
  LTR Integer(2),
  OSAT Integer(2),
  comment VARCHAR(250),
  phone Integer(10),
  email VARCHAR(30),
  PRIMARY KEY (record_id)
);
