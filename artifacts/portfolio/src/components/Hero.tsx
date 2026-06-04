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
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-mono text-tertiary"
        >
          Transforming Ideas Into Intelligent Solutions
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-white">
          <span className="block">Paridhi</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-pop">
            Shukla
          </span>
        </h1>
        
        <div className="h-12 flex items-center mb-6">
          <motion.p
            key={currentRoleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-xl md:text-2xl font-mono text-muted-foreground"
          >
            &gt; {roles[currentRoleIndex]}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
          </motion.p>
        </div>
        
        <motion.p 
          className="text-lg text-slate-400 max-w-lg mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Passionate Computer Engineering student focused on software development, AI, and problem-solving. I build practical solutions that combine creativity, technology, and innovation.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a href="#projects" className="px-8 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors border border-primary text-center">
            View Projects
          </a>
          <a href="/Paridhi_Shukla_Resume.docx" target="_blank" className="px-8 py-3 rounded-md bg-transparent text-white font-medium hover:bg-white/5 transition-colors border border-white/20 text-center">
            Resume
          </a>
          <a href="#contact" className="px-8 py-3 rounded-md bg-transparent text-secondary font-medium hover:bg-secondary/10 transition-colors border border-secondary/50 text-center">
            Say Hello
          </a>
        </motion.div>
        
        <motion.div 
          className="mt-12 flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="https://github.com/Paridhi21shukla" target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="text-slate-400 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="text-slate-400 hover:text-[#0A66C2] transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://hackerrank.com" target="_blank" rel="noreferrer" aria-label="HackerRank Profile" className="text-slate-400 hover:text-[#00EA64] transition-colors">
            <SiHackerrank className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
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
