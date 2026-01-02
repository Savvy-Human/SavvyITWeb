
import React, { useState, useEffect } from 'react';
// Added ChevronRight to imports
import { Minus, Plus, ChevronRight } from 'lucide-react';

const pricingRules = {
  services: {
    checkup: { name: "Diagnostics / Checkup", base: 100, perDevice: 25, minimum: 99 },
    cleanup: { name: "Cleanup & Optimization", base: 150, perDevice: 40, minimum: 150 },
    data: { name: "Data Cleanup / Migration", base: 200, perDevice: 50, minimum: 250 },
    business: { name: "Small Business Consulting", base: 350, perDevice: 100, minimum: 450 },
  },
  complexityModifiers: {
    1: 1,      // Basic
    2: 1.4,    // Standard
    3: 2.1     // Complex
  }
};

const complexityLabels: Record<number, string> = {
  1: "Basic",
  2: "Standard",
  3: "Complex"
};

interface EstimatorProps {
  onBook: (data: any) => void;
}

const Estimator: React.FC<EstimatorProps> = ({ onBook }) => {
  const [service, setService] = useState('checkup');
  const [complexity, setComplexity] = useState(2); // Default to Standard (2)
  const [devices, setDevices] = useState(1);
  const [range, setRange] = useState({ low: 0, high: 0 });

  useEffect(() => {
    const calculate = () => {
      const s = (pricingRules.services as any)[service];
      const modifier = (pricingRules.complexityModifiers as any)[complexity];
      
      let basePrice = s.base + (devices * s.perDevice);
      basePrice *= modifier;
      
      if (basePrice < s.minimum) basePrice = s.minimum;
      
      setRange({
        low: Math.round(basePrice * 0.9),
        high: Math.round(basePrice * 1.2)
      });
    };
    
    calculate();
  }, [service, complexity, devices]);

  const incrementDevices = () => setDevices(prev => Math.min(prev + 1, 50));
  const decrementDevices = () => setDevices(prev => Math.max(prev - 1, 1));

  return (
    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 md:p-16 rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-500 hover:border-white/20">
      <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-1000 rotate-12">
        <svg width="300" height="300" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M50 0 L50 100 M0 50 L100 50" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mb-16 relative z-10">
        <div className="space-y-6">
          <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-[0.3em] ml-1">1. Select Service</label>
          <div className="relative group/select">
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-savvy-primary outline-none transition-all appearance-none cursor-pointer text-lg font-bold hover:bg-white/10"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {Object.entries(pricingRules.services).map(([key, value]) => (
                <option key={key} value={key} className="bg-savvy-dark">{value.name}</option>
              ))}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <ChevronRight className="rotate-90" size={20} />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-[0.3em] ml-1">
            2. Complexity: <span className="text-savvy-primary ml-1">{complexityLabels[complexity]}</span>
          </label>
          <div className="px-2 pt-4">
            <input 
              type="range" 
              min="1" 
              max="3" 
              step="1"
              value={complexity}
              onChange={(e) => setComplexity(parseInt(e.target.value))}
              className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-savvy-primary"
            />
            <div className="flex justify-between mt-4 text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">
              <span>Basic</span>
              <span>Standard</span>
              <span>Complex</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-[0.3em] ml-1">3. Device Count</label>
          <div className="flex items-center gap-6 bg-white/5 rounded-2xl p-2 border border-white/10">
            <button 
              onClick={decrementDevices}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-savvy-primary text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              disabled={devices <= 1}
            >
              <Minus size={20} />
            </button>
            <div className="flex-1 text-center text-3xl font-black">
              {devices}
            </div>
            <button 
              onClick={incrementDevices}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-savvy-primary text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              disabled={devices >= 50}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-white/10 relative z-10">
        <div className="w-full md:w-auto text-center md:text-left">
          <span className="block text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-3">Estimated Investment</span>
          <div className="text-5xl lg:text-7xl font-black tracking-tighter">
            <span className="gradient-text">${range.low} <span className="text-white/20 font-light mx-2">—</span> ${range.high}</span>
          </div>
        </div>
        
        <button 
          onClick={() => onBook({ 
            service: (pricingRules.services as any)[service].name, 
            complexity: complexityLabels[complexity], 
            devices, 
            estimate: `${range.low}-${range.high}` 
          })}
          className="w-full md:w-auto px-16 py-7 bg-savvy-primary hover:bg-savvy-primary/80 transition-all font-black rounded-3xl text-2xl shadow-[0_20px_50px_rgba(99,114,235,0.4)] transform hover:-translate-y-2 active:translate-y-0"
        >
          Book This Project
        </button>
      </div>
      
      <div className="mt-12 flex items-center gap-3 text-sm text-gray-500 font-medium">
        <div className="w-1.5 h-1.5 rounded-full bg-savvy-primary animate-pulse"></div>
        <span>Final quote provided after an initial deep-dive diagnostic.</span>
      </div>
    </div>
  );
};

export default Estimator;
