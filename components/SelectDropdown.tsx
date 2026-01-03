
import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
  group?: string;
}

interface SelectDropdownProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
  className?: string;
  groupBy?: boolean;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  value,
  onChange,
  placeholder = "Select an option",
  options,
  disabled = false,
  className = "",
  groupBy = false,
}) => {
  const groupedOptions: Record<string, Option[]> = groupBy
    ? options.reduce((acc, curr) => {
        const group = curr.group || "Others";
        if (!acc[group]) acc[group] = [];
        acc[group].push(curr);
        return acc;
      }, {} as Record<string, Option[]>)
    : { All: options };

  return (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger
        className={`w-full flex justify-between items-center rounded-xl bg-white/10 border border-white/30 text-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all ${className}`}
        aria-label="Select option"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="bg-[#111111] text-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10 w-[var(--radix-select-trigger-width)] max-h-60 overflow-y-auto purple-scrollbar z-[9999]"
          position="popper"
          side="bottom"          
          align="start"         
          sideOffset={4}        
        >
          {Object.keys(groupedOptions).map((group) => (
            <Select.Group key={group}>
              {groupBy && (
                <Select.Label className="text-white/30 px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-white/5">
                  {group}
                </Select.Label>
              )}
              <Select.Viewport>
                {groupedOptions[group].map((opt) => (
                  <Select.Item
                    key={opt.value}
                    value={opt.value}
                    className="cursor-pointer select-none px-4 py-3 text-sm font-medium outline-none hover:bg-red-600/20 data-[highlighted]:bg-red-600/20 transition-colors flex justify-between items-center"
                  >
                    <Select.ItemText>{opt.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check className="w-4 h-4 text-red-500" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Group>
          ))}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectDropdown;
