
import React from 'react';

const AnalyticsWidget: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Analytics</h3>
      <div className="flex justify-around text-center">
        <div>
            <p className="text-2xl font-bold text-slate-800">14</p>
            <p className="text-sm font-medium text-slate-500">Briefs Created</p>
        </div>
        <div>
            <p className="text-2xl font-bold text-slate-800">~2.5 hrs</p>
            <p className="text-sm font-medium text-slate-500">Time Saved</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;
