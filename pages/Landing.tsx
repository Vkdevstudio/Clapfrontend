
import React from 'react';
import { ChevronRight, Clapperboard, Users, Shield, Zap } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 py-20 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <img 
            src="https://picsum.photos/seed/cinema/1920/1080" 
            alt="Cinematic Background" 
            className="w-full h-full object-cover mix-blend-overlay grayscale"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-500 text-sm font-semibold mb-8 border border-red-600/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            NOW IN PUBLIC BETA
          </div>
          
          <h1 className="text-6xl md:text-8xl font-cinematic font-bold mb-6 tracking-tighter leading-none">
            WHERE EVERYTHING IS <span className="text-red-600">UNITED.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Centralized workflows for film productions, talent management, and creative enthusiasts. From first draft to final cut.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-2xl shadow-red-600/20"
            >
              Get Started for Free
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10 backdrop-blur-md">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Cinema</h2>
            <p className="text-neutral-500">Ditch the fragmented tools. CLAP is your all-in-one studio.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Seamless Communication',
                desc: 'Role-based chats and structured discussions for every scene.',
                icon: <Zap className="text-red-500" size={32} />
              },
              {
                title: 'Talent Discovery',
                desc: 'Find verified actors, crew, and technical specialists in seconds.',
                icon: <Users className="text-accent" size={32} />
              },
              {
                title: 'Project Workspace',
                desc: 'Integrated call sheets, task trackers, and versioned media vaults.',
                icon: <Clapperboard className="text-blue-500" size={32} />
              }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors group">
                <div className="mb-6 p-4 rounded-2xl bg-black inline-block group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-24 px-6 md:px-12 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">Built for Creators of All Scales</h2>
            <p className="text-neutral-400 text-lg mb-8">
              Whether you are an independent filmmaker looking for your first lead, or a major production house managing 500+ crew members.
            </p>
            <ul className="space-y-4">
              {[
                'Automated Call Sheet Reminders',
                'Script Versioning & Annotation',
                'Verified Talent Profiles',
                'One-Click Audition Applications'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-200">
                  <Shield size={20} className="text-red-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              src="https://picsum.photos/seed/set/800/600" 
              className="w-full h-full object-cover" 
              alt="Film set" 
            />
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 px-6 border-t border-neutral-800 bg-black text-center">
        <p className="text-neutral-600 text-sm">© 2024 CLAP Film Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
