import { motion } from "framer-motion";
import { Mic2, HeartPulse, Palette } from "lucide-react";

export function Leadership() {
  const activities = [
    {
      icon: Mic2,
      title: "Founder & President",
      organization: "Toastmasters Club, GLA University",
      date: "Dec 2024 - Present",
      description: "Founded and currently leading the university chapter, fostering public speaking, leadership, and communication skills among students. Organized multiple events and speech contests.",
      color: "text-pop",
      bg: "bg-pop/10",
      border: "border-pop/30"
    },
    {
      icon: HeartPulse,
      title: "Mental Health Workshop Lead",
      organization: "B.Tech CSE Department",
      date: "2024",
      description: "Conducted a dedicated workshop for juniors focusing on early stress detection and emotional well-being. Led practical activities including Box Breathing, Tapping techniques, and created a 'Wall of Positivity'.",
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/30"
    },
    {
      icon: Palette,
      title: "State Level Award Winner",
      organization: "Art & Designing Competition",
      date: "Previous",
      description: "Secured Second Position at the state level, demonstrating creative thinking, visual aesthetics, and attention to detail which translates into my UI/UX design work.",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30"
    }
  ];

  return (
    <section id="leadership" className="py-24 relative z-10 bg-[#0B1026]/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-white">
            <span className="text-primary">05.</span> Leadership & Impact
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-2xl bg-[#050816] border ${activity.border} relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${activity.bg} blur-[50px] -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100`} />
              
              <div className={`w-14 h-14 rounded-xl ${activity.bg} flex items-center justify-center mb-6 relative z-10`}>
                <activity.icon className={`w-7 h-7 ${activity.color}`} />
              </div>
              
              <div className="relative z-10">
                <span className="text-xs font-mono text-slate-400 mb-2 block">{activity.date}</span>
                <h3 className="text-xl font-bold text-white mb-1">{activity.title}</h3>
                <h4 className={`text-sm font-medium ${activity.color} mb-4`}>{activity.organization}</h4>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
