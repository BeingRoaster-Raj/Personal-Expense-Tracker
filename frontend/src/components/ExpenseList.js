import React, { useState } from "react";

const API = "http://localhost:5000";

function ExpenseList({ expenses, refresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    date: "",
    category: "",
    note: "",
  });

  // Start editing a row
  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setEditForm({
      amount: exp.amount,
      date: exp.date,
      category: exp.category || "",
      note: exp.note || "",
    });
  };

  // Handle field change
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save updated expense
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
      refresh();
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ amount: "", date: "", category: "", note: "" });
  };

  // Delete expense
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      const res = await fetch(`${API}/expenses/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Delete failed");
        return;
      }
      refresh();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <section style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
      <h2>Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <table
          width="100%"
          border="1"
          cellPadding="5"
          style={{ borderCollapse: "collapse" }}
        >
          <thead style={{ backgroundColor: "#eee" }}>
            <tr>
              <th>#</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Category</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, i) => (
              <tr key={exp._id}>
                <td>{i + 1}</td>

                {/* Amount */}
                <td>
                  {editingId === exp._id ? (
                    <input
                      type="number"
                      name="amount"
                      value={editForm.amount}
                      onChange={handleChange}
                    />
                  ) : (
                    exp.amount
                  )}
                </td>

                {/* Date */}
                <td>
                  {editingId === exp._id ? (
                    <input
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleChange}
                    />
                  ) : (
                    exp.date
                  )}
                </td>

                {/* Category */}
                <td>
                  {editingId === exp._id ? (
                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleChange}
                    />
                  ) : (
                    exp.category || "—"
                  )}
                </td>

                {/* Note */}
                <td>
                  {editingId === exp._id ? (
                    <input
                      type="text"
                      name="note"
                      value={editForm.note}
                      onChange={handleChange}
                    />
                  ) : (
                    exp.note || "—"
                  )}
                </td>

                {/* Actions */}
                <td>
                  {editingId === exp._id ? (
                    <>
                      <button
                        onClick={() => handleSave(exp._id)}
                        style={{ marginRight: "5px", background: "green", color: "white" }}
                      >
                        Save
                      </button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(exp)}
                        style={{ marginRight: "5px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
                        style={{ background: "red", color: "white" }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ExpenseList;
