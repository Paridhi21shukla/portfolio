import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, Copy, CheckCircle2, MapPin, Loader2 } from "lucide-react";
import { SiHackerrank } from "react-icons/si";
import { useState, useRef } from "react";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "paridhishukla2101@gmail.com";
  
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>("idle");

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch("https://formsubmit.co/ajax/paridhishukla2101@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          _subject: "New Portfolio Contact Message",
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitStatus("success");
        formRef.current?.reset();
      } else {
        setSubmitStatus(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setSubmitStatus("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" className="py-32 relative z-10 overflow-hidden">
      {/* Background glowing effects representing a transmission */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-sans text-white">
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">amazing</span> together.
          </h2>
          <p className="text-xl text-slate-400 mb-8 font-mono">
            // Open for opportunities, collaborations, and conversations.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all font-mono text-white group"
            >
              <Mail className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
              {email}
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-400 ml-2" /> : <Copy className="w-4 h-4 text-slate-500 ml-2" />}
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Transmission</h3>
            
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-slate-400 mb-2">01. Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  className="w-full bg-[#050816] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-slate-400 mb-2">02. Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className="w-full bg-[#050816] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-mono text-slate-400 mb-2">03. Message</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-[#050816] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono resize-none"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
              
              {submitStatus === "success" && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm font-mono text-center">
                  Message transmitted successfully!
                </div>
              )}
              
              {submitStatus !== "idle" && submitStatus !== "success" && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-mono text-center">
                  Transmission failed: {submitStatus}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Transmitting... <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Launch Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Digital Presence</h3>
              <p className="text-slate-400 mb-8">
                Connect with me on social platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "GitHub", icon: Github, link: "https://github.com/Paridhi21shukla", color: "hover:text-white hover:border-white" },
                { name: "LinkedIn", icon: Linkedin, link: "https://linkedin.com", color: "hover:text-[#0A66C2] hover:border-[#0A66C2]" },
                { name: "Location", icon: MapPin, link: "https://www.google.com/maps/search/?api=1&query=Greater+Noida,+India", color: "hover:text-secondary hover:border-secondary" },
                { name: "Phone", icon: null, value: "+91-7060891667", color: "hover:text-primary hover:border-primary" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link || `tel:${social.value}`}
                  target={social.link ? "_blank" : "_self"}
                  rel="noreferrer"
                  aria-label={social.name}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border border-white/5 bg-white/5 transition-all duration-300 ${social.color} group cursor-none`}
                >
                  {social.icon ? (
                    <social.icon className="w-8 h-8 mb-3 text-slate-400 group-hover:text-inherit transition-colors" />
                  ) : (
                    <span className="text-xl font-bold font-mono mb-2 text-slate-400 group-hover:text-inherit transition-colors">+91</span>
                  )}
                  <span className="text-sm font-medium text-slate-300 group-hover:text-inherit transition-colors">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
