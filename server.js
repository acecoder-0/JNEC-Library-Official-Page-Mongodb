import express from "express";
import cors from "cors";
import path from "path";
import connectMongo from "./config/mongo.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import marqueeRoutes from "./routes/marqueeRoutes.js";
import librarianRoutes from "./routes/librarianRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import paperRoutes from "./routes/paperRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import committeeRoutes from "./routes/committeeRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectMongo(); // 👈 MongoDB connect

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/feedback", feedbackRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/marquee", marqueeRoutes);
app.use("/api/librarian", librarianRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/papers", paperRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/committee", committeeRoutes);
app.use("/api/staff", staffRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
