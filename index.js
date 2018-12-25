var app = require("express")();
var http = require("http").Server(app);

app.get('/', (req, res) => {
  return res.send('<h1>Hello Wordl</h1>');
});


http.listen(3000, () => console.log("Listening on 3000"));