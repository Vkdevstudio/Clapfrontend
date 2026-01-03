
import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  accentColor?: string;
}

const TagInput: React.FC<TagInputProps> = ({ 
  label, 
  tags, 
  onChange, 
  placeholder = "Type and press Enter",
  accentColor = "red-500"
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onChange([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
    if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3 group">
      <div className="flex justify-between items-center px-1">
        <label className={`text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] group-focus-within:text-${accentColor} transition-colors`}>{label}</label>
        <span className="text-[8px] font-bold text-neutral-800 uppercase tracking-widest">{tags.length} Active</span>
      </div>
      
      <div className={`flex flex-wrap gap-2 p-4 bg-black/40 border border-white/5 rounded-2xl transition-all focus-within:border-${accentColor}/40 min-h-[64px]`}>
        {tags.map((tag, i) => (
          <span 
            key={i} 
            className={`flex items-center gap-2 px-3 py-1.5 bg-${accentColor}/10 border border-${accentColor}/20 text-${accentColor} text-[10px] font-black uppercase rounded-lg animate-in zoom-in-95 duration-200`}
          >
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:text-white transition-colors">
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-xs font-bold text-white placeholder:text-neutral-800 py-1.5"
        />
      </div>
    </div>
  );
};

export default TagInput;
