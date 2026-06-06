import { motion } from "framer-motion";
import { GraduationCap, Award, MapPin } from "lucide-react";

export function Education() {
  const education = [
    {
      degree: "B.Tech Computer Science & Engineering",
      institution: "GLA University",
      location: "Greater Noida",
      date: "2024 - 2028 (CURRENT)",
      description: "Focusing on core CS principles, AI/ML, and cloud technologies. Active in technical clubs and leading the Toastmasters chapter.",
      achievements: [
        "Founded Toastmasters Club chapter on campus to enhance student communication skills",
        "State Level Award winner (2nd Position) in Creative Art & Designing",
        "Maintained excellent academic standing in core CS modules"
      ],
      active: true
    },
    {
      degree: "Class XII",
      institution: "Dhruva Public School",
      location: "New Delhi",
      date: "Completed",
      description: "Science stream with focus on Physics, Chemistry, and Mathematics.",
      achievements: [],
      active: false
    },
    {
      degree: "Class X",
      institution: "Delhi Public School",
      location: "Bulandshahr",
      date: "Completed",
      description: "Foundation studies in core academics, building a strong base for higher education.",
      achievements: [],
      active: false
    }
  ];

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-white">
            <span className="text-primary">04.</span> Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto md:mx-0"></div>
        </motion.div>

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[41px] md:-left-[57px] w-6 h-6 rounded-full border-4 border-[#050816] flex items-center justify-center
                ${item.active ? 'bg-secondary' : 'bg-slate-700'}
              `}>
                {item.active && (
                  <motion.div 
                    className="w-full h-full rounded-full bg-secondary"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>

              <div className={`p-6 rounded-xl border transition-all duration-300 ${
                item.active 
                  ? "bg-gradient-to-br from-[#0B1026] to-[#050816] border-secondary/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]" 
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    {item.active && <GraduationCap className="text-secondary w-6 h-6" />}
                    {item.degree}
                  </h3>
                  <span className="font-mono text-sm text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                    {item.date}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-slate-400 mb-4 text-sm font-mono">
                  <span className="flex items-center gap-1 text-white">
                    <Award className="w-4 h-4" /> {item.institution}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {item.location}
                  </span>
                </div>
                
                <p className="text-slate-300 text-base">
                  {item.description}
                </p>
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <h4 className="text-xs font-mono text-primary uppercase tracking-wider mb-2">Key Achievements:</h4>
                    <ul className="text-sm text-slate-400 space-y-1.5 list-none pl-0">
                      {item.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-secondary mt-1.5 text-xs">•</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
