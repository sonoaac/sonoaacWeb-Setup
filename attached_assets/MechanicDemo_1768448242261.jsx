import React, { useState } from "react";

export default function MechanicDemo() {
  const [activePage, setActivePage] = useState("home");

  const services = [
    { id: 1, name: "Brake Service", price: "$120-$250", icon: "🛑", desc: "Complete brake system" },
    { id: 2, name: "Engine Diagnostics", price: "$80", icon: "🔍", desc: "Computer scan" },
    { id: 3, name: "Oil Change", price: "$45-$85", icon: "🛢️", desc: "Full service" },
    { id: 4, name: "Suspension", price: "$200-$500", icon: "🚗", desc: "Shocks & struts" },
    { id: 5, name: "Battery Service", price: "$120-$200", icon: "🔋", desc: "Install & test" },
    { id: 6, name: "Alignment", price: "$100-$150", icon: "⚖️", desc: "4-wheel" },
  ];

  const testimonials = [
    { name: "John D.", text: "Best service in town!", rating: "⭐⭐⭐⭐⭐" },
    { name: "Maria G.", text: "Fair prices, honest work", rating: "⭐⭐⭐⭐⭐" },
  ];

  return (
    <div style={styles.demo}>
      {/* Header with Navigation */}
      <header style={styles.header}>
        <h3 style={styles.headerTitle}>Prime Auto</h3>
        <nav style={styles.nav}>
          <button
            onClick={() => setActivePage("home")}
            style={{
              ...styles.navBtn,
              ...(activePage === "home" ? styles.navBtnActive : {}),
            }}
          >
            Home
          </button>
          <button
            onClick={() => setActivePage("services")}
            style={{
              ...styles.navBtn,
              ...(activePage === "services" ? styles.navBtnActive : {}),
            }}
          >
            Services
          </button>
          <button
            onClick={() => setActivePage("contact")}
            style={{
              ...styles.navBtn,
              ...(activePage === "contact" ? styles.navBtnActive : {}),
            }}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* HOME PAGE */}
      {activePage === "home" && (
        <>
          {/* Hero Image */}
          <section style={styles.heroImage}>
            <img src="/autoservicing.jpg" alt="Auto service" style={styles.fullImage} />
            <div style={styles.heroOverlay}>
              <h2 style={styles.heroText}>Expert Auto Repair</h2>
            </div>
          </section>

          {/* Quick Services Grid */}
          <section style={styles.quickServices}>
            {services.slice(0, 3).map((svc) => (
              <button
                key={svc.id}
                onClick={() => setActivePage("services")}
                style={styles.quickSvcCard}
              >
                <div style={styles.qsIcon}>{svc.icon}</div>
                <div style={styles.qsName}>{svc.name}</div>
                <div style={styles.qsPrice}>{svc.price}</div>
              </button>
            ))}
          </section>

          {/* Testimonials */}
          <section style={styles.testimonials}>
            <h3 style={styles.sectionTitle}>Customer Reviews</h3>
            {testimonials.map((t, i) => (
              <div key={i} style={styles.testimonialCard}>
                <div style={styles.testimonialRating}>{t.rating}</div>
                <p style={styles.testimonialText}>"{t.text}"</p>
                <div style={styles.testimonialName}>— {t.name}</div>
              </div>
            ))}
          </section>

          {/* CTA */}
          <section style={styles.ctaSection}>
            <button
              onClick={() => setActivePage("contact")}
              style={styles.ctaBtn}
            >
              Book Appointment
            </button>
            <p style={styles.ctaSubtext}>Same-day service available</p>
          </section>
        </>
      )}

      {/* SERVICES PAGE */}
      {activePage === "services" && (
        <>
          <section style={styles.servicesPage}>
            <h2 style={styles.pageTitle}>Our Services</h2>
            <div style={styles.servicesGrid}>
              {services.map((svc) => (
                <div key={svc.id} style={styles.serviceDetailCard}>
                  <div style={styles.svcIcon}>{svc.icon}</div>
                  <h3 style={styles.svcTitle}>{svc.name}</h3>
                  <p style={styles.svcDesc}>{svc.desc}</p>
                  <div style={styles.svcPrice}>{svc.price}</div>
                  <button style={styles.selectSvcBtn}>Select</button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* CONTACT PAGE */}
      {activePage === "contact" && (
        <>
          <section style={styles.contactPage}>
            <h2 style={styles.pageTitle}>Contact Us</h2>
            
            <div style={styles.contactInfo}>
              <img src="/autoservicing1.jpg" alt="Shop" style={styles.contactImg} />
              
              <div style={styles.contactDetails}>
                <h3 style={styles.contactTitle}>Visit Us</h3>
                <p style={styles.contactText}>📍 123 Auto Street, City, ST 12345</p>
                <p style={styles.contactText}>📞 (555) 123-4567</p>
                <p style={styles.contactText}>⏰ Mon-Fri: 8am-6pm</p>
                <p style={styles.contactText}>Sat: 9am-4pm</p>
              </div>
            </div>

            <form style={styles.form}>
              <input
                type="text"
                placeholder="Your name"
                style={styles.input}
              />
              <input
                type="email"
                placeholder="Your email"
                style={styles.input}
              />
              <textarea
                placeholder="Message"
                style={{...styles.input, minHeight: "60px", resize: "none"}}
              />
              <button type="submit" style={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  );
}

const styles = {
  demo: {
    fontFamily: "'Inter', sans-serif",
    background: "#0a0a0a",
    color: "#f5f5f5",
    minHeight: "100%",
    paddingBottom: "20px",
  },
  header: {
    background: "#1a1a1a",
    padding: "12px 16px",
    borderBottom: "2px solid #e10600",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  headerTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 700,
    color: "#e10600",
    marginBottom: "10px",
  },
  nav: {
    display: "flex",
    gap: "8px",
  },
  navBtn: {
    padding: "6px 12px",
    background: "transparent",
    color: "#aaa",
    border: "1px solid #333",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  navBtnActive: {
    background: "#e10600",
    color: "#fff",
    borderColor: "#e10600",
  },
  heroImage: {
    position: "relative",
    width: "100%",
    height: "200px",
    overflow: "hidden",
  },
  fullImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.5)",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
  },
  quickServices: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "8px",
    padding: "16px",
  },
  quickSvcCard: {
    padding: "12px 8px",
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "8px",
    color: "#f5f5f5",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s",
  },
  qsIcon: {
    fontSize: "24px",
    marginBottom: "4px",
  },
  qsName: {
    fontSize: "11px",
    fontWeight: 600,
    marginBottom: "2px",
  },
  qsPrice: {
    fontSize: "10px",
    color: "#e10600",
    fontWeight: 700,
  },
  testimonials: {
    padding: "16px",
    borderTop: "1px solid #222",
  },
  sectionTitle: {
    margin: "0 0 12px 0",
    fontSize: "14px",
    fontWeight: 700,
    color: "#e10600",
  },
  testimonialCard: {
    padding: "12px",
    background: "#1a1a1a",
    borderLeft: "3px solid #e10600",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  testimonialRating: {
    fontSize: "12px",
    marginBottom: "4px",
  },
  testimonialText: {
    margin: "0 0 4px 0",
    fontSize: "12px",
    color: "#aaa",
    fontStyle: "italic",
  },
  testimonialName: {
    fontSize: "10px",
    color: "#666",
  },
  ctaSection: {
    padding: "16px",
    textAlign: "center",
    borderTop: "1px solid #222",
  },
  ctaBtn: {
    width: "100%",
    padding: "12px",
    background: "#e10600",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "8px",
  },
  ctaSubtext: {
    margin: 0,
    fontSize: "11px",
    color: "#666",
  },
  servicesPage: {
    padding: "16px",
  },
  pageTitle: {
    margin: "0 0 16px 0",
    fontSize: "18px",
    fontWeight: 700,
    color: "#e10600",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  serviceDetailCard: {
    padding: "12px",
    background: "#1a1a1a",
    borderRadius: "8px",
    border: "1px solid #333",
    textAlign: "center",
  },
  svcIcon: {
    fontSize: "32px",
    marginBottom: "8px",
  },
  svcTitle: {
    margin: "0 0 4px 0",
    fontSize: "12px",
    fontWeight: 700,
    color: "#e10600",
  },
  svcDesc: {
    margin: "0 0 4px 0",
    fontSize: "10px",
    color: "#aaa",
  },
  svcPrice: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#f5f5f5",
    marginBottom: "8px",
  },
  selectSvcBtn: {
    width: "100%",
    padding: "6px",
    background: "#e10600",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: 600,
    cursor: "pointer",
  },
  contactPage: {
    padding: "16px",
  },
  contactImg: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  contactInfo: {},
  contactDetails: {
    padding: "12px 0",
    marginBottom: "16px",
    borderBottom: "1px solid #222",
  },
  contactTitle: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    fontWeight: 700,
    color: "#e10600",
  },
  contactText: {
    margin: "4px 0",
    fontSize: "12px",
    color: "#aaa",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    background: "#1a1a1a",
    color: "#f5f5f5",
    border: "1px solid #333",
    borderRadius: "6px",
    fontSize: "12px",
    fontFamily: "'Inter', sans-serif",
  },
  submitBtn: {
    padding: "10px",
    background: "#e10600",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "12px",
    cursor: "pointer",
  },
};
