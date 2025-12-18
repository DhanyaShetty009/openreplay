const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Frontend connected!");

  socket.on("action", (data) => {
    io.emit("perform-action", data); // forward to all
  });

  socket.on("chat-message", (userMessage) => {
    console.log("User asked:", userMessage);

    // Simple AI response logic — you can replace with actual AI/API call
    let response = "";
    
    if (userMessage.toLowerCase().includes("html")) {
      response = `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It uses tags like <div>, <p>, <h1>, etc.`;
    } else if (userMessage.toLowerCase().includes("javascript")) {
      response = `JavaScript is a programming language that runs in browsers and powers interactivity on web pages.`;
    } else if (userMessage.toLowerCase().includes("css")) {
      response = `CSS (Cascading Style Sheets) is used to style and layout web pages — controlling colors, fonts, spacing, and more.`;
    } else if (userMessage.toLowerCase().includes("python")) {
      response = `Python is a high-level programming language known for its simplicity and is widely used in data science, automation, and web development.`;
    } else {
      response = `You asked: "${userMessage}"\n\nI'm a simple chatbot. Ask me about HTML, JavaScript, CSS, or Python!`;
    }

    // Send response back to the client
    socket.emit("chat-response", response);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
