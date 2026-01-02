
import React, { useState, useEffect, useRef } from 'react';
import Estimator from './components/Estimator';
import { Menu, X, Cpu, GraduationCap, Zap, CheckCircle, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

type SectionId = 'home' | 'about' | 'services' | 'coaching' | 'automation' | 'contact';

const SavvyLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <div className={`flex flex-col items-center group cursor-pointer relative py-2 transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
    {/* Prominent Logo Background glow/shadow */}
    <div className="absolute inset-0 bg-[#fc466b]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="flex items-center -space-x-1 relative z-10 filter drop-shadow-[0_4px_12px_rgba(252,70,107,0.5)]">
      <span className="cursive-font text-5xl md:text-7xl text-[#fc466b] transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 group-hover:drop-shadow-[0_0_25px_rgba(252,70,107,0.7)]">
        Savvy
      </span>
      <span className="text-4xl md:text-6xl font-extrabold text-[#fc466b] tracking-tight transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-[0_0_25px_rgba(252,70,107,0.7)] ml-2 leading-none border-b-2 border-transparent group-hover:border-[#fc466b]/40 pb-1">
        IT
      </span>
    </div>
    
    <div className={`mt-[-4px] ml-6 md:ml-8 overflow-hidden transition-all duration-500 relative z-10 ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-90'}`}>
      <span className="text-[9px] md:text-[11px] font-bold tracking-[0.45em] text-[#fc466b] whitespace-nowrap uppercase transition-all duration-500 group-hover:opacity-100 group-hover:tracking-[0.6em] block px-2 border-x border-[#fc466b]/0 group-hover:border-[#fc466b]/30">
        Technology, Made Simple
      </span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [estimateData, setEstimateData] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    coaching: useRef<HTMLElement>(null),
    automation: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const phrases = ["Intelligent", "Strategic", "Empowering", "Human-centered", "Savvy IT"];
  
  // Typing Effect
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

  // Intersection Observer to update activeSection on scroll
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.5,
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 50);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuClosing(false);
      }, 600); // Matches closing animation duration
    } else {
      setIsMenuOpen(true);
    }
  };

  const navigateTo = (id: SectionId) => {
    const element = sectionRefs[id].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) toggleMenu();
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
    { id: 'contact', label: 'Contact', subtitle: 'Nice to meet you' },
  ];

  return (
    <div className={`relative min-h-screen bg-savvy-dark text-white font-sans overflow-hidden ${isMenuOpen ? 'menu-open' : ''} ${isMenuClosing ? 'menu-closing' : ''}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center transition-all duration-500 pointer-events-none ${isScrolled ? 'header-scrolled' : ''}`}>
        <div 
          className="relative z-50 pointer-events-auto transition-transform duration-500 hover:scale-105 active:scale-95"
          onClick={() => navigateTo('home')}
        >
          <SavvyLogo isScrolled={isScrolled} />
        </div>
        
        <button 
          onClick={toggleMenu}
          className={`z-50 p-5 rounded-full border-2 pointer-events-auto transition-all duration-500 focus:outline-none flex items-center justify-center group
            ${isMenuOpen 
              ? 'bg-white text-savvy-dark border-white scale-110 shadow-[0_15px_40px_rgba(255,255,255,0.2)]' 
              : `bg-savvy-dark/80 border-white/20 hover:border-[#fc466b] text-white backdrop-blur-3xl shadow-[0_12px_45px_rgba(0,0,0,0.7)] hover:shadow-[#fc466b]/30 hover:bg-savvy-dark/95 ring-1 ring-white/10 ${isScrolled ? 'scale-90' : 'scale-100'}`}`}
          aria-label="Toggle Menu"
        >
          <div className="relative w-7 h-7">
            <span className={`absolute block h-0.5 w-7 bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1.5'}`}></span>
            <span className={`absolute block h-0.5 w-4 bg-current transition-all duration-300 top-3.5 right-0 ${isMenuOpen ? 'opacity-0' : 'opacity-100 group-hover:w-7'}`}></span>
            <span className={`absolute block h-0.5 w-7 bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5.5'}`}></span>
          </div>
        </button>
      </header>

      {/* Navigation Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.86, 0, 0.07, 1)] 
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className={`absolute inset-0 bg-savvy-dark/98 backdrop-blur-3xl transition-opacity duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Animated Background Orbs */}
        <div className={`absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#fc466b]/20 blur-[180px] rounded-full transition-all duration-1000 ${isMenuOpen ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`}></div>
        <div className={`absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-[#3f5efb]/20 blur-[180px] rounded-full transition-all duration-1000 delay-200 ${isMenuOpen ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`}></div>

        <div className="relative h-full flex flex-col lg:flex-row">
          {/* Menu Items Container */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 md:px-24 py-32 space-y-4 md:space-y-6">
            {menuItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as SectionId)}
                className={`group text-left focus:outline-none menu-item`}
                style={{ 
                  transitionDelay: isMenuOpen ? `${idx * 100 + 200}ms` : '0ms'
                }}
              >
                <span className="block text-xs uppercase tracking-[0.6em] text-gray-500 mb-2 group-hover:text-[#fc466b] transition-colors duration-300 font-bold">
                  {item.subtitle}
                </span>
                <span className={`text-4xl md:text-8xl font-black transition-all duration-500 block leading-none tracking-tighter
                  ${activeSection === item.id ? 'gradient-text translate-x-8 scale-105' : 'hover:translate-x-8 text-white/10 hover:text-white'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          
          {/* Menu Media (Split Slider Style) */}
          <div className="hidden lg:flex w-1/2 h-full overflow-hidden border-l border-white/5 bg-black/20">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`flex-1 h-full bg-cover bg-center transition-all duration-[1.8s] ease-[cubic-bezier(0.19, 1, 0.22, 1)] grayscale opacity-0 hover:grayscale-0 hover:opacity-100 hover:scale-110 border-r border-white/5
                  ${isMenuOpen ? 'translate-y-0 opacity-20' : 'translate-y-full'}`} 
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-${i === 1 ? '1519389950473-47ba0277781c' : i === 2 ? '1486312338219-ce68d2c6f44d' : i === 3 ? '1581091226825-a6a2a5aee158' : '1551434678-e076c223a692'}?auto=format&fit=crop&q=80&w=800')`,
                  transitionDelay: isMenuOpen ? `${i * 120 + 400}ms` : '0ms'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Container with Snapping */}
      <main 
        ref={containerRef}
        onScroll={handleScroll}
        className="snap-container hide-scrollbar"
      >
        {/* HOME SECTION */}
        <section 
          id="home" 
          ref={sectionRefs.home}
          className={`snap-section flex flex-col lg:flex-row relative ${activeSection === 'home' ? 'active' : ''}`}
        >
          <div className="w-full lg:w-1/2 flex items-center px-8 md:px-20 py-20 z-10">
            <div className="max-w-2xl reveal-content">
              <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                Hello! We are <br />
                <span className="gradient-text">{typedText}</span>
                <span className="border-r-4 border-[#fc466b] ml-1 animate-pulse"></span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-xl">
                We fix your tech, optimize your workflow, and teach you to actually understand it. No jargon. No judgment. Just solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button onClick={() => navigateTo('services')} className="px-10 py-5 bg-savvy-primary hover:bg-[#ff5d7e] transition-all font-bold rounded-2xl text-center shadow-[0_20px_60px_rgba(252,70,107,0.4)] transform hover:-translate-y-1 active:translate-y-0">
                  Get an Instant Estimate
                </button>
                <button onClick={() => navigateTo('about')} className="px-10 py-5 border border-white/20 hover:border-white hover:bg-white/5 transition-all font-bold rounded-2xl text-center backdrop-blur-sm">
                  See How We Think
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-1/2 h-full relative overflow-hidden">
            <div className={`absolute inset-0 bg-cover bg-center transition-all duration-[2s] ${activeSection === 'home' ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200')` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-savvy-dark to-transparent"></div>
            </div>
            <div className="absolute bottom-16 left-16 right-16 p-10 bg-savvy-dark/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-3xl transform transition-all duration-700 hover:-translate-y-4 reveal-content">
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
          className={`snap-section px-8 md:px-24 py-32 flex flex-col justify-center ${activeSection === 'about' ? 'active' : ''}`}
        >
          <div className="max-w-5xl mx-auto w-full reveal-content">
            <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">What We Do</span>
            <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tight">Building systems that <br /><span className="gradient-text">empower humans.</span></h2>
            
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
              {[
                { title: "Strategy & Architecture", desc: "Clear roadmaps, system design, and decision-making that prevent expensive mistakes." },
                { title: "Systems & Automation", desc: "Databases, applications, and workflows designed to remove friction—without removing humans." },
                { title: "Migration & Modernization", desc: "Legacy systems untangled, stabilized, and upgraded without burning everything down." },
                { title: "Training & Enablement", desc: "Most tech support leaves you where you started. We believe you should understand your technology." }
              ].map((item, idx) => (
                <div key={idx} className="group hover:translate-x-3 transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#fc466b] transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/5 p-12 lg:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#fc466b]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-3xl md:text-4xl font-black mb-12 relative z-10">How We Think</h3>
              <ul className="space-y-8 relative z-10">
                {[
                  "Technology should make people more capable—not more dependent.",
                  "Systems must work under real-world pressure.",
                  "Tools should be designed for non-technical users.",
                  "Practical training is the core of everything we do."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-6 group">
                    <div className="mt-1 flex-shrink-0 w-11 h-11 rounded-xl bg-[#fc466b]/20 flex items-center justify-center group-hover:bg-[#fc466b] group-hover:text-white transition-all duration-500">
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
          className={`snap-section px-8 md:px-24 py-32 ${activeSection === 'services' ? 'active' : ''}`}
        >
          <div className="max-w-6xl mx-auto reveal-content">
            <div className="text-center mb-20">
              <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Services & Estimation</span>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">We fix what's broken. <br />And <span className="gradient-text">optimize</span> what's not.</h2>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">Get a fast, transparent estimate for your project or issue right now.</p>
            </div>

            <div className="mb-24">
              <Estimator onBook={handleBookService} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { title: "Computer Checkups", desc: "Diagnostics and health scans to keep your hardware running smoothly." },
                { title: "Optimization", desc: "Software cleanup and system tuning to reclaim speed." },
                { title: "Software Management", desc: "Installing, updating, and securing the tools you use daily." },
                { title: "Data Organization", desc: "Cloud storage audits and file management for peace of mind." },
                { title: "Troubleshooting", desc: "Expert fixes for those annoying bugs that won't go away." },
                { title: "Small Biz Consulting", desc: "Tailored IT strategy for modern growing businesses." }
              ].map((s, i) => (
                <div key={i} className="p-10 bg-white/5 rounded-3xl border border-white/5 hover:border-[#fc466b]/50 transition-all hover:bg-white/10 group shadow-lg hover:shadow-[#fc466b]/5">
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-[#fc466b] transition-colors">{s.title}</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section 
          id="contact" 
          ref={sectionRefs.contact}
          className={`snap-section px-8 md:px-24 py-32 flex flex-col justify-center ${activeSection === 'contact' ? 'active' : ''}`}
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-20 items-center reveal-content">
            <div className="lg:w-1/2">
              <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Contact Us</span>
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tight leading-none">Let's make <br />your tech <span className="gradient-text">work.</span></h2>
              
              <div className="space-y-16 mt-16">
                {[
                  { icon: Mail, label: "Email", value: "hello@savvy-it.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-SAVY" },
                  { icon: MapPin, label: "Office", value: "123 Tech Avenue, Suite 400 Silicon Valley, CA" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-10 group">
                    <div className="p-6 bg-white/5 rounded-[2rem] ring-1 ring-white/10 group-hover:bg-[#fc466b] group-hover:text-white transition-all duration-700 shadow-xl group-hover:shadow-[#fc466b]/20">
                      <item.icon className="text-[#fc466b] group-hover:text-white transition-colors" size={32} />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-500 text-xs uppercase tracking-[0.3em] mb-2">{item.label}</h5>
                      <p className="text-white text-2xl font-bold">{item.value}</p>
                    </div>
                  </div>
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
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:border-[#fc466b] focus:bg-white/10 outline-none transition-all font-medium text-lg" placeholder="Your Name" required />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:border-[#fc466b] focus:bg-white/10 outline-none transition-all font-medium text-lg" placeholder="Email Address" required />
                  </div>
                </div>
                <div className="mb-12 space-y-3">
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-2">Message</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 h-64 focus:border-[#fc466b] focus:bg-white/10 outline-none transition-all resize-none font-medium text-lg" 
                    placeholder="Tell us about your tech challenge..."
                    defaultValue={estimateData ? `I'm interested in ${estimateData.service} for ${estimateData.devices} device(s) (Complexity: ${estimateData.complexity}).\n\nEstimated range was: $${estimateData.estimate}\n\n` : ''}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-7 bg-savvy-primary hover:bg-[#ff5d7e] transition-all font-black rounded-3xl text-2xl shadow-[0_25px_60px_rgba(252,70,107,0.4)] transform active:scale-[0.98] tracking-tight">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
