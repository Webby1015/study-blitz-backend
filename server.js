const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors"); // Add this line

const app = express();
const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const notesRouter = require("./routes/notesRoutes");
const discussionsRouter = require("./routes/discussions");
const commentsRouter = require("./routes/comments");
const firebaseAuth = require("./routes/firebaseAuth");
const connectDb = require("./config/dbconnect");

// console.log(process.env.FIREBASE_apiKey)

connectDb();
app.use(express.json());
app.use(cors()); // Add this line
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRouter);
app.use("/api/discussions", discussionsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/firebase/auth", firebaseAuth);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Study-Blitz Api Works" });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
