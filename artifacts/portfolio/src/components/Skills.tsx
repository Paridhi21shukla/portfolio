import { motion } from "framer-motion";

const skills = [
  { category: "Programming Languages", items: ["Java", "Python", "C/C++"] },
  { category: "Web Development", items: ["HTML", "CSS", "JavaScript"] },
  { category: "Tools & Technologies", items: ["Git", "GitHub", "VS Code"] },
  { category: "Database", items: ["MySQL"] }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10 bg-[#0B1026]/30 border-y border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-white">
            <span className="text-primary">03.</span> Technical Arsenal
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, i) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#050816]/60 rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-secondary/30 transition-colors"
            >
              {/* Decorative gradient blur */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/10 blur-[50px] rounded-full group-hover:bg-secondary/20 transition-colors" />
              
              <h3 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-pop"></span>
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {skillGroup.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (i * 0.1) + (j * 0.05) }}
                    whileHover={{ y: -2, backgroundColor: "rgba(139, 92, 246, 0.15)" }}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm font-mono text-slate-300 hover:text-white hover:border-primary/50 cursor-none transition-all"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
