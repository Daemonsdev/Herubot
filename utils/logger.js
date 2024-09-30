const gradient = require("gradient-string");

const rainbow = gradient([
  { color: "red", pos: 0 },
  { color: "orange", pos: 0.17 },
  { color: "yellow", pos: 0.33 },
  { color: "green", pos: 0.5 },
  { color: "blue", pos: 0.67 },
  { color: "indigo", pos: 0.83 },
  { color: "violet", pos: 1 }
]);

module.exports.logger = (text) => {
  process.stderr.write(rainbow(`[ HERUDEV ] - ` + text + "\n"));
};

module.exports.warn = (text) => {
  process.stderr.write(rainbow(`[ WARN ] - ` + text + "\n"));
};

module.exports.message = (text) => {
  process.stderr.write(rainbow(text + "\n"));
};

module.exports.logs = (text) => {
  process.stderr.write(rainbow(text));
};