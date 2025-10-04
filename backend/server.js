const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Expense = require("./models/Expense");
require("dotenv").config(); // load .env variables

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expensesDB";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// ADD Expense
app.post("/expenses", async (req, res) => {
  try {
    const { amount, date, note, category } = req.body;
    if (!amount || !date)
      return res.status(400).json({ error: "Amount and date required" });

    const exp = new Expense({ amount, date, note, category });
    await exp.save();
    res.status(201).json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VIEW Expenses (with filters)
app.get("/expenses", async (req, res) => {
  const { start, end, category } = req.query;
  const filter = {};
  if (start || end) filter.date = {};
  if (start) filter.date.$gte = start;
  if (end) filter.date.$lte = end;
  if (category) filter.category = category;
  const data = await Expense.find(filter).sort({ date: -1 });
  res.json(data);
});

// UPDATE Expense
app.put("/expenses/:id", async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Expense
app.delete("/expenses/:id", async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SUMMARY
app.get("/summary", async (req, res) => {
  const total = await Expense.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const byCategory = await Expense.aggregate([
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
  ]);
  const byMonth = await Expense.aggregate([
    {
      $group: {
        _id: { $substr: ["$date", 0, 7] }, // YYYY-MM
        total: { $sum: "$amount" },
      },
    },
    { $sort: { _id: -1 } },
  ]);
  res.json({
    total: total[0]?.total || 0,
    byCategory,
    byMonth,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
