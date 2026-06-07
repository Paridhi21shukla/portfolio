import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, Suspense, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Github, Linkedin, ArrowUpRight, Download } from "lucide-react";
import { SiHackerrank } from "react-icons/si";

/* ─────────────────────────────────────────
   PARTICLE FIELD (Three.js star background)
───────────────────────────────────────── */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const pos = new Float32Array(4000 * 3);
    for (let i = 0; i < 4000; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 4;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  });
  useFrame((_s, dt) => {
    if (ref.current) {
      ref.current.rotation.x -= dt / 14;
      ref.current.rotation.y -= dt / 18;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#9b87f5" size={0.045} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

/* ─────────────────────────────────────────
   ORBIT PARTICLE DOT
───────────────────────────────────────── */
function OrbitDot({ r, dur, sz, color, start }: { r: number; dur: number; sz: number; color: string; start: number }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: dur, ease: "linear" }}
      initial={{ rotate: start }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: sz, height: sz,
          top: -sz / 2, left: "50%", marginLeft: -sz / 2,
          background: color,
          boxShadow: `0 0 ${sz * 4}px ${sz}px ${color}55`,
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   TYPING CURSOR
───────────────────────────────────────── */
function Cursor() {
  return (
    <motion.span
      className="inline-block w-[3px] h-[1.1em] bg-secondary ml-1 align-middle rounded-sm"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
    />
  );
}

/* ─────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────── */
export function Hero() {
  const roles = [
    "Computer Engineering Student",
    "AI Enthusiast | Full Stack Developer",
    "Problem Solver",
  ];
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const target = roles[roleIdx];
    let timer: NodeJS.Timeout | undefined;
    if (typing) {
      if (displayed.length < target.length) {
        timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
      } else {
        timer = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setRoleIdx((p) => (p + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [displayed, typing, roleIdx]);

  // Magnetic hover for portrait
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(springX, [-60, 60], [8, -8]);
  const rotateX = useTransform(springY, [-60, 60], [-8, 8]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }, [mx, my]);
  const onMouseLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden">

      {/* ── Star field ── */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}><ParticleField /></Suspense>
        </Canvas>
      </div>

      {/* ── Ambient background halos ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[160px]" />
        <div className="absolute top-1/2 -translate-y-1/2 right-[-15%] w-[700px] h-[700px] rounded-full bg-secondary/7 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/6 blur-[120px]" />
      </div>

      {/* ══════════════════════════════════════
          MAIN CONTENT — 45 / 55 grid
      ══════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center min-h-screen pt-24 pb-16">

        {/* ════════════════════════
            LEFT — CONTENT
        ════════════════════════ */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 lg:pr-8">

          {/* Top status pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/25 bg-primary/8 backdrop-blur-md"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            />
            <span className="text-xs font-mono text-primary/90 tracking-wider">
              Building Intelligent Digital Solutions
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold tracking-[-0.03em] leading-[1.0] mb-2 text-white"
          >
            Paridhi
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-purple-400">
              Shukla.
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-9 flex items-center mb-6"
          >
            <span className="text-base sm:text-lg font-mono text-secondary/80">
              &gt;&nbsp;{displayed}<Cursor />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-[440px] mb-9"
          >
            Hi, I'm Paridhi Shukla. I build intelligent software solutions, explore AI technologies, and create impactful digital experiences through code, innovation, and continuous learning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-9"
          >
            {/* Primary */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold transition-all duration-300 hover:bg-primary/85 hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 border border-primary/70"
            >
              Explore Projects
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {/* Secondary */}
            <a
              href="/Paridhi_Shukla_Resume.docx"
              target="_blank"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 border border-white/12 backdrop-blur-sm"
            >
              <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              Download Resume
            </a>
            {/* Outline */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary/8 text-secondary text-sm font-medium transition-all duration-300 hover:bg-secondary/15 hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(6,182,212,0.25)] border border-secondary/35"
            >
              Let's Connect
            </a>
          </motion.div>

          {/* Social Links — glass pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex items-center gap-3"
          >
            {[
              { href: "https://github.com/Paridhi21shukla", label: "GitHub", icon: <Github className="w-4 h-4" />, glow: "hover:shadow-[0_0_16px_rgba(255,255,255,0.2)] hover:border-white/30 hover:text-white" },
              { href: "https://linkedin.com", label: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, glow: "hover:shadow-[0_0_16px_rgba(10,102,194,0.4)] hover:border-[#0A66C2]/40 hover:text-[#0A66C2]" },
              { href: "https://hackerrank.com", label: "HackerRank", icon: <SiHackerrank className="w-4 h-4" />, glow: "hover:shadow-[0_0_16px_rgba(0,234,100,0.4)] hover:border-[#00EA64]/40 hover:text-[#00EA64]" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-400 text-xs font-mono backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${s.glow}`}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </motion.div>

          {/* Divider + quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 pt-8 border-t border-white/6 flex items-center gap-8 flex-wrap justify-center lg:justify-start"
          >
            {[
              { value: "10+", label: "Projects Built" },
              { value: "3+", label: "Tech Domains" },
              { value: "Open", label: "To Opportunities" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center lg:items-start">
                <span className="text-xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-slate-500 font-mono mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ════════════════════════
            RIGHT — PORTRAIT
        ════════════════════════ */}
        <div className="flex items-center justify-center lg:justify-end order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative cursor-none"
          >
            {/* ── Deep nebula halo layers ── */}
            <div className="absolute inset-0 -m-20 rounded-full bg-gradient-radial from-primary/12 to-transparent blur-[70px] pointer-events-none" />
            <div className="absolute inset-0 -m-12 rounded-full bg-gradient-radial from-secondary/10 to-transparent blur-[50px] pointer-events-none" />
            <div className="absolute inset-0 -m-4 rounded-full bg-gradient-radial from-primary/8 to-transparent blur-[25px] pointer-events-none" />

            {/* ── Orbit rings (reduced by 20% size and dominance) ── */}
            <motion.div
              className="absolute rounded-full border border-primary/15 pointer-events-none"
              style={{ inset: -12, borderStyle: "dashed", borderDasharray: "4 8" } as any}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
            <motion.div
              className="absolute rounded-full border border-secondary/10 pointer-events-none"
              style={{ inset: -30, borderStyle: "dashed", borderDasharray: "3 12" } as any}
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
            />
            <motion.div
              className="absolute rounded-full border border-purple-500/5 pointer-events-none"
              style={{ inset: -50 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 48, ease: "linear" }}
            />

            {/* ── Orbit particles ── */}
            <OrbitDot r={210} dur={20} sz={6} color="#8B5CF6" start={0} />
            <OrbitDot r={210} dur={20} sz={4} color="#06B6D4" start={180} />
            <OrbitDot r={228} dur={32} sz={5} color="#06B6D4" start={60} />
            <OrbitDot r={228} dur={32} sz={3} color="#A78BFA" start={240} />
            <OrbitDot r={248} dur={48} sz={4} color="#8B5CF6" start={120} />
            <OrbitDot r={248} dur={48} sz={3} color="#38bdf8" start={300} />

            {/* ── Floating + magnetic wrapper ── */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative z-10"
            >
              {/* Portrait circle (increased size by 15-20%) */}
              <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] lg:w-[395px] lg:h-[395px] rounded-full">

                {/* Holographic border ring */}
                <div
                  className="absolute inset-0 rounded-full p-[3px]"
                  style={{
                    background: "conic-gradient(from 0deg, #8B5CF6, #06B6D4, #A78BFA, #8B5CF6, #06B6D4, #8B5CF6)",
                  }}
                >
                  {/* Inner glass ring */}
                  <div className="absolute inset-0 rounded-full bg-[#060d1f] overflow-hidden">
                    <img
                      src="/profile.png"
                      alt="Paridhi Shukla — AI & Full Stack Engineer"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: "center 12%",
                        transform: "scale(1.5)",
                        transformOrigin: "center 12%",
                      }}
                    />
                    {/* Subtle inner shadow vignette */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(5,8,22,0.5)]" />
                  </div>
                </div>

                {/* Outer glow */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: "0 0 35px rgba(139,92,246,0.3), 0 0 70px rgba(6,182,212,0.12), 0 0 120px rgba(139,92,246,0.06)",
                  }}
                />
              </div>

              {/* ── Floating info pills ── */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-12 top-[20%] flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0c1428]/85 border border-primary/25 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-20"
              >
                <span className="text-base">🤖</span>
                <div>
                  <p className="text-white text-[11px] font-semibold leading-tight">AI Enthusiast</p>
                  <p className="text-slate-400 text-[9px] font-mono">Machine Learning</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -left-14 bottom-[24%] flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0c1428]/85 border border-secondary/25 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-20"
              >
                <span className="text-base">⚡</span>
                <div>
                  <p className="text-white text-[11px] font-semibold leading-tight">Full Stack</p>
                  <p className="text-slate-400 text-[9px] font-mono">Web Development</p>
                </div>
              </motion.div>

              {/* ── Open to work badge ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b1020]/90 border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-20"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                />
                <span className="text-[11px] font-mono text-slate-300 tracking-wide">Open To Opportunities</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary/40 to-transparent relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-primary absolute"
            animate={{ top: ["-50%", "110%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          />
        </div>
        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">scroll</span>
      </motion.div>
    </section>
  );
}
