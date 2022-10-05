//  http://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=a34df139e3277661f1e8309043f860da
const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceval = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "http://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=a34df139e3277661f1e8309043f860da"
    )
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrdata = [objdata];
        // console.log(arrdata[0].main.temp);
        const realval = arrdata
          .map((val) => replaceval(homeFile, val))
          .join(" ");
        console.log(realval);
        res.write(realval);
      })

      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);

        // console.log("end");
        // res.end("file not found");
        res.end();
      });
  }
});
server.listen(9000, "127.0.0.1");
