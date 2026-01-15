import React, { useState, useEffect, useRef } from "react";
import { pcParts } from "../data/pcParts";
import { checkCompatibility } from "../utils/compatibility";

function getSellPrice(price) {
  return Math.round(price * 1.15);
}

const categories = Object.keys(pcParts);

export default function BuildPC() {
  const [selectedParts, setSelectedParts] = useState({});
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);
  const prevTotal = useRef(0);

  const activeCategory = categories[activeIdx];
  const compatibilityIssues = checkCompatibility(selectedParts);

  const totalPrice = Object.values(selectedParts).reduce(
    (sum, part) => sum + getSellPrice(part.price),
    0
  );

  // Animate the total calculation
  useEffect(() => {
    let start = prevTotal.current;
    let end = totalPrice;
    let duration = 600;
    let startTime = null;
    if (start === end) return;
    function animateCount(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const value = Math.round(start + (end - start) * progress);
      setDisplayTotal(value);
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        prevTotal.current = end;
      }
    }
    requestAnimationFrame(animateCount);
    // eslint-disable-next-line
  }, [totalPrice]);

  const selectPart = (category, part) => {
    setSelectedParts((prev) => ({
      ...prev,
      [category]: part,
    }));
  };

  const goPrev = () => setActiveIdx((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIdx((i) => Math.min(categories.length - 1, i + 1));

  return (
    <div style={styles.page}>
      {/* Professional Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Build Your PC</h1>
        <p style={styles.headerSubtext}>Choose compatible parts. See pricing instantly.</p>
      </header>

      {/* Two-Column Layout */}
      <div style={styles.layout}>
        {/* Main Builder (70%) */}
        <main style={styles.builder}>
          {/* Professional Stepper */}
          <div style={styles.stepper}>
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setActiveIdx(idx)}
                style={{
                  ...styles.step,
                  ...(idx === activeIdx && styles.stepActive),
                  ...(selectedParts[cat] && styles.stepDone),
                }}
              >
                <span style={styles.stepNumber}>{idx + 1}</span>
                <span style={styles.stepLabel}>{cat}</span>
              </button>
            ))}
          </div>

          {/* Parts List */}
          <div style={styles.partsList}>
            <h2 style={styles.catTitle}>{activeCategory.toUpperCase()}</h2>
            <div style={styles.partsGrid}>
              {pcParts[activeCategory].map((part) => {
                const isSelected = selectedParts[activeCategory]?.id === part.id;
                return (
                  <div
                    key={part.id}
                    style={{
                      ...styles.partCard,
                      ...(isSelected && styles.partCardSelected),
                    }}
                  >
                    <div style={styles.partInfo}>
                      <div style={styles.partTitle}>{part.name}</div>
                      <div style={styles.partSpecs}>
                        {part.socket || part.speed || part.capacity || "Standard"}
                      </div>
                    </div>

                    <div style={styles.partActions}>
                      <div style={styles.price}>${getSellPrice(part.price)}</div>
                      <button
                        style={styles.selectBtn}
                        onClick={() => selectPart(activeCategory, part)}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Sticky Sidebar (30%) */}
        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Your Build</h3>

          {/* Summary Rows */}
          <div style={styles.summaryRows}>
            {Object.entries(selectedParts).map(([cat, part]) => (
              <div key={cat} style={styles.summaryRow}>
                <span style={styles.summaryLabel}>{cat}</span>
                <span style={styles.summaryValue}>${getSellPrice(part.price)}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={styles.total}>
            <span>Total</span>
            <strong>${displayTotal}</strong>
          </div>

          {/* Compatibility Status */}
          {compatibilityIssues.length === 0 ? (
            <div style={styles.compatOk}>
              ✓ All parts compatible
            </div>
          ) : (
            <div style={styles.compatError}>
              {compatibilityIssues.map((issue, i) => (
                <p key={i} style={styles.compatErrorText}>{issue}</p>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <button style={styles.primaryBtn}>
            Save Build & Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    padding: "40px 24px",
  },
  header: {
    maxWidth: "1200px",
    margin: "0 auto 48px",
    textAlign: "left",
  },
  headerTitle: {
    fontSize: "2.2rem",
    fontWeight: 700,
    margin: "0 0 8px 0",
    color: "#1f2937",
  },
  headerSubtext: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: 0,
  },
  layout: {
    display: "flex",
    gap: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  builder: {
    flex: "1",
    minWidth: 0,
  },
  sidebar: {
    position: "sticky",
    top: "24px",
    width: "320px",
    flexShrink: 0,
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
    height: "fit-content",
  },
  sidebarTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    margin: "0 0 16px 0",
    color: "#1f2937",
  },
  summaryRows: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e5e7eb",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
  },
  summaryLabel: {
    color: "#6b7280",
    fontWeight: 500,
  },
  summaryValue: {
    color: "#1f2937",
    fontWeight: 600,
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e5e7eb",
    color: "#1f2937",
  },
  compatOk: {
    background: "#ecfdf5",
    border: "1px solid #d1fae5",
    color: "#065f46",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "16px",
    fontWeight: 500,
  },
  compatError: {
    background: "#fef2f2",
    border: "1px solid #fee2e2",
    color: "#7f1d1d",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "16px",
  },
  compatErrorText: {
    margin: "4px 0",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px 16px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  stepper: {
    display: "flex",
    gap: "10px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  step: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: 500,
    color: "#6b7280",
  },
  stepNumber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#f3f4f6",
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  stepLabel: {
    textTransform: "capitalize",
  },
  stepActive: {
    borderColor: "#22c55e",
    background: "#ecfdf5",
    color: "#22c55e",
    fontWeight: 600,
  },
  stepDone: {
    background: "#22c55e",
    color: "#fff",
    borderColor: "#22c55e",
  },
  partsList: {
    marginTop: "0",
    background: "#fff",
  },
  catTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "18px",
    color: "#1f2937",
    textAlign: "left",
  },
  partsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  partCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderRadius: "10px",
    background: "#fff",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s",
  },
  partCardSelected: {
    borderColor: "#22c55e",
    background: "#f0fdf4",
  },
  partInfo: {
    flex: 1,
  },
  partTitle: {
    fontWeight: 600,
    color: "#1f2937",
    fontSize: "0.95rem",
  },
  partSpecs: {
    fontSize: "0.8rem",
    color: "#6b7280",
    marginTop: "4px",
  },
  partActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "6px",
    marginLeft: "16px",
  },
  price: {
    color: "#22c55e",
    fontWeight: 700,
    fontSize: "1rem",
  },
  selectBtn: {
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.85rem",
    transition: "background 0.2s",
  },
};

