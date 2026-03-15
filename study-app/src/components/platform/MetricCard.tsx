import { cn } from '@/lib/math-platform/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  tone?: 'neutral' | 'accent' | 'success' | 'warning';
  helper?: string;
}

const toneMap = {
  neutral: 'from-white to-slate-50 text-slate-950',
  accent: 'from-sky-50 to-cyan-50 text-slate-950',
  success: 'from-emerald-50 to-lime-50 text-slate-950',
  warning: 'from-amber-50 to-orange-50 text-slate-950',
};

export default function MetricCard({ label, value, tone = 'neutral', helper }: MetricCardProps) {
  return (
    <div className={cn('rounded-[1.75rem] border border-slate-200 bg-gradient-to-br p-5 shadow-sm shadow-slate-200/60', toneMap[tone])}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      {helper ? <p className="mt-2 text-sm text-slate-600">{helper}</p> : null}
    </div>
  );
}
