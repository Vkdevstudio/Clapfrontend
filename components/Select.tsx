import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ options, className = "", ...props }) => {
  return (
    <div className="relative group">
      <select
        {...props}
        className={`w-full bg-neutral-900 border border-white/10 rounded-2xl px-6 py-5 font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all appearance-none cursor-pointer group-hover:border-white/20 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-neutral-950 text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 group-hover:text-white transition-colors">
        <ChevronDown size={18} />
      </div>
    </div>
  );
};

export default Select;