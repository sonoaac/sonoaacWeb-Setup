import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MonitorIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"in" | "zoom" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("zoom"), 1400);
    const t2 = setTimeout(() => setPhase("out"), 2200);
    const t3 = setTimeout(() => onComplete(), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#000" }}
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Monitor wrapper — zooms to fill viewport */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ scale: phase === "zoom" || phase === "out" ? 22 : 1 }}
        transition={{
          duration: 1.0,
          ease: [0.4, 0, 1, 1],
        }}
        style={{ transformOrigin: "center center" }}
      >
        {/* ── Bezels ── */}
        <div
          style={{
            width: "min(500px, 82vw)",
            height: "min(308px, 50vw)",
            background: "linear-gradient(160deg, #1e1e1f 0%, #0c0c0c 100%)",
            borderRadius: 9,
            padding: 13,
            boxShadow:
              "0 0 0 1px #2c2c2e, 0 30px 90px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.04)",
            position: "relative",
          }}
        >
          {/* Camera dot */}
          <div
            style={{
              position: "absolute",
              top: 5,
              left: "50%",
              transform: "translateX(-50%)",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#1a1a1c",
              border: "1px solid #2e2e30",
              boxShadow: "inset 0 0 2px rgba(0,0,0,0.8)",
            }}
          />

          {/* Screen */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#020204",
              borderRadius: 4,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Logo content — fades out before zoom */}
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
              animate={{
                opacity: phase === "zoom" || phase === "out" ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/images/sonoaaclogos.png"
                alt="Sonoaac"
                style={{
                  height: "clamp(30px, 4.5vw, 50px)",
                  width: "auto",
                  filter: "brightness(1.1)",
                }}
              />
              <span
                style={{
                  color: "#4ade80",
                  fontWeight: 800,
                  fontSize: "clamp(8px, 1.1vw, 11px)",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  fontFamily: "'Times New Roman', Times, Georgia, serif",
                }}
              >
                Sonoaac
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── Stand — desktop only ── */}
        <div
          className="hidden sm:block"
          style={{ width: "min(500px, 82vw)", position: "relative" }}
        >
          {/* Stand neck */}
          <div
            style={{
              width: 130,
              height: 88,
              margin: "0 auto",
              background:
                "linear-gradient(180deg, #B5B6B8 0%, #D5D6D8 43%, #D8D9DB 62%, #D7D7D7 80%, #CBCCCE 92%, #D6D7D9 94%, #EEEFF1 95.5%, #E7E9ED 97%, #BABBBD 98.4%, #606163 99.4%, #696A6C 100%)",
            }}
          />
          {/* Stand foot */}
          <div
            style={{
              width: 185,
              height: 6,
              margin: "0 auto",
              background:
                "linear-gradient(90deg, #EFEFEF 0%, #B4B5B7 1%, #98999B 2%, #B3B4B6 2.3%, #E5E5E5 3%, #D2D3D5 9%, #DBDCDE 30%, #DBDCDE 70%, #D2D3D5 91%, #E5E5E5 93%, #B3B4B6 98%, #98999B 98.8%, #B4B5B7 99.4%, #EFEFEF 100%)",
              position: "relative",
            }}
          >
            {/* Corner feet markers */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 4,
                width: 14,
                height: 1,
                background: "#000",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 4,
                width: 14,
                height: 1,
                background: "#000",
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
