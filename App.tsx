
import React, { useState, useEffect, useRef } from 'react';
import Estimator from './components/Estimator';
import { 
  Menu, X, Cpu, GraduationCap, Zap, CheckCircle, 
  Mail, Phone, MapPin, ChevronRight, MessageCircle, 
  Send, User, Quote, Star, Clock, Video, Monitor, 
  ChevronDown, ExternalLink, ArrowRight
} from 'lucide-react';

type SectionId = 'home' | 'about' | 'services' | 'coaching' | 'automation' | 'testimonials' | 'faq' | 'contact';

const SavvyLogo = () => (
  <div className="flex items-center gap-1 group cursor-pointer py-1">
    <div className="flex items-center -space-x-1">
      <span className="cursive-font text-3xl md:text-4xl text-[#fc466b] transition-all duration-500 group-hover:scale-105">
        Savvy
      </span>
      <span className="text-2xl md:text-3xl font-extrabold text-[#fc466b] ml-1 leading-none">
        IT
      </span>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#3f5efb]' : 'text-white hover:text-[#fc466b]'}`}>
          {question}
        </span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#3f5efb]' : 'text-gray-500'}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-400 text-base leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const SiteFooter = ({ navigateTo }: { navigateTo: (id: SectionId) => void }) => (
  <footer className="w-full bg-savvy-dark/50 pt-24 pb-12 px-8 md:px-24 border-t border-white/5" role="contentinfo">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-20">
        <div className="col-span-1 space-y-6">
          <div className="flex items-center gap-1">
            <span className="cursive-font text-3xl text-white">Savvy</span>
            <span className="font-extrabold text-2xl text-white">IT</span>
          </div>
          <p className="text-gray-400 font-medium leading-relaxed text-sm">
            Tech support that fixes, teaches, and empowers. Making technology work for real people.
          </p>
          <div className="space-y-3">
            <a href="tel:2179860863" className="font-bold text-sm flex items-center gap-3 text-white hover:text-[#fc466b] transition-colors">
              <Phone size={14} /> 217.986.0863
            </a>
            <a href="mailto:help@savvyhuman.tech" className="font-bold text-sm flex items-center gap-3 text-white hover:text-[#fc466b] transition-colors break-all">
              <Mail size={14} /> help@savvyhuman.tech
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-8">Services</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-bold">
            <li><button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">Technical Services</button></li>
            <li><button onClick={() => navigateTo('coaching')} className="hover:text-white transition-colors">Coaching & Training</button></li>
            <li><button onClick={() => navigateTo('automation')} className="hover:text-white transition-colors">AI & Automation</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-8">Company</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-bold">
            <li><button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">About</button></li>
            <li><button onClick={() => navigateTo('testimonials')} className="hover:text-white transition-colors">Testimonials</button></li>
            <li><button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">FAQ</button></li>
            <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">Contact</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-8">Get Started</h4>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <p className="text-xs text-gray-400 mb-6 font-bold leading-relaxed">
              Ready to fix your tech issues for good? Book a session now.
            </p>
            <button onClick={() => navigateTo('contact')} className="w-full py-3 bg-[#3f5efb] hover:bg-white hover:text-[#3f5efb] text-white font-black rounded-lg text-xs transition-all uppercase tracking-widest">
              Get Help
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © 2025 Savvy IT Solutions. All rights reserved.
        </p>
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
          Built with expertise. Delivered with care.
        </p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [estimateData, setEstimateData] = useState<any>(null);

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    coaching: useRef<HTMLElement>(null),
    automation: useRef<HTMLElement>(null),
    testimonials: useRef<HTMLElement>(null),
    faq: useRef<HTMLElement>(null),
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

  const navigateTo = (id: SectionId) => {
    const element = sectionRefs[id].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setActiveSection(id);
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
    { id: 'faq', label: 'FAQ', subtitle: 'Common Questions' },
    { id: 'contact', label: 'Contact', subtitle: 'Get Help' },
  ];

  return (
    <div className={`relative min-h-screen bg-savvy-dark text-white font-sans overflow-x-hidden ${isMenuOpen ? 'menu-open' : ''}`}>
      
      {/* Header */}
      <header role="banner" className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-between items-center bg-savvy-dark/80 backdrop-blur-md border-b border-white/5">
        <div onClick={() => navigateTo('home')} className="cursor-pointer">
          <SavvyLogo />
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Services', 'Coaching', 'AI & Automation', 'About'].map((link) => (
            <button 
              key={link} 
              onClick={() => navigateTo(link.toLowerCase().includes('about') ? 'about' : link.toLowerCase().includes('automation') ? 'automation' : link.toLowerCase() as SectionId)}
              className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigateTo('contact')}
            className="px-6 py-2.5 bg-[#3f5efb] hover:bg-[#3249c1] text-white font-bold rounded-lg text-sm transition-all shadow-md focus:ring-4 focus:ring-[#3f5efb]/20 outline-none"
          >
            Get Help
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 text-white hover:bg-white/5 rounded-full transition-all focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Navigation Menu Overlay */}
      <nav className={`fixed inset-0 z-[60] transition-all duration-700 ease-[cubic-bezier(0.86, 0, 0.07, 1)] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-savvy-dark/98 backdrop-blur-3xl"></div>
        <div className="relative h-full flex flex-col justify-center px-10 md:px-24">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white p-4">
            <X size={32} />
          </button>
          <div className="space-y-6">
            {menuItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as SectionId)}
                className="group text-left focus:outline-none menu-item block"
                style={{ transitionDelay: isMenuOpen ? `${idx * 100 + 200}ms` : '0ms' }}
              >
                <span className="block text-xs uppercase tracking-[0.4em] text-gray-500 mb-1 group-hover:text-[#fc466b] font-bold">{item.subtitle}</span>
                <span className="text-4xl md:text-6xl font-black text-white group-hover:text-[#fc466b] transition-colors">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content">
        
        {/* HERO SECTION */}
        <section id="home" ref={sectionRefs.home} className="justify-center px-8 md:px-24 bg-savvy-dark">
          <div className="max-w-7xl mx-auto w-full pt-32">
            <span className="text-[#3f5efb] uppercase tracking-[0.4em] font-bold text-xs mb-6 block">Get Help</span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">
              Let's solve your <br />
              <span className="text-[#3f5efb]">{typedText}</span>
              <span className="inline-block w-1.5 h-12 md:h-20 bg-[#3f5efb] ml-1 animate-pulse"></span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-12 font-medium">
              Book a session, ask a question, or just tell us what's going on. We're real humans who respond quickly and actually want to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => navigateTo('contact')} className="px-10 py-5 bg-[#3f5efb] hover:bg-[#3249c1] text-white font-bold rounded-2xl text-lg shadow-lg shadow-[#3f5efb]/20 transition-all">
                Get Help Now
              </button>
              <button onClick={() => navigateTo('about')} className="px-10 py-5 border-2 border-white/10 hover:border-[#3f5efb] text-white font-bold rounded-2xl text-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" ref={sectionRefs.about} className="bg-white/5 py-32 px-8 md:px-24 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Tech support that <span className="text-[#fc466b]">empowers.</span></h2>
              <p className="text-xl text-gray-400 leading-relaxed font-medium">
                We don't just fix problems; we teach you how to master your digital world. Strategic IT consulting for humans, not machines.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="font-black text-white text-2xl mb-2">99%</h4>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Satisfaction</p>
                </div>
                <div>
                  <h4 className="font-black text-white text-2xl mb-2">2hr</h4>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Avg Response</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-12 rounded-[3rem] shadow-xl border border-white/10">
              <ul className="space-y-8">
                {['Performance Optimization', 'Strategic IT Planning', 'Personal Coaching', 'AI & Workflow Automation'].map((it) => (
                  <li key={it} className="flex items-center gap-6 group cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-[#3f5efb]/10 text-[#3f5efb] flex items-center justify-center group-hover:bg-[#3f5efb] group-hover:text-white transition-all">
                      <CheckCircle size={24} />
                    </div>
                    <span className="text-xl font-bold text-white">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ESTIMATOR SECTION */}
        <section id="services" ref={sectionRefs.services} className="py-32 px-8 md:px-24">
           <div className="max-w-7xl mx-auto">
             <div className="text-center mb-20">
               <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Instant Project Estimates</h2>
               <p className="text-xl text-gray-400 font-medium">Transparent pricing, zero surprises. Estimate your session cost below.</p>
             </div>
             <Estimator onBook={handleBookService} />
           </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" ref={sectionRefs.faq} className="bg-savvy-dark py-32 px-8 md:px-24">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-16">
              <span className="text-[#3f5efb] uppercase tracking-[0.4em] font-bold text-xs mb-4 block">FAQ</span>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Common questions</h2>
            </div>
            <div className="space-y-2">
              <FAQItem 
                question="Do you offer remote support?" 
                answer="Yes! Most tech issues can be resolved quickly via secure remote access and video call sessions." 
              />
              <FAQItem 
                question="What if I'm not tech-savvy at all?" 
                answer="That is exactly what we are for. We speak in plain English and focus on making you comfortable and empowered with your tools." 
              />
              <FAQItem 
                question="How quickly can I get an appointment?" 
                answer="We typically respond within a few hours and can often book a session within 24-48 hours. Priority support is available for emergencies." 
              />
              <FAQItem 
                question="What if you can't fix my problem?" 
                answer="If we determine a problem is beyond our scope or requires specific proprietary hardware tools, we will guide you to the right manufacturer or shop. We believe in being honest with our clients." 
              />
              <FAQItem 
                question="Do you work with Macs and PCs?" 
                answer="Absolutely. We support macOS, Windows, iOS, Android, and everything in between." 
              />
              <FAQItem 
                question="What about business hours?" 
                answer="We are active Monday through Friday, 9 AM to 6 PM Central Time. After-hours support can be scheduled upon request for critical issues." 
              />
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" ref={sectionRefs.contact} className="bg-savvy-dark py-32 px-8 md:px-24 border-t border-white/5" aria-labelledby="contact-heading">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-20">
              <span className="text-[#3f5efb] uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Get Help</span>
              <h2 id="contact-heading" className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
                Let's solve your <br />
                <span className="text-[#3f5efb]">tech problem.</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-medium">
                Book a session, ask a question, or just tell us what's going on. We're real humans who respond quickly and actually want to help.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-16">
              {/* Form Side */}
              <div className="lg:col-span-7">
                <h3 className="text-xl font-black mb-10 uppercase tracking-widest text-white/50">Send us a message</h3>
                <form 
                  className="space-y-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = "mailto:renee.i@savvyhuman.tech?subject=Support Request&body=Inquiry from website";
                    alert('Redirecting to your email client to message renee.i@savvyhuman.tech...');
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Your Name</label>
                      <input type="text" placeholder="Jane Smith" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-[#3f5efb] outline-none transition-all font-bold text-white placeholder:text-white/20" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Email</label>
                      <input type="email" placeholder="jane@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-[#3f5efb] outline-none transition-all font-bold text-white placeholder:text-white/20" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Phone (optional)</label>
                      <input type="text" placeholder="(555) 123-4567" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-[#3f5efb] outline-none transition-all font-bold text-white placeholder:text-white/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">What do you need?</label>
                      <div className="relative">
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-[#3f5efb] outline-none transition-all font-bold text-white appearance-none cursor-pointer">
                          <option className="bg-savvy-dark text-white">Select a service</option>
                          <option className="bg-savvy-dark text-white">Quick Fix / Troubleshooting</option>
                          <option className="bg-savvy-dark text-white">Tune-Up Session</option>
                          <option className="bg-savvy-dark text-white">Personal Coaching</option>
                          <option className="bg-savvy-dark text-white">Automation Setup</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Tell us what's going on</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 h-48 focus:border-[#3f5efb] outline-none transition-all font-bold text-white resize-none placeholder:text-white/20"
                      placeholder="Describe your issue, question, or what you'd like to learn..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-[#3f5efb] hover:bg-[#3249c1] text-white transition-all font-black rounded-xl text-lg shadow-lg flex items-center justify-center gap-3 group">
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-5 space-y-12">
                <div>
                  <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-white/50">Contact Information</h3>
                  <div className="bg-[#3f5efb]/5 border border-[#3f5efb]/10 p-8 rounded-3xl space-y-8">
                    <p className="font-bold text-[#3f5efb] text-sm uppercase tracking-[0.1em]">Need immediate help?</p>
                    <div className="space-y-6">
                      <a href="tel:2179860863" className="flex items-center gap-4 text-2xl font-black text-white hover:text-[#3f5efb] transition-colors group">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#3f5efb] shadow-sm group-hover:scale-110 transition-all border border-white/10"><Phone size={24} /></div> 
                        Call 217.986.0863
                      </a>
                      <a href="mailto:help@savvyhuman.tech" className="flex items-center gap-4 text-xl font-black text-white hover:text-[#3f5efb] transition-colors group break-all">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#3f5efb] shadow-sm group-hover:scale-110 transition-all border border-white/10"><Send size={24} /></div> 
                        help@savvyhuman.tech
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-white/50">What to expect</h3>
                  <ul className="space-y-6">
                    {[
                      { icon: Clock, text: "Response within a few hours (usually faster)" },
                      { icon: Video, text: "Remote sessions via video call or screen share" },
                      { icon: MapPin, text: "In-person available for local clients" },
                      { icon: Monitor, text: "Support for all devices and platforms" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-base font-bold text-gray-400">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/20 border border-white/5"><item.icon size={18} /></div>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                   <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-white/50">Session Types</h3>
                   <div className="bg-white/5 rounded-3xl overflow-hidden divide-y divide-white/5 border border-white/5">
                      {[
                        { name: "Quick Fix", desc: "Single issue troubleshooting or quick question", time: "30-60 min" },
                        { name: "Tune-Up Session", desc: "Diagnostic, cleanup, and optimization", time: "1-2 hours" },
                        { name: "Training Session", desc: "Personalized coaching on your devices or tools", time: "1-2 hours" },
                        { name: "Deep Dive", desc: "Comprehensive audit, multi-issue resolution, or complex setup", time: "2-4 hours" }
                      ].map((type, i) => (
                        <div key={i} className="p-6 flex justify-between items-center group cursor-default hover:bg-white/5 transition-colors">
                          <div className="space-y-1">
                            <p className="font-black text-white text-base">{type.name}</p>
                            <p className="text-xs text-gray-500 font-bold leading-relaxed">{type.desc}</p>
                          </div>
                          <p className="text-[#3f5efb] font-black text-[10px] uppercase tracking-widest whitespace-nowrap bg-[#3f5efb]/10 px-3 py-1 rounded-full">{type.time}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SITE INDEX FOOTER */}
        <SiteFooter navigateTo={navigateTo} />

      </main>
    </div>
  );
};

export default App;
