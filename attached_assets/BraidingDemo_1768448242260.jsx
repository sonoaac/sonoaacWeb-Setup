import React, { useState } from "react";

export default function BraidingDemo() {
  const [activeGallery, setActiveGallery] = useState(0);

  const gallery = [
    { src: "/braidinghair1.jpg", style: "Box Braids" },
    { src: "/braidinghair1.1.jpg", style: "Knotless Braids" },
    { src: "/braidinghairsalon.jpg", style: "Salon View" },
  ];

  const services = [
    { name: "Box Braids", price: "$85-$120", desc: "Classic & timeless", duration: "3-4 hrs" },
    { name: "Knotless", price: "$95-$150", desc: "Gentle & modern", duration: "4-5 hrs" },
    { name: "Fulani", price: "$75-$110", desc: "Bold & elegant", duration: "2-3 hrs" },
    { name: "Cornrows", price: "$50-$80", desc: "Quick & versatile", duration: "1-2 hrs" },
  ];

  return (
    <div style={styles.demo}>
      {/* Header */}
      <header style={styles.header}>
        <h3 style={styles.headerTitle}>Royal Touch Braids</h3>
        <button style={styles.headerBtn}>Book Now</button>
      </header>

      {/* Hero Image Gallery */}
      <section style={styles.gallery}>
        <img
          src={gallery[activeGallery].src}
          alt="Braiding styles"
          style={styles.galleryImage}
        />
        
        {/* Gallery Indicators */}
        <div style={styles.indicators}>
          {gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveGallery(i)}
              style={{
                ...styles.indicator,
                ...(activeGallery === i ? styles.indicatorActive : {}),
              }}
            />
          ))}
        </div>

        {/* Gallery Label */}
        <div style={styles.galleryLabel}>{gallery[activeGallery].style}</div>
      </section>

      {/* Services Grid */}
      <section style={styles.services}>
        <h3 style={styles.servicesTitle}>Our Services</h3>
        {services.map((service, i) => (
          <div key={i} style={styles.serviceCard}>
            <h4 style={styles.serviceName}>{service.name}</h4>
            <div style={styles.servicePrice}>{service.price}</div>
            <p style={styles.serviceDesc}>{service.desc}</p>
            <p style={styles.serviceDuration}>⏱️ {service.duration}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <button style={styles.ctaBtn}>Schedule Appointment</button>
        <p style={styles.ctaText}>Free consultation on first visit</p>
      </section>
    </div>
  );
}

const styles = {
  demo: {
    fontFamily: "'Poppins', sans-serif",
    background: "#fff",
    minHeight: "100%",
    paddingBottom: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderBottom: "1px solid #f0f0f0",
    background: "#f9f5ff",
  },
  headerTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 700,
    color: "#1a1a1a",
  },
  headerBtn: {
    padding: "6px 12px",
    background: "#7b2cbf",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
  gallery: {
    position: "relative",
    width: "100%",
    height: "240px",
    background: "#f0f0f0",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  indicators: {
    position: "absolute",
    bottom: "12px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "6px",
  },
  indicator: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.6)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  indicatorActive: {
    background: "#fff",
    width: "24px",
    borderRadius: "4px",
  },
  galleryLabel: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "#7b2cbf",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  },
  services: {
    padding: "16px",
  },
  servicesTitle: {
    margin: "0 0 12px 0",
    fontSize: "14px",
    fontWeight: 700,
    color: "#1a1a1a",
  },
  serviceCard: {
    padding: "12px",
    background: "#f6e9ff",
    borderRadius: "10px",
    marginBottom: "10px",
    border: "1px solid #e8d5ff",
  },
  serviceName: {
    margin: "0 0 4px 0",
    fontSize: "13px",
    fontWeight: 700,
    color: "#7b2cbf",
  },
  servicePrice: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: "2px",
  },
  serviceDesc: {
    margin: "2px 0",
    fontSize: "11px",
    color: "#666",
  },
  serviceDuration: {
    margin: "4px 0 0 0",
    fontSize: "11px",
    color: "#999",
  },
  cta: {
    padding: "16px",
    textAlign: "center",
  },
  ctaBtn: {
    width: "100%",
    padding: "12px",
    background: "#7b2cbf",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "8px",
  },
  ctaText: {
    margin: 0,
    fontSize: "12px",
    color: "#999",
  },
};
