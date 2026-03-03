import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCta?: () => void;
};

const WorkInProgress: React.FC<Props> = ({
  title = 'Coming Soon',
  subtitle = 'This section is under development and will be available shortly.',
  ctaText = 'Go to Dashboard',
  onCta,
}) => {
  const navigate = useNavigate();

  const handleCta = () => {
    if (onCta) return onCta();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-lg">TP</div>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
        <p className="mt-3 text-slate-500">{subtitle}</p>

        <div className="mt-6 flex justify-center gap-3">
          <button onClick={handleCta} className="bg-blue-700 text-white px-4 py-2 rounded-md">{ctaText}</button>
          <button onClick={() => window.location.reload()} className="border rounded-md px-4 py-2">Refresh</button>
        </div>

        <div className="mt-6 text-xs text-slate-400">Work In Progress • Disponible próximamente</div>
      </div>
    </div>
  );
};

export default WorkInProgress;
