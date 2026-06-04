import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code2, Brain, Database, Cloud, PenTool, LayoutTemplate } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-white">
            <span className="text-primary">01.</span> About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-lg text-slate-300 leading-relaxed font-sans"
          >
            <p>
              I am an ambitious <strong>Computer Engineering student</strong> at GLA University. At my core, I am a builder and problem-solver dedicated to creating high-impact software solutions that leverage cutting-edge technology for real-world benefits.
            </p>
            <p>
              <strong className="text-white">Career Objective:</strong> To secure a challenging software development or engineering internship where I can apply my programming, full-stack, and AI capabilities to build scalable applications and solve complex challenges.
            </p>
            <p>
              <strong className="text-white">Technical Interests:</strong> Artificial Intelligence & Machine Learning, Computer Vision, Full-Stack Web Architecture, Cloud Infrastructure (AWS), and Interactive UI/UX Design.
            </p>
            <p>
              <strong className="text-white">Areas of Expertise:</strong> Designing intelligent offline-first assistive tech (like <span className="text-white font-medium hover:text-primary transition-colors">Netra AI</span>), full-stack application development, data analysis, and leading collaborative student initiatives.
            </p>
            
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: "Projects", value: "5" },
                { label: "Club Founded", value: "1" },
                { label: "State Award", value: "1" },
                { label: "Years Coding", value: "2+" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                >
                  <span className="text-3xl md:text-4xl font-bold text-white font-mono">{stat.value}</span>
                  <span className="text-xs text-primary uppercase tracking-wider font-mono">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Brain, title: "AI/ML", desc: "Computer Vision, Predictive Models" },
              { icon: Code2, title: "Languages", desc: "Python, C, Java, TypeScript" },
              { icon: LayoutTemplate, title: "Full Stack", desc: "React, Node.js, Architecture" },
              { icon: Cloud, title: "Cloud/AWS", desc: "S3, EC2, IAM, CloudWatch" },
              { icon: PenTool, title: "UI/UX Design", desc: "Figma, User Research, Prototyping" },
              { icon: Database, title: "Core CS", desc: "Data Structures & Algorithms" }
            ].map((expertise, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                whileHover={{ y: -5, rotateX: 5, rotateY: 5 }}
                className="bg-[#0B1026]/50 border border-white/5 backdrop-blur-sm p-6 rounded-xl hover:border-primary/50 transition-colors group cursor-none"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <expertise.icon className="w-8 h-8 text-secondary mb-4 group-hover:text-primary transition-colors" />
                <h3 className="text-lg font-bold text-white mb-2">{expertise.title}</h3>
                <p className="text-sm text-slate-400">{expertise.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
