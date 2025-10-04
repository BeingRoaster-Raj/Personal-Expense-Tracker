import React, { useState } from "react";

function ExpenseFilter({ applyFilter }) {
  const [filters, setFilters] = useState({
    start: "",
    end: "",
    category: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilter(filters);
  };

  const handleReset = () => {
    setFilters({ start: "", end: "", category: "" });
    applyFilter({}); // clear filters
  };

  return (
    <section
      style={{
        background: "#e0e5ec",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>Filter Expenses</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="start"
          value={filters.start}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="date"
          name="end"
          value={filters.end}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <button type="submit" style={{ marginRight: "10px" }}>
          Apply
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </section>
  );
}

export default ExpenseFilter;
