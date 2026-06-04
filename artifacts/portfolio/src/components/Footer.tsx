export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-white/5 py-8 bg-[#050816] relative z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white font-bold tracking-tighter">
          P<span className="text-primary">S</span>.
        </div>
        
        <p className="text-slate-500 text-sm font-mono flex items-center gap-2">
          Made with <span className="text-pop">❤</span> and code
        </p>
        
        <div className="text-slate-600 text-sm font-mono">
          &copy; {currentYear} Paridhi Shukla
        </div>
      </div>
    </footer>
  );
}
