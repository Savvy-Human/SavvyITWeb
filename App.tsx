
import React, { useState, useEffect, useRef } from 'react';
import Estimator from './components/Estimator';
import { 
  Menu, X, Cpu, GraduationCap, Zap, CheckCircle, 
  Mail, Phone, MapPin, ChevronRight, MessageCircle, 
  Send, User, Quote, Star
} from 'lucide-react';

type SectionId = 'home' | 'about' | 'services' | 'coaching' | 'automation' | 'testimonials' | 'contact';

const SavvyLogo = () => (
  <div className="flex flex-col items-center group cursor-pointer relative py-2 transition-transform duration-300">
    <div className="flex items-center -space-x-1 filter drop-shadow-[0_4px_12px_rgba(252,70,107,0.4)]">
      <span className="cursive-font text-5xl md:text-7xl text-[#fc466b] transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 group-hover:drop-shadow-[0_0_20px_rgba(252,70,107,0.6)]">
        Savvy
      </span>
      <span className="text-4xl md:text-6xl font-extrabold text-[#fc466b] tracking-tight transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-[0_0_20px_rgba(252,70,107,0.6)] ml-2 leading-none">
        IT
      </span>
    </div>
    <div className="mt-[-4px] ml-6 md:ml-8 overflow-hidden">
      <span className="text-[9px] md:text-[11px] font-bold tracking-[0.45em] text-[#fc466b] whitespace-nowrap uppercase opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:tracking-[0.55em] block">
        Technology, Made Simple
      </span>
    </div>
  </div>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      chatRef.current.querySelector('input')?.focus();
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 right-8 z-[60] pointer-events-none" role="complementary" aria-label="Support Chat">
      <div 
        ref={chatRef}
        className={`absolute bottom-20 right-0 w-80 md:w-96 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right pointer-events-auto ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <div className="bg-savvy-dark/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[#fc466b] to-[#3f5efb] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <User size={20} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-black text-white leading-tight">Savvy Support</h4>
                <p className="text-xs text-white/70 font-bold uppercase tracking-widest">Always Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors outline-none focus:ring-2 focus:ring-white"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-80 p-6 overflow-y-auto space-y-4" role="log" aria-live="polite">
            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 max-w-[85%]">
              <p className="text-sm text-gray-300">Hey there! 👋 Need some help with your tech or want to book a diagnostic? Ask away!</p>
            </div>
          </div>
          <div className="p-4 border-t border-white/10 bg-white/5">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#fc466b] outline-none transition-all"
                aria-label="Chat message"
              />
              <button 
                className="p-3 bg-savvy-primary rounded-xl hover:bg-[#ff5d7e] transition-all text-white outline-none focus:ring-2 focus:ring-[#fc466b]"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-16 h-16 rounded-full bg-savvy-primary hover:bg-[#ff5d7e] shadow-[0_15px_35px_rgba(252,70,107,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:ring-4 focus:ring-[#fc466b]/40 outline-none"
        aria-label={isOpen ? "Close chat" : "Open live chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="text-white" size={28} aria-hidden="true" /> : <MessageCircle className="text-white group-hover:rotate-12 transition-transform" size={28} aria-hidden="true" />}
        {!isOpen && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#3f5efb] border-2 border-savvy-dark rounded-full animate-bounce" aria-hidden="true"></span>}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [estimateData, setEstimateData] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    coaching: useRef<HTMLElement>(null),
    automation: useRef<HTMLElement>(null),
    testimonials: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const phrases = ["Intelligent", "Strategic", "Empowering", "Human-centered", "Savvy IT"];
  
  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    const type = () => {
      const currentPhrase = phrases[phraseIdx];
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, charIdx - 1));
        charIdx--;
        typingSpeed = 50;
      } else {
        setTypedText(currentPhrase.substring(0, charIdx + 1));
        charIdx++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, []);

  // Sync scroll on mount for section detection
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.6,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as SectionId;
          setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Trap focus in menu when open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const navigateTo = (id: SectionId) => {
    const element = sectionRefs[id].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleBookService = (data: any) => {
    setEstimateData(data);
    navigateTo('contact');
  };

  const menuItems = [
    { id: 'home', label: 'Home', subtitle: 'Welcome' },
    { id: 'about', label: 'About', subtitle: 'What we Do' },
    { id: 'services', label: 'Services', subtitle: 'How we Support' },
    { id: 'coaching', label: 'Coaching', subtitle: 'How we Empower' },
    { id: 'automation', label: 'Automation', subtitle: 'How we Scale' },
    { id: 'testimonials', label: 'Testimonials', subtitle: 'Social Proof' },
    { id: 'contact', label: 'Contact', subtitle: 'Nice to meet you' },
  ];

  const testimonials = [
    { name: "Sarah Jenkins", role: "CEO, NexaFlow", quote: "Savvy IT didn't just fix our server; they built an automation engine that saves our team 15 hours a week. Truly game-changing service.", stars: 5 },
    { name: "Mark Peterson", role: "Freelance Creative", quote: "I was drowning in data chaos. The coaching sessions helped me regain control of my digital life. No jargon, just pure empowerment.", stars: 5 },
    { name: "Elena Rodriguez", role: "Small Business Owner", quote: "Fastest IT diagnostics I've ever experienced. Transparent pricing and a team that actually cares about your success.", stars: 5 }
  ];

  return (
    <div className={`relative min-h-screen bg-savvy-dark text-white font-sans overflow-hidden ${isMenuOpen ? 'menu-open' : ''}`}>
      <ChatWidget />

      {/* Header Landmark */}
      <header role="banner" className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center transition-all duration-500 pointer-events-none">
        <div 
          className="relative z-50 pointer-events-auto transition-transform duration-500 hover:scale-105 active:scale-95"
          onClick={() => navigateTo('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigateTo('home')}
          aria-label="Savvy IT Home"
        >
          <SavvyLogo />
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`z-50 p-4 rounded-full border pointer-events-auto transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-[#fc466b]/30 flex items-center justify-center group
            ${isMenuOpen 
              ? 'bg-white text-savvy-dark border-transparent scale-110 shadow-2xl' 
              : 'bg-savvy-dark/80 border-white/20 hover:border-[#fc466b] text-white backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:shadow-[#fc466b]/20 hover:bg-savvy-dark/90 ring-1 ring-white/5'}`}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
        >
          <div className="relative w-7 h-7" aria-hidden="true">
            <span className={`absolute block h-0.5 w-7 bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1.5'}`}></span>
            <span className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 top-3.5 right-0 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute block h-0.5 w-7 bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5.5'}`}></span>
          </div>
        </button>
      </header>

      {/* Navigation Landmark */}
      <nav 
        id="main-navigation"
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.86, 0, 0.07, 1)] 
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
        aria-label="Main Navigation"
      >
        <div className={`absolute inset-0 bg-savvy-dark/98 backdrop-blur-3xl transition-opacity duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className={`absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#fc466b]/15 blur-[150px] rounded-full transition-all duration-1000 ${isMenuOpen ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`} aria-hidden="true"></div>
        <div className={`absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#3f5efb]/15 blur-[150px] rounded-full transition-all duration-1000 delay-200 ${isMenuOpen ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`} aria-hidden="true"></div>

        <div className="relative h-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 md:px-24 py-32 space-y-4 md:space-y-8">
            {menuItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as SectionId)}
                tabIndex={isMenuOpen ? 0 : -1}
                className={`group text-left focus:outline-none menu-item focus:translate-x-4`}
                style={{ transitionDelay: isMenuOpen ? `${idx * 100 + 200}ms` : '0ms' }}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <span className="block text-xs uppercase tracking-[0.6em] text-gray-500 mb-2 group-hover:text-[#fc466b] group-focus:text-[#fc466b] transition-colors duration-300 font-bold">
                  {item.subtitle}
                </span>
                <span className={`text-4xl md:text-8xl font-black transition-all duration-500 block leading-none tracking-tighter
                  ${activeSection === item.id ? 'gradient-text translate-x-6' : 'hover:translate-x-6 text-white/10 hover:text-white group-focus:text-white'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          
          <div className="hidden lg:flex w-1/2 h-full overflow-hidden border-l border-white/5" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`flex-1 h-full bg-cover bg-center transition-all duration-[1.8s] ease-[cubic-bezier(0.19, 1, 0.22, 1)] grayscale opacity-0 hover:grayscale-0 hover:opacity-100 hover:scale-110
                  ${isMenuOpen ? 'translate-y-0 opacity-20' : 'translate-y-full'}`} 
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-${i === 1 ? '1519389950473-47ba0277781c' : i === 2 ? '1486312338219-ce68d2c6f44d' : i === 3 ? '1581091226825-a6a2a5aee158' : '1551434678-e076c223a692'}?auto=format&fit=crop&q=80&w=800')`,
                  transitionDelay: isMenuOpen ? `${i * 120 + 400}ms` : '0ms'
                }}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Main Landmark Area */}
      <main 
        ref={containerRef}
        id="main-content"
        className="snap-container hide-scrollbar"
        role="main"
      >
        {/* HOME SECTION */}
        <section 
          id="home" 
          ref={sectionRefs.home}
          className="snap-section flex flex-col lg:flex-row relative"
          aria-labelledby="hero-heading"
        >
          <div className="w-full lg:w-1/2 flex items-center px-8 md:px-20 py-20 z-10">
            <div className="max-w-2xl">
              <h1 id="hero-heading" className="text-6xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                Hello! We are <br />
                <span className="gradient-text" aria-live="polite" aria-atomic="true">{typedText}</span>
                <span className="border-r-4 border-[#fc466b] ml-1 animate-pulse" aria-hidden="true"></span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-xl">
                We fix your tech, optimize your workflow, and teach you to actually understand it. No jargon. No judgment. Just solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => navigateTo('services')} 
                  className="px-10 py-5 bg-savvy-primary hover:bg-[#ff5d7e] transition-all font-bold rounded-2xl text-center shadow-[0_20px_60px_rgba(252,70,107,0.4)] transform hover:-translate-y-1 active:translate-y-0 focus:ring-4 focus:ring-[#fc466b]/40 outline-none"
                  aria-label="Calculate an instant estimate"
                >
                  Get an Instant Estimate
                </button>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="px-10 py-5 border border-white/20 hover:border-white hover:bg-white/5 transition-all font-bold rounded-2xl text-center backdrop-blur-sm focus:ring-4 focus:ring-white/20 outline-none"
                >
                  See How We Think
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-1/2 h-full relative overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[3s] hover:scale-100" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200')` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-savvy-dark to-transparent"></div>
            </div>
            <div className="absolute bottom-16 left-16 right-16 p-10 bg-savvy-dark/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-3xl transform transition-all duration-700 hover:-translate-y-4">
               <div className="flex items-center gap-5 mb-6">
                  <div className="p-4 bg-[#fc466b]/30 rounded-2xl ring-4 ring-[#fc466b]/10"><Cpu className="text-[#fc466b]" size={32} /></div>
                  <h3 className="text-2xl font-bold">Technical Services</h3>
               </div>
               <p className="text-gray-300 text-lg leading-relaxed">Diagnostics, performance optimization, and seamless troubleshooting for all your devices.</p>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section 
          id="about" 
          ref={sectionRefs.about}
          className="snap-section overflow-y-auto px-8 md:px-24 py-32 flex flex-col justify-center"
          aria-labelledby="about-heading"
        >
          <div className="max-w-5xl mx-auto w-full">
            <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">What We Do</span>
            <h2 id="about-heading" className="text-5xl md:text-7xl font-black mb-16 tracking-tight">Building systems that <br /><span className="gradient-text">empower humans.</span></h2>
            
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
              {[
                { title: "Strategy & Architecture", desc: "Clear roadmaps, system design, and decision-making that prevent expensive mistakes." },
                { title: "Systems & Automation", desc: "Databases, applications, and workflows designed to remove friction—without removing humans." },
                { title: "Migration & Modernization", desc: "Legacy systems untangled, stabilized, and upgraded without burning everything down." },
                { title: "Training & Enablement", desc: "Most tech support leaves you where you started. We believe you should understand your technology." }
              ].map((item, idx) => (
                <article key={idx} className="group hover:translate-x-3 transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#fc466b] transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                </article>
              ))}
            </div>

            <div className="bg-white/5 p-12 lg:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#fc466b]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
              <h3 className="text-3xl md:text-4xl font-black mb-12 relative z-10">How We Think</h3>
              <ul className="space-y-8 relative z-10" role="list">
                {[
                  "Technology should make people more capable—not more dependent.",
                  "Systems must work under real-world pressure.",
                  "Tools should be designed for non-technical users.",
                  "Practical training is the core of everything we do."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-6 group">
                    <div className="mt-1 flex-shrink-0 w-11 h-11 rounded-xl bg-[#fc466b]/20 flex items-center justify-center group-hover:bg-[#fc466b] group-hover:text-white transition-all duration-500" aria-hidden="true">
                      <CheckCircle size={24} />
                    </div>
                    <span className="text-xl text-gray-300 font-medium leading-tight">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section 
          id="services" 
          ref={sectionRefs.services}
          className="snap-section overflow-y-auto px-8 md:px-24 py-32"
          aria-labelledby="services-heading"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Services & Estimation</span>
              <h2 id="services-heading" className="text-5xl md:text-7xl font-black mb-8 tracking-tight">We fix what's broken. <br />And <span className="gradient-text">optimize</span> what's not.</h2>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">Get a fast, transparent estimate for your project or issue right now.</p>
            </div>

            <div className="mb-24">
              <Estimator onBook={handleBookService} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10" role="list">
              {[
                { title: "Computer Checkups", desc: "Diagnostics and health scans to keep your hardware running smoothly." },
                { title: "Optimization", desc: "Software cleanup and system tuning to reclaim speed." },
                { title: "Software Management", desc: "Installing, updating, and securing the tools you use daily." },
                { title: "Data Organization", desc: "Cloud storage audits and file management for peace of mind." },
                { title: "Troubleshooting", desc: "Expert fixes for those annoying bugs that won't go away." },
                { title: "Small Biz Consulting", desc: "Tailored IT strategy for modern growing businesses." }
              ].map((s, i) => (
                <div key={i} className="p-10 bg-white/5 rounded-3xl border border-white/5 hover:border-[#fc466b]/50 transition-all hover:bg-white/10 group shadow-lg hover:shadow-[#fc466b]/5" role="listitem">
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-[#fc466b] transition-colors">{s.title}</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COACHING SECTION */}
        <section 
          id="coaching" 
          ref={sectionRefs.coaching}
          className="snap-section overflow-y-auto px-8 md:px-24 py-32 flex flex-col justify-center"
          aria-labelledby="coaching-heading"
        >
          <div className="max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-8 mb-16">
              <div className="p-7 bg-[#fc466b]/20 rounded-[2.5rem] shadow-2xl shadow-[#fc466b]/20 ring-1 ring-white/10" aria-hidden="true"><GraduationCap className="text-[#fc466b]" size={64} /></div>
              <h2 id="coaching-heading" className="text-5xl md:text-7xl font-black tracking-tight">Empowerment <br /><span className="gradient-text">Training.</span></h2>
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-20 leading-relaxed max-w-4xl">
              We don't just fix the problem; we show you how to handle it next time. Confidence beats dependency every single time.
            </p>

            <div className="grid md:grid-cols-2 gap-12" role="list">
              {[
                { title: "1:1 Coaching", items: ["Personalized sessions", "Device mastery", "Custom workflows"] },
                { title: "Family Programs", items: ["Online safety", "Device setup for kids", "Digital skills for seniors"] },
                { title: "AI Literacy", items: ["Prompt engineering", "AI tool selection", "Ethical usage"] },
                { title: "Business Training", items: ["Team productivity", "SOP development", "System adoption"] }
              ].map((c, i) => (
                <div key={i} className="p-14 bg-gradient-to-br from-white/10 to-transparent rounded-[4rem] border border-white/10 hover:border-[#fc466b]/50 transition-all duration-700 group" role="listitem">
                  <h3 className="text-3xl font-bold mb-8 group-hover:translate-x-2 transition-transform">{c.title}</h3>
                  <ul className="space-y-6" role="list">
                    {c.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-5 text-gray-400 text-xl font-medium">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#fc466b]" aria-hidden="true"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AUTOMATION SECTION */}
        <section 
          id="automation" 
          ref={sectionRefs.automation}
          className="snap-section overflow-y-auto px-8 md:px-24 py-32 flex flex-col justify-center"
          aria-labelledby="automation-heading"
        >
          <div className="max-w-5xl mx-auto text-center w-full">
            <div className="inline-block p-10 bg-[#fc466b]/15 rounded-[4rem] mb-12 ring-1 ring-[#fc466b]/20" aria-hidden="true">
              <Zap className="text-[#fc466b]" size={64} />
            </div>
            <h2 id="automation-heading" className="text-5xl md:text-8xl font-black mb-10 leading-tight tracking-tight">Scale with <span className="gradient-text">Intelligence.</span></h2>
            <p className="text-2xl text-gray-400 mb-24 max-w-3xl mx-auto leading-relaxed">
              Make technology work for you—not create more work. We build automated workflows that save hours every single week.
            </p>

            <div className="grid gap-10 text-left max-w-4xl mx-auto">
              {[
                { title: "AI Tool Setup", desc: "Setting up LLMs and custom GPTs to act as specialized assistants for your niche." },
                { title: "Custom Workflows", desc: "Connecting your disparate tools (Email, CRM, Tasks) into one seamless engine." },
                { title: "Process Automation", desc: "Removing repetitive manual steps from your data entry or communication cycles." }
              ].map((a, i) => (
                <article key={i} className="group p-12 bg-white/5 rounded-[3rem] border border-white/5 hover:bg-[#fc466b]/5 hover:border-[#fc466b]/40 transition-all duration-700">
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="text-3xl font-bold group-hover:text-[#fc466b] transition-colors">{a.title}</h4>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#fc466b] transition-all duration-500 shadow-xl" aria-hidden="true">
                      <Zap size={24} className="text-[#fc466b] group-hover:text-white" />
                    </div>
                  </div>
                  <p className="text-gray-400 text-xl leading-relaxed">{a.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section 
          id="testimonials" 
          ref={sectionRefs.testimonials}
          className="snap-section overflow-y-auto px-8 md:px-24 py-32 flex flex-col justify-center"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-24">
              <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Our Impact</span>
              <h2 id="testimonials-heading" className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Trusted by <br /><span className="gradient-text">thousands</span> of users.</h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-10" role="list">
              {testimonials.map((t, i) => (
                <figure key={i} className="bg-white/5 p-12 rounded-[4rem] border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 hover:-translate-y-4 group" role="listitem">
                  <div>
                    <div className="flex gap-1 mb-8" aria-label={`${t.stars} stars rating`}>
                      {[...Array(t.stars)].map((_, idx) => (
                        <Star key={idx} size={18} className="fill-[#fc466b] text-[#fc466b]" aria-hidden="true" />
                      ))}
                    </div>
                    <Quote size={48} className="text-[#fc466b]/20 mb-6 group-hover:text-[#fc466b]/40 transition-colors" aria-hidden="true" />
                    <blockquote className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed italic mb-12">
                      "{t.quote}"
                    </blockquote>
                  </div>
                  <figcaption className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fc466b] to-[#3f5efb] p-[2px]" aria-hidden="true">
                      <div className="w-full h-full rounded-full bg-savvy-dark flex items-center justify-center">
                        <User size={24} className="text-white/50" />
                      </div>
                    </div>
                    <div>
                      <cite className="font-black text-xl text-white not-italic">{t.name}</cite>
                      <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION Landmark */}
        <section 
          id="contact" 
          ref={sectionRefs.contact}
          className="snap-section overflow-y-auto px-8 md:px-24 py-32 flex flex-col justify-center"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Contact Us</span>
              <h2 id="contact-heading" className="text-5xl md:text-8xl font-black mb-10 tracking-tight leading-none">Let's make <br />your tech <span className="gradient-text">work.</span></h2>
              
              <div className="space-y-16 mt-16" role="list">
                {[
                  { icon: Mail, label: "Email", value: "hello@savvy-it.com", href: "mailto:hello@savvy-it.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-SAVY", href: "tel:+15551237289" },
                  { icon: MapPin, label: "Office", value: "123 Tech Avenue, Suite 400 Silicon Valley, CA", href: "#" }
                ].map((item, idx) => (
                  <a key={idx} href={item.href} className="flex items-center gap-10 group focus:ring-4 focus:ring-[#fc466b]/20 rounded-3xl outline-none" role="listitem">
                    <div className="p-6 bg-white/5 rounded-[2rem] ring-1 ring-white/10 group-hover:bg-[#fc466b] group-hover:text-white transition-all duration-700 shadow-xl group-hover:shadow-[#fc466b]/20" aria-hidden="true">
                      <item.icon className="text-[#fc466b] group-hover:text-white transition-colors" size={32} />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-500 text-xs uppercase tracking-[0.3em] mb-2">{item.label}</h5>
                      <p className="text-white text-2xl font-bold">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <form 
                className="bg-white/5 p-12 md:p-20 rounded-[5rem] border border-white/10 shadow-3xl backdrop-blur-3xl relative overflow-hidden ring-1 ring-white/5"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Message sent! We will be in touch shortly.');
                }}
              >
                <div className="grid md:grid-cols-2 gap-10 mb-10">
                  <div className="space-y-3">
                    <label htmlFor="name" className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Name</label>
                    <input id="name" type="text" autoComplete="name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:border-[#fc466b] focus:bg-white/10 outline-none transition-all font-medium text-lg" placeholder="Your Name" required />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Email</label>
                    <input id="email" type="email" autoComplete="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:border-[#fc466b] focus:bg-white/10 outline-none transition-all font-medium text-lg" placeholder="Email Address" required />
                  </div>
                </div>
                <div className="mb-12 space-y-3">
                  <label htmlFor="message-field" className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Message</label>
                  <textarea 
                    id="message-field"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 h-64 focus:border-[#fc466b] focus:bg-white/10 outline-none transition-all resize-none font-medium text-lg" 
                    placeholder="Tell us about your tech challenge..."
                    defaultValue={estimateData ? `I'm interested in ${estimateData.service} for ${estimateData.devices} device(s) (Complexity: ${estimateData.complexity}).\n\nEstimated range was: $${estimateData.estimate}\n\n` : ''}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-7 bg-savvy-primary hover:bg-[#ff5d7e] transition-all font-black rounded-3xl text-2xl shadow-[0_25px_60px_rgba(252,70,107,0.4)] transform active:scale-[0.98] tracking-tight focus:ring-4 focus:ring-[#fc466b]/40 outline-none">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer Landmark */}
        <footer className="snap-section flex items-center justify-center p-12 bg-savvy-dark border-t border-white/5" role="contentinfo">
          <div className="text-center text-gray-500 text-sm font-medium">
            <p>&copy; {new Date().getFullYear()} Savvy IT Solutions. All rights reserved.</p>
            <p className="mt-2 tracking-[0.2em] uppercase text-[10px] text-gray-600">Built for the future of human-centered tech.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
