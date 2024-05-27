const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const notesRouter = require("./routes/notesRoutes");
const discussionsRouter = require("./routes/discussions");
const commentsRouter = require("./routes/comments");
const firebaseAuth = require("./routes/firebaseAuth");
const firebaseNotes = require("./routes/firebaseNotes");
const firebaseDiscussions = require("./routes/firebaseDiscussions");
const firebaseCourses = require("./routes/firebaseCourses");
const connectDb = require("./config/dbconnect");

connectDb();
app.use(express.json());
app.use(cors()); 
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRouter);
app.use("/api/discussions", discussionsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/firebase/auth", firebaseAuth);
app.use("/api/firebase/notes", firebaseNotes);
app.use("/api/firebase/discussions", firebaseDiscussions);
// app.use("/api/firebase/notes", firebaseCourses);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Study-Blitz Api Works" });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
