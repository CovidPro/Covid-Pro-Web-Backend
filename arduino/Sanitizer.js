const router = require("express").Router();

var arduinoPort = require("serialport");
var SerialPort = arduinoPort;
var tempPass = false; //true if hand sanitized and temperature acceptable
var tempFail = false; //true if hand sanitized and temperature not acceptable
var arduinoPort = new SerialPort("COM10", {baudRate: 9600},false);// open the port
var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline();                // make a new parser to read ASCII lines
arduinoPort.pipe(parser);                   // pipe the serial stream to the parser

// Definitions for the serial events:
arduinoPort.on('open', showPortOpen);    // called when the serial port opens
arduinoPort.on('close', showPortClose);  // called when the serial port closes
arduinoPort.on('error', showError);      // called when there's an error with the serial port
parser.on('data', readSerialData);       // called when there's new data incoming

// Functions called when the serial events occur:
function showPortOpen() {
  console.log('port open. Data rate: ' + arduinoPort.baudRate);
}

function readSerialData(data) {
  console.log(data);
 
  //temperature check passed and hands sanitized
  if(data.toString().trim() == "pass"){
    tempPass=true;
    console.log("passed to Node js tempPass : ",tempPass);
    console.log("passed to Node js tempFail : ",tempFail);

    // http://localhost:5000/sanitize/msg
    router.post("/msg", (req, res) => {
      try {
        res.json({ msg : tempPass,},);
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
    });


  }
  //temperature check passed and hands sanitized
  else if(data.toString().trim() == "fail"){
    tempFail=true;
    console.log("passed to Node js tempPass : ",tempPass);
    console.log("passed to Node js tempFail : ",tempFail);

    // http://localhost:5000/sanitize/msg
    router.post("/msg", (req, res) => {
      try {
        res.json({ msg : tempFail,},);
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  }
  else{
    tempPass=false;
    tempFail=false;

    // http://localhost:5000/sanitize/msg
    router.post("/msg", (req, res) => {
      try {
        res.json({ msg : "Error",},);
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  }
}

function showPortClose() {
  console.log('port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}

module.exports = router;

