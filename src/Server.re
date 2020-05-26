open Belt.Option;
open Externals;

let port = getWithDefault(portEnv, "2001");

let app = Express.express();

let http = Http.create(app);

Express.App.use(
  app,
  {
    let options = Express.Static.defaultOptions();
    Express.Static.make(Path.join([|__dirname, "../public"|]), options)
    |> Express.Static.asMiddleware;
  },
);

Express.App.get(app, ~path="/") @@
Express.Middleware.from((_, _, res) =>
  res |> Express.Response.sendFile("index.html", {"root": __dirname})
);

module Server = BsSocket.Server.Make(Messages);

let io = Server.createWithHttp(http);

let clients: ref(list(BsSocket.Server.socketT)) = ref([]);

Server.onConnect(
  io,
  socket => {
    open Server;
    print_endline("Client connected");
    clients := List.append(clients^, [socket]);

    Socket.on(socket, m =>
      switch (m) {
      | AddNewPlayer(name) =>
        clients^ |> List.iter(c => Socket.emit(c, ReceiveNewPlayer(name)))
      | ClearScores(num) =>
        clients^ |> List.iter(c => Socket.emit(c, ReceiveClearScores(num)))
      | ClearPlayers(num) =>
        clients^ |> List.iter(c => Socket.emit(c, ReceiveClearPlayers(num)))
      | UpdateRollScore(update) =>
        clients^
        |> List.iter(c => Socket.emit(c, ReceiveUpdatedRollScore(update)))
      }
    );
    Socket.onDisconnect(socket, _ => {print_endline("Client disconnected")});
  },
);

Http.listen(http, port |> int_of_string, () =>
  print_endline("Listening at port:" ++ port)
);
