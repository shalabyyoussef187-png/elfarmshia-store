import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-left text-sm font-medium text-gray-700 hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all duration-200 flex items-center justify-between ${
          isOpen ? "ring-2 ring-teal-500/20 border-teal-400" : ""
        }`}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-scaleIn">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150 flex items-center justify-between ${
                  value === option.value
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check
                    size={16}
                    className="text-teal-600"
                    strokeWidth={2.5}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
