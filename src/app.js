import express from "express";
import bookingRoutes from "./modules/booking/booking.route.js";

const app = express();

app.use(express.json());

// API Routes
app.use("/api", bookingRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Ticket Booking System API Running");
});

export default app;