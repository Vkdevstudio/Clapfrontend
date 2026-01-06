import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  Package, 
  Settings, 
  DollarSign, 
  CheckCircle,
  Zap,
  Camera,
  ShieldCheck,
  Plus
} from 'lucide-react';
import Select from '../components/Select.tsx';

const NewService: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Equipment Rental',
    description: '',
    price: '',
    unit: 'day',
    specs: [''],
    image: null as string | null
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  const handleFinish = () => {
    navigate('/my-services');
  };

  const addSpec = () => setFormData({...formData, specs: [...formData.specs, '']});
  const updateSpec = (index: number, value: string) => {
    const newSpecs = [...formData.specs];
    newSpecs[index] = value;
    setFormData({...formData, specs: newSpecs});
  };

  const steps = [
    { id: 1, label: 'Identity', icon: <Package size={20} /> },
    { id: 2, label: 'Technicals', icon: <Settings size={20} /> },
    { id: 3, label: 'Pricing', icon: <DollarSign size={20} /> },
    { id: 4, label: 'Launch', icon: <Zap size={20} /> }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-center mb-16 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-900 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
              step >= s.id ? 'bg-red-600 border-red-500 text-white shadow-2xl shadow-red-600/30' : 'bg-neutral-900 border-white/5 text-neutral-600'
            }`}>
              {step > s.id ? <CheckCircle size={24} /> : s.icon}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
              step >= s.id ? 'text-white' : 'text-neutral-700'
            }`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 shadow-3xl min-h-[550px] flex flex-col">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-5xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Asset Identity</h2>
              <p className="text-neutral-500 font-medium">How should production leads find this service?</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Service or Equipment Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., ARRI ALEXA MINI LF PACKAGE"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xl font-cinematic text-white outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder:opacity-20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Category</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Equipment Rental', 'Studio Space', 'Post Production', 'Technical Crew'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setFormData({...formData, category: cat})}
                      className={`py-5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        formData.category === cat ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-black/20 border-white/5 text-neutral-600 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-5xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Commercial Scale</h2>
              <p className="text-neutral-500 font-medium">Define your standard rental or service rates.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Base Rate (₹)</label>
                <div className="relative">
                   <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                   <input 
                    type="text" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="45,000"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-2xl font-cinematic text-white outline-none focus:ring-2 focus:ring-red-600 transition-all"
                   />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Billing Unit</label>
                <Select 
                  value={formData.unit}
                  onChange={e => setFormData({...formData, unit: e.target.value})}
                  options={[
                    { label: 'PER DAY', value: 'day' },
                    { label: 'PER WEEK', value: 'week' },
                    { label: 'PER 8H SHIFT', value: 'shift' },
                    { label: 'PER PROJECT', value: 'project' }
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-auto pt-12 flex gap-4">
          {step > 1 && (
            <button onClick={handleBack} className="px-10 py-5 bg-neutral-800 text-white font-black rounded-2xl text-[10px] uppercase transition-all">Back</button>
          )}
          {step < 4 ? (
            <button onClick={handleNext} disabled={step === 1 && !formData.name} className="flex-1 px-10 py-5 bg-red-600 text-white font-black rounded-2xl text-[10px] uppercase shadow-xl flex items-center justify-center gap-3">Continue <ChevronRight size={18} /></button>
          ) : (
            <button onClick={handleFinish} className="flex-1 px-10 py-5 bg-white text-black font-black rounded-2xl text-[11px] uppercase shadow-xl flex items-center justify-center gap-3">LIST ASSET LIVE <Zap size={18} /></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewService;