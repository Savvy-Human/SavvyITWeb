
import React, { useState, useEffect, useRef } from 'react';
import Estimator from './components/Estimator';
import { Menu, X, Cpu, GraduationCap, Zap, CheckCircle, Mail, Phone, MapPin, ChevronRight, Monitor, Sparkles, MessageSquare, Send, Brain, Users, Briefcase, Building, ShieldCheck, Rocket, Clock, Headphones, Layers, Smartphone, Settings, BarChart, BookOpen, Target, HeartHandshake } from 'lucide-react';

type SectionId = 'home' | 'about' | 'services' | 'coaching' | 'automation' | 'plans' | 'contact';

const SavvyLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <div className={`flex items-center gap-1.5 md:gap-2 group cursor-pointer relative py-1.5 px-3 md:py-2 md:px-5 rounded-xl transition-all duration-500 bg-[#0f172a] border border-white/5 backdrop-blur-md hover:border-[#fc466b]/30 ${isScrolled ? 'scale-90 shadow-lg' : 'scale-100 shadow-xl'}`}>
    <div className="flex items-center -space-x-1 relative z-10">
      <span className="cursive-font text-xl sm:text-2xl md:text-4xl text-[#fc466b] transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(252,70,107,0.4)]">
        Savvy
      </span>
      <span className="text-lg sm:text-xl md:text-3xl font-black text-[#fc466b] tracking-tight ml-1.5 md:ml-2">
        IT
      </span>
    </div>
  </div>
);

const SchedulingModal = ({ isOpen, onClose, defaultService }: { isOpen: boolean; onClose: () => void; defaultService: string }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-[#161b2e] border border-white/10 w-full max-w-xl rounded-[3rem] p-8 md:p-12 shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={24}/></button>
        <h2 className="text-3xl font-black mb-4">Book a Session</h2>
        <p className="text-gray-400 mb-8">Let us know when you're available for a consultation regarding <span className="text-white font-bold">{defaultService}</span>.</p>
        <form onSubmit={(e) => { e.preventDefault(); alert('Request sent to savvy.human@outlook.com'); onClose(); }} className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#fc466b] text-white" required />
          <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#fc466b] text-white" required />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-2">Preferred Date</label>
              <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#fc466b] text-white" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-2">Preferred Time</label>
              <input type="time" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#fc466b] text-white" required />
            </div>
          </div>
          <button className="w-full py-5 bg-[#fc466b] text-white font-black rounded-2xl hover:bg-[#ff5d7e] transition-all shadow-xl">REQUEST AVAILABILITY</button>
        </form>
      </div>
    </div>
  );
};

const AssessmentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ type: '', industry: '', goal: '' });

  if (!isOpen) return null;

  const handleFinish = () => {
    alert(`Assessment Sent!\nType: ${data.type}\nIndustry: ${data.industry}\nGoal: ${data.goal}\nSent to savvy.human@outlook.com`);
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-[#161b2e] border border-white/10 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={24}/></button>
        
        {step === 1 && (
          <div className="reveal-content active">
            <h2 className="text-3xl font-black mb-6">Who are we training?</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Individual', 'Family', 'Small Business', 'Large Org'].map(t => (
                <button key={t} onClick={() => { setData({...data, type: t}); setStep(2); }} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:border-[#fc466b] hover:bg-white/10 transition-all font-bold text-left group">
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 group-hover:text-[#fc466b]">Tier</div>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="reveal-content active">
            <h2 className="text-3xl font-black mb-6">Select your industry</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['Tech', 'Healthcare', 'Creative', 'Education', 'Retail', 'Service', 'Non-Profit', 'Other'].map(i => (
                <button key={i} onClick={() => { setData({...data, industry: i}); setStep(3); }} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-[#fc466b] hover:bg-white/10 transition-all font-bold text-sm">{i}</button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="reveal-content active">
            <h2 className="text-3xl font-black mb-6">What's the primary goal?</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Security & Privacy', icon: <ShieldCheck size={20}/> },
                { label: 'Productivity', icon: <Zap size={20}/> },
                { label: 'AI Mastery', icon: <Brain size={20}/> },
                { label: 'Basic Literacy', icon: <Smartphone size={20}/> }
              ].map(g => (
                <button key={g.label} onClick={() => { setData({...data, goal: g.label}); setStep(4); }} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:border-[#fc466b] hover:bg-white/10 transition-all font-bold flex flex-col items-center gap-3">
                  <div className="text-[#fc466b]">{g.icon}</div>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="reveal-content active text-center">
            <div className="w-20 h-20 bg-[#fc466b]/20 text-[#fc466b] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <BarChart size={40} />
            </div>
            <h2 className="text-3xl font-black mb-4">Assessment Ready</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">Based on your industry (<span className="text-white">{data.industry}</span>) and focus (<span className="text-white">{data.goal}</span>), we've designed a custom training roadmap for you.</p>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 text-left">
              <div className="flex items-center gap-3 mb-2 text-[#fc466b]">
                <CheckCircle size={18}/>
                <span className="font-black text-sm uppercase tracking-widest">Recommended Module</span>
              </div>
              <p className="text-gray-300 font-medium">Savvy {data.type} Advanced Workshop: {data.goal} for {data.industry} Professionals.</p>
            </div>
            <button onClick={handleFinish} className="w-full py-5 bg-[#fc466b] text-white font-black rounded-2xl hover:bg-[#ff5d7e] transition-all shadow-xl">SEND TO SAVVY HUMAN</button>
          </div>
        )}
      </div>
    </div>
  );
};

const WaysCarousel = ({ onAction }: { onAction: (type: string) => void }) => {
  const [index, setIndex] = useState(0);
  const ways = [
    {
      id: 1,
      icon: <Monitor size={48} />,
      title: "Technical Services",
      cta: "Book a Tech Tune-Up",
      actionType: 'tech',
      description: "Diagnostics, optimization, cleanup, troubleshooting. We make your devices run like they should have from day one.",
      list: ["Computer Checkups", "Performance Optimization", "Software Management", "Data Organization", "Digital Identity Architecture"],
      color: "from-[#4f46e5] to-[#3f5efb]"
    },
    {
      id: 2,
      icon: <GraduationCap size={48} />,
      title: "Coaching & Training",
      cta: "Assess my Training Needs",
      actionType: 'assessment',
      description: "Learn to use your own tech with confidence. Personal sessions, family programs, business training.",
      list: ["1:1 Coaching", "Device Training", "AI Literacy", "Digital Skills", "Privacy Awareness"],
      color: "from-[#fc466b] to-[#f43f5e]"
    },
    {
      id: 3,
      icon: <Zap size={48} />,
      title: "AI & Automation",
      cta: "Schedule a Free Consult",
      actionType: 'consult',
      description: "Set up AI tools, build automated workflows, and finally make technology work for you instead of against you.",
      list: ["AI Tool Setup", "Custom Workflows", "Process Automation", "Script Development", "Smarter System Integration"],
      color: "from-[#3f5efb] to-[#fc466b]"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ways.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 lg:p-12 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fc466b]/30 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3f5efb]/30 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-20 mb-12 text-center reveal-content">
        <span className="text-[#fc466b] uppercase tracking-[0.5em] font-black text-xs mb-3 block">What We Do</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Three ways to get <span className="gradient-text">savvy</span>
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-lg h-[520px]">
        {ways.map((way, i) => (
          <div 
            key={way.id}
            className={`transition-all duration-1000 absolute top-0 left-1/2 -translate-x-1/2 w-full
              ${i === index ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}`}
          >
            <div className="bg-[#161b2e]/80 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-3xl ring-1 ring-white/5">
              <div className={`w-20 h-20 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br ${way.color} shadow-2xl`}>
                {React.cloneElement(way.icon as React.ReactElement<any>, { className: "text-white", size: 40 })}
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{way.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">{way.description}</p>
              <ul className="space-y-3">
                {way.list.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fc466b]"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <div 
                onClick={() => onAction(way.actionType)}
                className="mt-10 flex items-center gap-2 text-[#fc466b] font-bold text-base group/link cursor-pointer"
              >
                <span>{way.cta}</span>
                <ChevronRight className="transition-transform group-hover/link:translate-x-2" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {ways.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? 'w-10 bg-[#fc466b]' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

const GetHelpModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-savvy-dark/80 backdrop-blur-xl transition-opacity duration-500" onClick={onClose}></div>
      <div className="relative bg-savvy-dark border border-white/10 w-full max-w-2xl rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fc466b]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
          <X size={32} />
        </button>
        <h2 className="text-4xl font-black mb-2 tracking-tight">Need Help <span className="gradient-text">Fast?</span></h2>
        <p className="text-gray-400 mb-8 font-medium">We'll get back to you as soon as possible.</p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <a href="mailto:savvy.human@outlook.com" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl transition-all group">
            <div className="p-3 bg-[#fc466b]/20 rounded-xl group-hover:bg-[#fc466b] group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Email Us</span>
              <span className="font-bold text-sm">savvy.human@outlook.com</span>
            </div>
          </a>
          <a href="sms:2179860863" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl transition-all group">
            <div className="p-3 bg-[#3f5efb]/20 rounded-xl group-hover:bg-[#3f5efb] group-hover:text-white transition-all">
              <MessageSquare size={24} />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Send SMS</span>
              <span className="font-bold text-sm">217.986.0863</span>
            </div>
          </a>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert('Help request sent to savvy.human@outlook.com'); onClose(); }}>
          <div className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#fc466b] outline-none transition-all font-bold text-white" required />
            <textarea placeholder="How can we help?" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 h-32 focus:border-[#fc466b] outline-none transition-all font-bold resize-none text-white" required></textarea>
            <button className="w-full py-5 bg-[#fc466b] hover:bg-[#ff5d7e] transition-all font-black rounded-2xl text-lg shadow-[0_15px_30px_rgba(252,70,107,0.3)]">SEND HELP REQUEST</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [schedulingType, setSchedulingType] = useState('General Consultation');
  
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
    plans: useRef<HTMLElement>(null),
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
      }, 600);
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

  const handleCarouselAction = (type: string) => {
    if (type === 'assessment') {
      setIsAssessmentOpen(true);
    } else {
      setSchedulingType(type === 'tech' ? 'Technical Tune-Up' : 'Automation Consultation');
      setIsSchedulingOpen(true);
    }
  };

  const handleBookService = (data: any) => {
    setEstimateData(data);
    navigateTo('contact');
  };

  const menuItems = [
    { id: 'home', label: 'Home', subtitle: 'Welcome' },
    { id: 'about', label: 'About', subtitle: 'What we Do' },
    { id: 'services', label: 'Services', subtitle: 'Support' },
    { id: 'coaching', label: 'Coaching', subtitle: 'Empowerment' },
    { id: 'automation', label: 'Automation', subtitle: 'Intelligence' },
    { id: 'plans', label: 'Continuity', subtitle: 'Assurance' },
    { id: 'contact', label: 'Contact', subtitle: 'Hello' },
  ];

  return (
    <div className={`relative min-h-screen bg-savvy-dark text-white font-sans overflow-hidden ${isMenuOpen ? 'menu-open' : ''} ${isMenuClosing ? 'menu-closing' : ''}`}>
      <GetHelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
      <SchedulingModal isOpen={isSchedulingOpen} onClose={() => setIsSchedulingOpen(false)} defaultService={schedulingType} />
      <AssessmentModal isOpen={isAssessmentOpen} onClose={() => setIsAssessmentOpen(false)} />
      
      <header className={`fixed top-0 left-0 w-full z-50 p-4 md:p-8 flex justify-between items-center transition-all duration-500 pointer-events-none ${isScrolled ? 'header-scrolled' : ''}`}>
        <div 
          className="relative z-50 pointer-events-auto shrink-0"
          onClick={() => navigateTo('home')}
        >
          <SavvyLogo isScrolled={isScrolled} />
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 pointer-events-auto shrink-0">
          <button 
            onClick={() => setIsHelpModalOpen(true)}
            className={`px-3 py-2 sm:px-8 sm:py-3 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-500 bg-white text-black hover:bg-black hover:text-white border-2 border-white/10 shadow-lg active:scale-95 whitespace-nowrap`}
          >
            GET HELP
          </button>
          
          <button 
            onClick={toggleMenu}
            className={`z-50 p-2 md:p-3 rounded-full border border-white/5 pointer-events-auto transition-all duration-500 focus:outline-none flex items-center justify-center group bg-[#0f172a] shadow-xl ${isMenuOpen ? 'bg-white text-savvy-dark scale-110' : `hover:border-[#fc466b] text-white ${isScrolled ? 'scale-90' : 'scale-100'}`}`}
            aria-label="Toggle Menu"
          >
            <div className="relative w-5 h-5 md:w-6 md:h-6">
              <span className={`absolute block h-0.5 w-5 md:w-6 bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 top-2 md:top-2.5' : 'top-1 md:top-1.5'}`}></span>
              <span className={`absolute block h-0.5 w-3 md:w-4 bg-current transition-all duration-300 top-2 md:top-2.5 right-0 ${isMenuOpen ? 'opacity-0' : 'opacity-100 group-hover:w-5 md:group-hover:w-6'}`}></span>
              <span className={`absolute block h-0.5 w-5 md:w-6 bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 top-2 md:top-2.5' : 'top-3 md:top-4'}`}></span>
            </div>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.86, 0, 0.07, 1)] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-savvy-dark/98 backdrop-blur-3xl transition-opacity duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="relative h-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 md:px-24 py-32 space-y-4 md:space-y-6">
            {menuItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as SectionId)}
                className={`group text-left focus:outline-none menu-item`}
                style={{ transitionDelay: isMenuOpen ? `${idx * 100 + 200}ms` : '0ms' }}
              >
                <span className="block text-xs uppercase tracking-[0.6em] text-gray-500 mb-2 group-hover:text-[#fc466b] transition-colors duration-300 font-bold">{item.subtitle}</span>
                <span className={`text-3xl md:text-6xl font-black transition-all duration-500 block leading-none tracking-tighter ${activeSection === item.id ? 'gradient-text translate-x-8 scale-105' : 'hover:translate-x-8 text-white/10 hover:text-white'}`}>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="hidden lg:flex w-1/2 h-full overflow-hidden border-l border-white/5 bg-black/20">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`flex-1 h-full bg-cover bg-center transition-all duration-[1.8s] ease-[cubic-bezier(0.19, 1, 0.22, 1)] grayscale opacity-0 hover:grayscale-0 hover:opacity-100 hover:scale-110 border-r border-white/5 ${isMenuOpen ? 'translate-y-0 opacity-20' : 'translate-y-full'}`} 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-${i === 1 ? '1519389950473-47ba0277781c' : i === 2 ? '1486312338219-ce68d2c6f44d' : i === 3 ? '1581091226825-a6a2a5aee158' : '1551434678-e076c223a692'}?auto=format&fit=crop&q=80&w=800')`, transitionDelay: isMenuOpen ? `${i * 120 + 400}ms` : '0ms' }}
              />
            ))}
          </div>
        </div>
      </div>

      <main ref={containerRef} onScroll={handleScroll} className="snap-container hide-scrollbar">
        {/* HOME SECTION */}
        <section id="home" ref={sectionRefs.home} className={`snap-section flex flex-col lg:flex-row relative ${activeSection === 'home' ? 'active' : ''}`}>
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
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden bg-savvy-dark">
             <WaysCarousel onAction={handleCarouselAction} />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" ref={sectionRefs.about} className={`snap-section px-8 md:px-24 py-32 flex flex-col justify-center ${activeSection === 'about' ? 'active' : ''}`}>
          <div className="max-w-5xl mx-auto w-full reveal-content">
            <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Our Mission</span>
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

            <div className="bg-white/5 p-12 lg:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden group mb-12">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#fc466b]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-3xl md:text-4xl font-black mb-12 relative z-10">How We Think</h3>
              <ul className="space-y-8 relative z-10">
                {["Technology should make people more capable—not more dependent.", "Systems must work under real-world pressure.", "Tools should be designed for non-technical users.", "Practical training is the core of everything we do."].map((text, i) => (
                  <li key={i} className="flex items-start gap-6 group">
                    <div className="mt-1 flex-shrink-0 w-11 h-11 rounded-xl bg-[#fc466b]/20 flex items-center justify-center group-hover:bg-[#fc466b] group-hover:text-white transition-all duration-500"><CheckCircle size={24} /></div>
                    <span className="text-xl text-gray-300 font-medium leading-tight">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#fc466b]/20 to-[#3f5efb]/20 p-12 lg:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <h3 className="text-3xl font-black mb-4">Stay Savvy.</h3>
                <p className="text-gray-300 text-lg">Subscribe to tech tips, security alerts, and exclusive learning events delivered to your inbox.</p>
              </div>
              <form className="flex w-full lg:w-auto gap-3" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to savvy.human@outlook.com'); }}>
                <input type="email" placeholder="Email Address" className="flex-1 lg:w-80 bg-savvy-dark/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-white outline-none transition-all font-bold text-white" required />
                <button type="submit" className="bg-white text-savvy-dark px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform flex items-center gap-2">
                  SUBSCRIBE <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* TECH SERVICES AND SUPPORT SECTION */}
        <section id="services" ref={sectionRefs.services} className={`snap-section px-8 md:px-24 py-32 ${activeSection === 'services' ? 'active' : ''}`}>
          <div className="max-w-6xl mx-auto reveal-content">
            <div className="text-center mb-20">
              <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Tech Services and Support</span>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">We fix what's broken. <br />And <span className="gradient-text">optimize</span> what's not.</h2>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">Get a fast, transparent estimate for your project or issue right now.</p>
            </div>
            <div className="mb-24"><Estimator onBook={handleBookService} /></div>
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

        {/* COACHING SECTION */}
        <section id="coaching" ref={sectionRefs.coaching} className={`snap-section px-8 md:px-24 py-32 flex flex-col justify-center ${activeSection === 'coaching' ? 'active' : ''}`}>
          <div className="max-w-7xl mx-auto w-full reveal-content">
            <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Coaching Services</span>
            <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tight">Master your tools. <br /><span className="gradient-text">Own your digital life.</span></h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[
                { 
                  icon: <Users size={32} />, 
                  title: "1:1 Mentorship", 
                  desc: "Personalized deep-dives into your personal hardware and software. We build confidence through hands-on learning.",
                  focus: ["Smartphone & OS Fluency", "Digital Privacy Hygiene", "Personal Asset Management", "AI Search Mastery"]
                },
                { 
                  icon: <Briefcase size={32} />, 
                  title: "Small Business", 
                  desc: "Equip your team with the modern skills needed to operate efficiently in a remote-first world.",
                  focus: ["Workflow Collaboration", "Security Awareness 101", "CRM & Project Management", "AI Integration Workflows"]
                },
                { 
                  icon: <Building size={32} />, 
                  title: "Enterprise", 
                  desc: "Strategic enablement for leadership and large teams focused on organizational tech resiliency.",
                  focus: ["Exec Tech Concierge", "Scaleable Cyber Literacy", "Digital Transformation", "Compliance Coaching"]
                },
                { 
                  icon: <GraduationCap size={32} />, 
                  title: "Family Heritage", 
                  desc: "Preserving family history and securing digital legacies across generations with expert guidance.",
                  focus: ["Family Photo Archiving", "Estate Access Planning", "Kid-Safe Internet Guard", "Senior Tech Enablement"]
                }
              ].map((group, idx) => (
                <div key={idx} className="bg-[#161b2e]/60 border border-white/5 p-8 rounded-[3.5rem] hover:bg-white/10 hover:-translate-y-4 transition-all duration-700 flex flex-col h-full shadow-2xl group">
                  <div className="mb-8 p-4 w-fit rounded-2xl bg-[#fc466b]/10 text-[#fc466b] group-hover:bg-[#fc466b] group-hover:text-white transition-all shadow-lg">
                    {React.cloneElement(group.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-white transition-colors">{group.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">{group.desc}</p>
                  <ul className="space-y-4 mb-10 border-t border-white/5 pt-8">
                    {group.focus.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-300">
                        <CheckCircle size={14} className="text-[#fc466b]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setIsAssessmentOpen(true)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#fc466b] group-hover:text-white transition-colors">
                    View Course Details <ChevronRight size={14}/>
                  </button>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 flex flex-col items-center text-center">
                <div className="p-5 bg-blue-500/20 text-blue-400 rounded-2xl mb-6"><Target size={32}/></div>
                <h4 className="text-xl font-bold mb-4">Goal-Based Learning</h4>
                <p className="text-gray-400 text-sm">We don't just teach clicks; we teach concepts. Your goals drive our custom-built lesson plans.</p>
              </div>
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 flex flex-col items-center text-center">
                <div className="p-5 bg-green-500/20 text-green-400 rounded-2xl mb-6"><BookOpen size={32}/></div>
                <h4 className="text-xl font-bold mb-4">Practical Curriculum</h4>
                <p className="text-gray-400 text-sm">Real-world scenarios and hands-on exercises ensure that skills stick long after the session ends.</p>
              </div>
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 flex flex-col items-center text-center">
                <div className="p-5 bg-purple-500/20 text-purple-400 rounded-2xl mb-6"><HeartHandshake size={32}/></div>
                <h4 className="text-xl font-bold mb-4">Human-First Approach</h4>
                <p className="text-gray-400 text-sm">Patient, non-judgmental, and jargon-free support. We speak your language, not the computer's.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI & AUTOMATION SECTION */}
        <section id="automation" ref={sectionRefs.automation} className={`snap-section px-8 md:px-24 py-32 flex flex-col justify-center ${activeSection === 'automation' ? 'active' : ''}`}>
          <div className="max-w-7xl mx-auto w-full reveal-content">
            <div className="mb-20">
              <span className="text-[#3f5efb] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Intelligence at Scale</span>
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tight leading-none">Automate the boring. <br /><span className="gradient-text">Focus on the rest.</span></h2>
              <p className="text-2xl text-gray-400 max-w-3xl leading-relaxed">We design and deploy custom AI solutions and automated workflows tailored to your specific needs.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Sparkles />, tier: "Individual", title: "Personal Savvy", features: ["Personalized AI Assistants", "Smart Home Automation", "Automated Budgeting", "Digital Archive Management"] },
                { icon: <Users />, tier: "Family", title: "Family Savvy", features: ["Shared Calendar Automation", "Home Security Orchestration", "Educational AI Tutors", "Family Asset Vaulting"] },
                { icon: <Zap />, tier: "Small Business", title: "Business Savvy", features: ["Customer Support Chatbots", "Automated Invoicing & CRM", "Social Media AI Agents", "Workflow Orchestration"] },
                { icon: <Building />, tier: "Enterprise", title: "Enterprise Savvy", features: ["Custom Model Training", "Multi-Dept Automation", "Security & Compliance AI", "Large Scale Data Pipelines"] }
              ].map((card, idx) => (
                <div key={idx} className="group relative bg-[#161b2e]/60 border border-white/5 p-8 rounded-[3.5rem] hover:bg-white/10 hover:-translate-y-4 transition-all duration-700 flex flex-col h-full shadow-2xl">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-[#fc466b]/20 transition-all"></div>
                  <div className="mb-8 p-4 w-fit rounded-2xl bg-white/5 group-hover:bg-gradient-to-br from-[#fc466b] to-[#3f5efb] group-hover:text-white transition-all text-[#fc466b]">
                    {React.cloneElement(card.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">{card.tier}</span>
                  <h3 className="text-2xl font-black mb-8 tracking-tight group-hover:text-white transition-colors">{card.title}</h3>
                  <ul className="space-y-4 mb-4">
                    {card.features.map((f, i) => (
                      <li key={i} className="text-xs font-bold text-gray-300 flex items-center gap-3">
                        <CheckCircle size={14} className="text-[#fc466b]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SAVVY CONTINUITY SECTION */}
        <section id="plans" ref={sectionRefs.plans} className={`snap-section px-8 md:px-24 py-32 flex flex-col justify-center ${activeSection === 'plans' ? 'active' : ''}`}>
          <div className="max-w-7xl mx-auto w-full reveal-content">
            <div className="text-center mb-20">
              <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Savvy Assurance</span>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Continuity <span className="gradient-text">Plans</span></h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Peace of mind shouldn't be a luxury. Choose a plan that keeps your digital life stabilized and secure with on-call support.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
              {[
                {
                  title: "Base Level 1",
                  price: "99",
                  desc: "Essential protection and priority access for individuals.",
                  includes: ["4 On-Call Remote Sessions / Mo", "Monthly Health Check & Scan", "Security Patch Management", "Email/Chat Support"],
                  alaCarte: 1
                },
                {
                  title: "Pro Level 2",
                  price: "249",
                  desc: "Comprehensive support for power users & small businesses.",
                  includes: ["Unlimited Remote Sessions", "Priority 2hr Response Time", "Quarterly Hardware Audit", "Strategic Tech Roadmap"],
                  alaCarte: 2
                }
              ].map((plan, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-12 rounded-[4rem] hover:border-[#fc466b]/40 transition-all group flex flex-col relative overflow-hidden">
                  <div className="mb-10">
                    <h3 className="text-3xl font-black mb-2">{plan.title}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black tracking-tighter">${plan.price}</span>
                      <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">/mo</span>
                    </div>
                    <p className="text-gray-400 mt-4 font-medium">{plan.desc}</p>
                  </div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300 font-bold">
                        <CheckCircle size={20} className="text-[#fc466b]" />
                        {inc}
                      </li>
                    ))}
                    <li className="p-4 bg-white/5 rounded-2xl border border-dashed border-white/20 text-sm font-black text-center text-[#fc466b] uppercase tracking-widest">
                      + Choose {plan.alaCarte} Ala Carte Service
                    </li>
                  </ul>
                  <button onClick={() => navigateTo('contact')} className="w-full py-5 bg-white text-savvy-dark font-black rounded-3xl hover:bg-[#fc466b] hover:text-white transition-all">
                    SELECT PLAN
                  </button>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto bg-[#161b2e]/60 border border-white/10 p-12 rounded-[3.5rem] relative">
              <div className="flex items-center gap-4 mb-8">
                <Layers className="text-[#fc466b]" size={32} />
                <h4 className="text-2xl font-black">Ala Carte Add-ons</h4>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: <Monitor size={18}/>, name: "Deep OS Cleanup" },
                  { icon: <ShieldCheck size={18}/>, name: "Security Hardening" },
                  { icon: <Settings size={18}/>, name: "Strategy Session" },
                  { icon: <Cpu size={18}/>, name: "Hardware Audit" },
                  { icon: <Brain size={18}/>, name: "AI Workflow Tuning" },
                  { icon: <Smartphone size={18}/>, name: "Mobile Optimization" }
                ].map((opt, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                    <div className="text-[#fc466b]">{opt.icon}</div>
                    <span className="text-xs font-bold text-gray-300">{opt.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" ref={sectionRefs.contact} className={`snap-section px-8 md:px-24 py-32 flex flex-col justify-center ${activeSection === 'contact' ? 'active' : ''}`}>
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-20 items-center reveal-content">
            <div className="lg:w-1/2">
              <span className="text-[#fc466b] uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Contact Us</span>
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tight leading-none">Let's make <br />your tech <span className="gradient-text">work.</span></h2>
              
              <div className="space-y-16 mt-16">
                {[
                  { icon: Mail, label: "Email", value: "savvy.human@outlook.com" },
                  { icon: Phone, label: "Phone", value: "217.986.0863" },
                  { icon: MapPin, label: "Location", value: "Taylorville, IL" }
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
              <form className="bg-white/5 p-12 md:p-20 rounded-[5rem] border border-white/10 shadow-3xl backdrop-blur-3xl relative overflow-hidden ring-1 ring-white/5" onSubmit={(e) => { e.preventDefault(); alert('Message sent to savvy.human@outlook.com'); }}>
                <div className="grid md:grid-cols-2 gap-10 mb-10">
                  <div className="space-y-3"><label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-2 text-gray-400">Name</label><input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:border-[#fc466b] focus:bg-white/10 outline-none transition-all font-medium text-lg text-white" placeholder="Your Name" required /></div>
                  <div className="space-y-3"><label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-2 text-gray-400">Email</label><input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:border-[#fc466b] focus:bg-white/10 outline-none transition-all font-medium text-lg text-white" placeholder="Email Address" required /></div>
                </div>
                <div className="mb-12 space-y-3"><label className="block text-xs font-black text-gray-500 uppercase tracking-widest ml-2 text-gray-400">Message</label><textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 h-64 focus:border-[#fc466b] focus:bg-white/10 outline-none transition-all resize-none font-medium text-lg text-white" placeholder="Tell us about your tech challenge..." defaultValue={estimateData ? `I'm interested in ${estimateData.service} for ${estimateData.devices} device(s) (Complexity: ${estimateData.complexity}).\n\nEstimated range was: $${estimateData.estimate}\n\n` : ''} required></textarea></div>
                <button type="submit" className="w-full py-7 bg-savvy-primary hover:bg-[#ff5d7e] transition-all font-black rounded-3xl text-2xl shadow-[0_25px_60px_rgba(252,70,107,0.4)] transform active:scale-[0.98] tracking-tight">SEND MESSAGE</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
