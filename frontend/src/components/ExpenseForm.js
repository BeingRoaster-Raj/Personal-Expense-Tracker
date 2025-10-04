import React, { useState } from "react";

const API = "http://localhost:5000";

function ExpenseForm({ refresh }) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    category: "",
    note: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!form.date) {
      alert("Please select a date");
      return;
    }

    try {
      const res = await fetch(`${API}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to add expense");
        return;
      }

      setForm({ amount: "", date: "", category: "", note: "" }); // reset form
      refresh(); // reload expenses
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Error adding expense");
    }
  };

  return (
    <section style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="note"
          placeholder="Note"
          value={form.note}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add</button>
      </form>
    </section>
  );
}

export default ExpenseForm;
