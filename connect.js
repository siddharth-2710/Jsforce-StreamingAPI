//https://youtu.be/v1KEcxDzJm8
var express = require("express");
var app = express();
var path = require("path");

var jsforce = require("jsforce");

let options = {
  loginUrl: "https://login.salesforce.com/",
  authServiceUrl: "https://login.salesforce.com/services/oauth2/authorize",
  tokenServiceUrl: "https://login.salesforce.com/services/oauth2/token",
  clientId:
    "3MVG9pRzvMkjMb6lxjRGpcMa78S2bNxM4MxjknujMVtmIt8eGaUUYmRSz53Nyrxkx9s6myXCrOMj4vRuSLP2q",
  clientSecret:
    "A8E1CC774554E5A15F2F8A01DBAFC8113C0A6628558E7A762019731DD860E12D",
  redirectUri: "https://login.salesforce.com",
  apiVersion: "v56.0",
  environment: "production",
  mode: "multi",
  plugins: ["tooling"],
};

var oauth = new jsforce.OAuth2(options);
var port = process.env.PORT || 9000;

let userNameLet = "siddharthshekhawat880@gmail.com",
  passwordLet = "newaccount2710gRwnw4tJ9FWT4CQSvjDsd8OD";

var connect_options;

oauth.authenticate(userNameLet, passwordLet, function (error, response) {
  if (error) {
    console.log("Error", error);
    return;
  } else {
    let conn_options = {
      oauth2: oauth,
      logLevel: "DEBUG",
      instanceUrl: response.instance_url,
      accessToken: response.access_token,
    };
    connect_options = conn_options;
    console.log(" response.instance_url ", response.instance_url);
    console.log(" response.access_token ", response.access_token);
    var conn = new jsforce.Connection(connect_options);
    conn.streaming
      .topic("/data/Address_Book__ChangeEvent")
      .subscribe(function (message) {
        console.log(" Address_Book__ChangeEvent ", message);
      });
    conn.streaming
      .topic("/data/Coupon__ChangeEvent")
      .subscribe(function (message) {
        console.log(" Coupon__ChangeEvent ", message);
      });
    conn.streaming
      .topic("/data/AccountChangeEvent")
      .subscribe(function (message) {
        console.log(" AccountChangeEvent ", message);
      });
  }
});

app.listen(port);
console.log(port + " is the magic port");
