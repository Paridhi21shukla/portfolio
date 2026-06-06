import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, Suspense, useEffect } from "react";
import * as THREE from "three";
import { Github, Linkedin } from "lucide-react";
import { SiHackerrank } from "react-icons/si";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = 10 * Math.sin(phi) * Math.cos(theta);
      const y = 10 * Math.sin(phi) * Math.sin(theta);
      const z = 10 * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8B5CF6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/* Small orbit particle dot */
function OrbitParticle({ radius, duration, size, color, startAngle }: {
  radius: number; duration: number; size: number; color: string; startAngle: number;
}) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      initial={{ rotate: startAngle }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          top: -size / 2,
          left: "50%",
          marginLeft: -size / 2,
          background: color,
          boxShadow: `0 0 ${size * 3}px ${color}`,
        }}
      />
    </motion.div>
  );
}

export function Hero() {
  const roles = [
    "Computer Engineering Student",
    "Full Stack Developer",
    "AI & Software Enthusiast",
    "Problem Solver | Developer",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* ── Three.js Particle Background ── */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Static ambient glows ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 left-[-10%] w-[520px] h-[520px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute top-[30%] right-[-5%] w-[520px] h-[520px] rounded-full bg-secondary/8 blur-[140px]" />
        <div className="absolute top-[55%] right-[20%] w-[300px] h-[300px] rounded-full bg-primary/12 blur-[100px]" />
      </div>

      {/* ── Main grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-center min-h-screen py-24">

        {/* ════ LEFT: Text Content ════ */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-xs font-mono text-primary tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Transforming Ideas Into Intelligent Solutions
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.0] mb-5 text-white"
          >
            <span className="block">Paridhi</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-purple-400">
              Shukla
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <div className="h-8 flex items-center mb-6">
            <motion.p
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-base sm:text-lg font-mono text-secondary/90"
            >
              &gt;&nbsp;{roles[currentRoleIndex]}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                _
              </motion.span>
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base text-slate-400 max-w-md mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Passionate Computer Engineering student focused on software
            development, AI, and problem‑solving. I build practical solutions
            that combine creativity, technology, and innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-8 w-full lg:w-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <a
              href="#projects"
              className="px-7 py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/85 transition-all hover:shadow-[0_0_22px_rgba(139,92,246,0.45)] border border-primary/60 text-center"
            >
              View Projects
            </a>
            <a
              href="/Paridhi_Shukla_Resume.docx"
              target="_blank"
              className="px-7 py-3 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-all border border-white/15 text-center backdrop-blur-sm"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-lg bg-secondary/10 text-secondary text-sm font-medium hover:bg-secondary/18 transition-all border border-secondary/40 text-center hover:shadow-[0_0_18px_rgba(6,182,212,0.2)]"
            >
              Say Hello
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            {[
              { href: "https://github.com/Paridhi21shukla", label: "GitHub", icon: <Github className="w-[18px] h-[18px]" />, hover: "hover:text-white hover:border-white/30 hover:bg-white/10" },
              { href: "https://linkedin.com", label: "LinkedIn", icon: <Linkedin className="w-[18px] h-[18px]" />, hover: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10" },
              { href: "https://hackerrank.com", label: "HackerRank", icon: <SiHackerrank className="w-[18px] h-[18px]" />, hover: "hover:text-[#00EA64] hover:border-[#00EA64]/40 hover:bg-[#00EA64]/10" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className={`w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all duration-200 backdrop-blur-sm ${s.hover}`}
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ════ RIGHT: Profile Photo ════ */}
        <div className="flex items-center justify-center lg:justify-end order-1 lg:order-2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* ── Deep nebula halos (behind everything) ── */}
            <div className="absolute inset-0 -m-24 rounded-full bg-secondary/12 blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 -m-16 rounded-full bg-primary/18 blur-[60px] pointer-events-none" />
            <div className="absolute inset-0 -m-6 rounded-full bg-secondary/10 blur-[30px] pointer-events-none" />

            {/* ── Orbit particles ── */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
              <OrbitParticle radius={210} duration={22} size={6} color="#8B5CF6" startAngle={0} />
              <OrbitParticle radius={210} duration={22} size={4} color="#06B6D4" startAngle={180} />
              <OrbitParticle radius={185} duration={16} size={5} color="#06B6D4" startAngle={90} />
              <OrbitParticle radius={185} duration={16} size={3} color="#8B5CF6" startAngle={270} />
              <OrbitParticle radius={235} duration={30} size={3} color="#A78BFA" startAngle={45} />
            </div>

            {/* ── Orbit rings ── */}
            <motion.div
              className="absolute rounded-full border border-primary/18 pointer-events-none"
              style={{ inset: -45, borderStyle: "dashed" }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            />
            <motion.div
              className="absolute rounded-full border border-secondary/14 pointer-events-none"
              style={{ inset: -70, borderStyle: "dashed" }}
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            />

            {/* ── Floating wrapper ── */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-10"
            >
              {/* Glassmorphism card (slightly rounded rectangle, not circle) */}
              <div className="relative w-[300px] h-[380px] sm:w-[340px] sm:h-[430px] lg:w-[390px] lg:h-[490px] rounded-3xl overflow-hidden">

                {/* Multi-stop holographic border */}
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary via-secondary via-50% to-purple-500"
                  style={{ zIndex: 3, background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 40%, #A78BFA 70%, #8B5CF6 100%)" }}
                >
                  {/* Inner container */}
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#070d1f] relative">

                    {/* Photo — shifted up to focus on face */}
                    <img
                      src="/profile.jpg"
                      alt="Paridhi Shukla — Computer Engineering Student"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: "center 8%",
                        filter: "brightness(1.08) contrast(1.06) saturate(1.05)",
                        transform: "scale(1.08)",
                        transformOrigin: "center 15%",
                      }}
                    />

                    {/* Bottom glass overlay — metadata strip */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#070d1f]/90 via-[#070d1f]/40 to-transparent backdrop-blur-sm flex items-end px-5 pb-4">
                      <div>
                        <p className="text-white text-sm font-semibold leading-tight">Paridhi Shukla</p>
                        <p className="text-secondary/80 text-xs font-mono">Computer Engineering · GLA University</p>
                      </div>
                    </div>

                    {/* Subtle inner vignette for depth */}
                    <div className="absolute inset-0 rounded-[22px] shadow-[inset_0_0_40px_rgba(5,8,22,0.4)] pointer-events-none" />
                  </div>
                </div>

                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    zIndex: 4,
                    boxShadow: "0 0 35px rgba(139,92,246,0.35), 0 0 70px rgba(6,182,212,0.15), 0 0 120px rgba(139,92,246,0.08)",
                  }}
                />
              </div>

              {/* ── HUD corner accents ── */}
              <div className="absolute -top-[3px] -left-[3px] w-7 h-7 border-t-2 border-l-2 border-primary rounded-tl-lg z-20" />
              <div className="absolute -top-[3px] -right-[3px] w-7 h-7 border-t-2 border-r-2 border-secondary rounded-tr-lg z-20" />
              <div className="absolute -bottom-[3px] -left-[3px] w-7 h-7 border-b-2 border-l-2 border-secondary rounded-bl-lg z-20" />
              <div className="absolute -bottom-[3px] -right-[3px] w-7 h-7 border-b-2 border-r-2 border-primary rounded-br-lg z-20" />

              {/* ── Status badge ── */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b1020]/80 border border-white/10 backdrop-blur-md z-20"
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-[11px] font-mono text-slate-300 tracking-wide">Available for hire</span>
              </motion.div>

              {/* ── Floating skill pill (top-right accent) ── */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="absolute -top-4 -right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md z-20"
              >
                <span className="text-primary text-xs">⚡</span>
                <span className="text-[11px] font-mono text-primary/90">Full Stack</span>
              </motion.div>

              {/* ── Floating AI pill (left accent) ── */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute top-1/3 -left-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 backdrop-blur-md z-20"
              >
                <span className="text-secondary text-xs">🤖</span>
                <span className="text-[11px] font-mono text-secondary/90">AI · ML</span>
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
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary/50 to-transparent relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-primary absolute top-0"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
