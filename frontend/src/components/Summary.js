import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const API = "http://localhost:5000";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7", "#EC4899"];

function Summary({ refreshTrigger }) {
  const [summary, setSummary] = useState({
    total: 0,
    byCategory: [],
    byMonth: [],
  });

  // Fetch summary data from backend
  const fetchSummary = async () => {
    try {
      const res = await fetch(`${API}/summary`);
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [refreshTrigger]); // refetch when expenses change

  return (
    <section
      style={{
        background: "#e0e5ec",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>Summary</h2>
      <p>
        <strong>Total Spent:</strong> ₹{summary.total}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* PIE CHART - BY CATEGORY */}
        <div style={{ flex: "1 1 300px", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>By Category</h3>
          {summary.byCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={summary.byCategory}
                  dataKey="total"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {summary.byCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center" }}>No data yet.</p>
          )}
        </div>

        {/* BAR CHART - BY MONTH */}
        <div style={{ flex: "1 1 400px", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>By Month</h3>
          {summary.byMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.byMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center" }}>No data yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Summary;
