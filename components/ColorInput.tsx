"use client";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorInput({
  label,
  value,
  onChange,
}: ColorInputProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/80">{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-10 cursor-pointer rounded border border-white/30 bg-transparent"
      />
    </div>
  );
}
