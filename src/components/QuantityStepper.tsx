"use client";

export default function QuantityStepper({ value, onMinus, onPlus }: { value: number; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="inline-flex items-center rounded-2xl border border-blue-200 bg-blue-50 p-1.5 dark-soft dark-border">
      <button type="button" onClick={onMinus} className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xl font-black text-blue-700 shadow-sm hover:bg-blue-700 hover:text-white dark-surface">
        −
      </button>
      <span className="w-12 text-center font-black text-blue-800 dark-text">{value}</span>
      <button type="button" onClick={onPlus} className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-xl font-black text-white shadow-sm hover:bg-blue-800">
        +
      </button>
    </div>
  );
}
