import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, Suspense, useEffect } from "react";
import * as THREE from "three";
import { Github, Linkedin, ExternalLink } from "lucide-react";
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

  useFrame((state, delta) => {
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

export function Hero() {
  const roles = [
    "Computer Engineering Student",
    "Full Stack Developer",
    "AI & Software Enthusiast",
    "Problem Solver | Developer"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden pt-20">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </div>

      {/* Ambient background glows */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {/* Left side ambient glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        {/* Right side glow behind profile image */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/6 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[80px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* Left: Text Content */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-sm font-mono text-primary"
          >
            ✦ Transforming Ideas Into Intelligent Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-white leading-tight"
          >
            <span className="block">Paridhi</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-pop">
              Shukla
            </span>
          </motion.h1>

          <div className="h-10 flex items-center mb-5">
            <motion.p
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-lg md:text-xl font-mono text-secondary/90"
            >
              &gt; {roles[currentRoleIndex]}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
            </motion.p>
          </div>

          <motion.p
            className="text-base md:text-lg text-slate-400 max-w-lg mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Passionate Computer Engineering student focused on software development, AI, and problem-solving. I build practical solutions that combine creativity, technology, and innovation.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a href="#projects" className="px-7 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-primary text-center text-sm">
              View Projects
            </a>
            <a href="/Paridhi_Shukla_Resume.docx" target="_blank" className="px-7 py-3 rounded-md bg-transparent text-white font-medium hover:bg-white/5 transition-all border border-white/20 text-center text-sm">
              Resume
            </a>
            <a href="#contact" className="px-7 py-3 rounded-md bg-transparent text-secondary font-medium hover:bg-secondary/10 transition-all border border-secondary/50 text-center text-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              Say Hello
            </a>
          </motion.div>

          <motion.div
            className="flex gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a href="https://github.com/Paridhi21shukla" target="_blank" rel="noreferrer" aria-label="GitHub Profile"
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://hackerrank.com" target="_blank" rel="noreferrer" aria-label="HackerRank Profile"
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#00EA64] hover:border-[#00EA64]/30 hover:bg-[#00EA64]/10 transition-all">
              <SiHackerrank className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right: Profile Photo */}
        <div className="md:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Outer ambient nebula glow */}
            <div className="absolute inset-0 -m-16 bg-gradient-radial from-primary/15 via-secondary/8 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute inset-0 -m-8 bg-gradient-radial from-secondary/10 via-primary/5 to-transparent rounded-full blur-xl pointer-events-none" />

            {/* Orbit ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-0 -m-6 rounded-full border border-primary/20"
              style={{ borderStyle: "dashed" }}
            />

            {/* Orbit ring 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute inset-0 -m-12 rounded-full border border-secondary/15"
              style={{ borderStyle: "dashed" }}
            />

            {/* Floating orbit dot 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-0 -m-6 rounded-full"
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
            </motion.div>

            {/* Floating orbit dot 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute inset-0 -m-12 rounded-full"
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            </motion.div>

            {/* Floating animation wrapper */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glassmorphic container */}
              <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full">
                {/* Glowing border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-pop p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#050816] overflow-hidden">
                    <img
                      src="/profile.jpg"
                      alt="Paridhi Shukla"
                      className="w-full h-full object-cover object-top scale-110"
                      style={{ filter: "brightness(1.05) contrast(1.02)" }}
                    />
                  </div>
                </div>

                {/* Inner glow overlay */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.3),0_0_80px_rgba(6,182,212,0.15),inset_0_0_20px_rgba(139,92,246,0.1)] pointer-events-none" />
              </div>

              {/* Corner HUD indicators */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-sm" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-secondary rounded-tr-sm" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-secondary rounded-bl-sm" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-sm" />

              {/* Status indicator */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-xs font-mono text-slate-300">Available for hire</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-primary absolute top-0"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
