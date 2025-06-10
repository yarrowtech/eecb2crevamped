const express = require('express');
const http = require('http'); // Add this
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const socketIo = require('socket.io'); // Add this

const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require("./routes/quiz");
const surveyRoutes = require("./routes/survey");
const paymentRoutes = require("./routes/payment");


// Initialize Express app
dotenv.config();
const app = express();
const server = http.createServer(app); // Wrap express in http server
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow frontend
    methods: ["GET", "POST"]
  }
});
app.use(bodyParser.json());
app.use(cors());



app.use(express.static("C:\Users\Backend Developer\eecb2crevamped\frontend"));
console.log("Serving static files from:", path.join(__dirname, "frontend"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Connect to MongoDB
mongoose.connect('mongodb+srv://supriyonag552:ahy7BxxpZHAtslK7@cluster0.ldoppfe.mongodb.net/free-session-booking?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes
app.use('/api', bookingRoutes);
app.use('/api', userRoutes);
app.use("/api", quizRoutes);
app.use("/api", surveyRoutes);
app.use("/api", paymentRoutes);


// Socket.IO logic
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    io.emit("receiveMessage", data); // broadcast to all users
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
