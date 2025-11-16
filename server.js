const http = require("http");
const net = require("net");
const url = require("url");

const SSH_HOST = "127.0.0.1";
const SSH_PORT = 22;

const server = http.createServer();

server.on("connect", (req, clientSocket, head) => {
  const { port, hostname } = url.parse(`http://${req.url}`);

  const serverSocket = net.connect(SSH_PORT, SSH_HOST, () => {
    clientSocket.write(
      "HTTP/1.1 200 Connection Established\r\n\r\n"
    );
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });

  serverSocket.on("error", () => {
    clientSocket.end("HTTP/1.1 500 Connection Error\r\n");
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log("WebSocket SSH running");
});
