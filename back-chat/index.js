import http from 'http';
import { Server } from 'socket.io';

const app = http.createServer();

const io = new Server(app, {
  cors: '*',
});

const middlewareUserName = (io) => {
  console.log('hey');
  io.use((socket, next) => {
    console.log('hetting');
    const username = socket?.handshake?.auth?.username;
    console.log(username);
    if (!username) return next(new Error("invalid username"));
    socket.username = username;
    next();
  });
};

const getAllUser = (data = []) => {
  const users = [];
  for (let [id, socket] of data) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  return [...users];
};

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  // create new session
  socket.sessionID = Math.round((Math.random() * 36 ** 12)).toString(36);
  socket.userID = Math.round((Math.random() * 36 ** 12)).toString(36);
  socket.username = username;
  next();
}).on('connection', (connect) => {
  console.log('connected');

  connect.emit("session", {
    sessionID: connect.sessionID,
    userID: connect.userID,
  });

  connect.emit("users", getAllUser(io.of('/')?.sockets));
  connect.broadcast.emit("user connected", {
    userID: connect.id,
    username: connect.username,
  });
  
  connect.on('disconnect', () => {
    console.log('user disconnected');
    connect.broadcast.emit('user disconnected', {
      userID: connect.id,
    });
  });

  // Send messages to room
  connect.on("private message", ({ message, to }) => {
    connect.to(to).emit("private message", {
      message,
      from: connect.id,
    });
  });
});

app.listen(3005);
