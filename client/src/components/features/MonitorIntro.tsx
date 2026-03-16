import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Phase = "enter" | "expand" | "logo" | "scan" | "zoom" | "out";

export default function MonitorIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    const schedule: [Phase, number][] = [
      ["expand", 380],   // CRT warm-up: screen expands from a thin line
      ["logo",   820],   // logo + name fade in
      ["scan",   1280],  // bright scan line sweeps top → bottom
      ["zoom",   1680],  // monitor rockets toward viewer
      ["out",    2480],  // overlay fades to nothing
    ];
    const timers = schedule.map(([p, ms]) => setTimeout(() => setPhase(p), ms));
    const done = setTimeout(() => onComplete(), 2950);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onComplete]);

  const screenOn  = phase !== "enter";
  const logoOn    = phase === "logo" || phase === "scan";
  const zooming   = phase === "zoom" || phase === "out";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      {/* ── Monitor — drops in, then zooms ── */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ y: -32, scale: 0.88, opacity: 0 }}
        animate={{
          y: 0,
          scale: zooming ? 22 : 1,
          opacity: 1,
        }}
        transition={
          zooming
            ? { duration: 1.05, ease: [0.55, 0, 1, 0.45] }
            : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
        style={{ transformOrigin: "center center" }}
      >

        {/* ── Bezels ── */}
        <div
          style={{
            width:  "min(520px, 84vw)",
            height: "min(320px, 52vw)",
            background: "linear-gradient(160deg, #1d1d1f 0%, #0a0a0c 100%)",
            borderRadius: 10,
            padding: 13,
            position: "relative",
            boxShadow:
              "0 0 0 1px #2c2c2e, " +
              "0 36px 100px rgba(0,0,0,0.97), " +
              "inset 0 1px 0 rgba(255,255,255,0.04), " +
              "inset 0 -1px 0 rgba(0,0,0,0.6)",
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
              background: "#18181a",
              border: "1px solid #2e2e32",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
            }}
          />

          {/* ── Screen ── */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#030508",
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* CRT warm-up: reveals from horizontal center line outward */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                /* subtle green phosphor glow on the screen bg */
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 50%, #081508 0%, #030508 100%)",
              }}
              initial={{ clipPath: "inset(49.8% 0 49.8% 0)" }}
              animate={{
                clipPath: screenOn
                  ? "inset(0% 0 0% 0)"
                  : "inset(49.8% 0 49.8% 0)",
              }}
              transition={{ duration: 0.48, ease: [0.2, 0, 0, 1] }}
            >
              {/* Phosphor edge glow — fades after expand */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(74,222,128,0.06) 0%, transparent 25%, transparent 75%, rgba(74,222,128,0.06) 100%)",
                  pointerEvents: "none",
                }}
                animate={{ opacity: logoOn || zooming ? 0 : 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Scan line — sweeps once from top to bottom */}
              {phase === "scan" && (
                <motion.div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 2,
                    top: "0%",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(134,239,172,0.4) 15%, #86efac 40%, #ffffff 50%, #86efac 60%, rgba(134,239,172,0.4) 85%, transparent 100%)",
                    boxShadow:
                      "0 0 8px #4ade80, 0 0 20px rgba(74,222,128,0.35)",
                  }}
                  animate={{ top: "102%" }}
                  transition={{ duration: 0.26, ease: "linear" }}
                />
              )}

              {/* Logo — fades in, fades out before zoom */}
              <motion.div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  position: "relative",
                  zIndex: 1,
                }}
                animate={{ opacity: logoOn ? 1 : 0 }}
                transition={{ duration: 0.35 }}
              >
                <img
                  src="/images/sonoaaclogos.png"
                  alt="Sonoaac"
                  style={{
                    height: "clamp(28px, 4vw, 48px)",
                    width: "auto",
                    filter:
                      "brightness(1.1) drop-shadow(0 0 10px rgba(74,222,128,0.28))",
                  }}
                />
                <span
                  style={{
                    color: "#4ade80",
                    fontWeight: 800,
                    fontSize: "clamp(7px, 0.95vw, 10px)",
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    fontFamily: "'Times New Roman', Times, Georgia, serif",
                    textShadow: "0 0 14px rgba(74,222,128,0.45)",
                  }}
                >
                  Sonoaac
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Stand — desktop only ── */}
        <div className="hidden sm:block">
          {/* Neck */}
          <div
            style={{
              width: 128,
              height: 86,
              margin: "0 auto",
              background:
                "linear-gradient(180deg, #B5B6B8 0%, #D5D6D8 43%, #D8D9DB 62%, #D7D7D7 80%, #CBCCCE 92%, #D6D7D9 94%, #EEEFF1 95.5%, #BABBBD 98.4%, #606163 99.4%, #696A6C 100%)",
            }}
          />
          {/* Foot */}
          <div
            style={{
              width: 182,
              height: 6,
              margin: "0 auto",
              position: "relative",
              background:
                "linear-gradient(90deg, #EFEFEF 0%, #B4B5B7 1%, #98999B 2%, #D2D3D5 9%, #DBDCDE 50%, #D2D3D5 91%, #98999B 98%, #EFEFEF 100%)",
            }}
          >
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
