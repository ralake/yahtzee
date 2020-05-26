'use strict';

var List = require("bs-platform/lib/js/list.js");
var Http = require("http");
var Path = require("path");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Express = require("bs-express/src/Express.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Server$BsSocket = require("bs-socket/src/Server.bs.js");
var Messages$Yahtzee = require("./Messages.bs.js");

var port = Belt_Option.getWithDefault(process.env.PORT, "2001");

var app = Express.express(undefined);

var http = Http.Server(app);

var options = Express.Static.defaultOptions(undefined);

Express.App.use(app, Express.Static.asMiddleware(Express.Static.make(Path.join(__dirname, "../public"), options)));

Express.App.get(app, "/", Express.Middleware.from((function (param, param$1, res) {
            return Express.$$Response.sendFile("index.html", {
                        root: __dirname
                      }, res);
          })));

var Server = Server$BsSocket.Make(Messages$Yahtzee);

var io = Curry._1(Server.createWithHttp, http);

var clients = {
  contents: /* [] */0
};

Curry._2(Server.onConnect, io, (function (socket) {
        console.log("Client connected");
        clients.contents = List.append(clients.contents, /* :: */[
              socket,
              /* [] */0
            ]);
        Curry._2(Server.Socket.on, socket, (function (m) {
                switch (m.tag | 0) {
                  case /* AddNewPlayer */0 :
                      var name = m[0];
                      return List.iter((function (c) {
                                    return Curry._2(Server.Socket.emit, c, /* ReceiveNewPlayer */Block.__(0, [name]));
                                  }), clients.contents);
                  case /* ClearScores */1 :
                      var num = m[0];
                      return List.iter((function (c) {
                                    return Curry._2(Server.Socket.emit, c, /* ReceiveClearScores */Block.__(1, [num]));
                                  }), clients.contents);
                  case /* ClearPlayers */2 :
                      var num$1 = m[0];
                      return List.iter((function (c) {
                                    return Curry._2(Server.Socket.emit, c, /* ReceiveClearPlayers */Block.__(2, [num$1]));
                                  }), clients.contents);
                  case /* UpdateRollScore */3 :
                      var update = m[0];
                      return List.iter((function (c) {
                                    return Curry._2(Server.Socket.emit, c, /* ReceiveUpdatedRollScore */Block.__(3, [update]));
                                  }), clients.contents);
                  
                }
              }));
        return Curry._2(Server.Socket.onDisconnect, socket, (function (param) {
                      console.log("Client disconnected");
                      
                    }));
      }));

http.listen(Caml_format.caml_int_of_string(port), (function (param) {
        console.log("Listening at port:" + port);
        
      }));

exports.port = port;
exports.app = app;
exports.http = http;
exports.Server = Server;
exports.io = io;
exports.clients = clients;
/* port Not a pure module */
