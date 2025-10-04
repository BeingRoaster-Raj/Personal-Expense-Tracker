import React, { useEffect, useState } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import Summary from "./components/Summary";
import "./index.css"; // ✅ Import global styles

const API = "http://localhost:5000";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ amount: "", date: "", category: "", note: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", date: "", category: "", note: "" });

  // Load expenses
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async (filters = {}) => {
    try {
      let query = [];
      if (filters.start) query.push(`start=${filters.start}`);
      if (filters.end) query.push(`end=${filters.end}`);
      if (filters.category) query.push(`category=${filters.category}`);
      const qs = query.length ? `?${query.join("&")}` : "";

      const res = await fetch(`${API}/expenses${qs}`);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) {
      alert("Please fill in amount and date!");
      return;
    }

    try {
      const res = await fetch(`${API}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to add expense");
        return;
      }

      setForm({ amount: "", date: "", category: "", note: "" });
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await fetch(`${API}/expenses/${id}`, { method: "DELETE" });
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setEditForm({
      amount: exp.amount,
      date: exp.date,
      category: exp.category || "",
      note: exp.note || "",
    });
  };

  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSave = async (id) => {
    try {
      const res = await fetch(`${API}/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Update failed");
        return;
      }

      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ amount: "", date: "", category: "", note: "" });
  };

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <div style={{ maxWidth: "950px", margin: "20px auto", textAlign: "center" }}>
      {/* HEADER */}
      <header>
        <h1>Personal Expense Tracker</h1>
      </header>

      {/* ADD EXPENSE */}
      <section className="neu-box">
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <input type="text" name="note" placeholder="Note" value={form.note} onChange={handleChange} />
          <button type="submit">Add</button>
        </form>
      </section>

      {/* FILTER */}
      <section className="neu-box">
        <ExpenseFilter applyFilter={fetchExpenses} />
      </section>

      {/* SUMMARY */}
      <section className="neu-box">
        <Summary refreshTrigger={expenses.length} />
      </section>

      {/* EXPENSE TABLE */}
      <section className="neu-box">
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No expenses yet.</td>
              </tr>
            ) : (
              expenses.map((exp, i) => (
                <tr key={exp._id}>
                  <td>{i + 1}</td>
                  <td>
                    {editingId === exp._id ? (
                      <input type="number" name="amount" value={editForm.amount} onChange={handleEditChange} />
                    ) : (
                      `₹${exp.amount}`
                    )}
                  </td>
                  <td>
                    {editingId === exp._id ? (
                      <input type="date" name="date" value={editForm.date} onChange={handleEditChange} />
                    ) : (
                      exp.date
                    )}
                  </td>
                  <td>
                    {editingId === exp._id ? (
                      <input type="text" name="category" value={editForm.category} onChange={handleEditChange} />
                    ) : (
                      exp.category || "—"
                    )}
                  </td>
                  <td>
                    {editingId === exp._id ? (
                      <input type="text" name="note" value={editForm.note} onChange={handleEditChange} />
                    ) : (
                      exp.note || "—"
                    )}
                  </td>
                  <td>
                    {editingId === exp._id ? (
                      <>
                        <button onClick={() => handleSave(exp._id)} style={{ background: "green", color: "white" }}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(exp)}>Edit</button>
                        <button onClick={() => handleDelete(exp._id)} style={{ background: "red", color: "white" }}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: "40px", fontSize: "14px", color: "#666" }}>
            <p>&copy; 2025 Raj Anand. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
