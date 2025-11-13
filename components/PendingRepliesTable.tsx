import React from 'react';
import { Itinerary, Tone } from '../types';
import { DownloadIcon, ShareIcon } from './icons';

interface EditorAndPreviewProps {
  itinerary: Itinerary;
  prose: string;
  onProseChange: (newProse: string) => void;
  tone: Tone;
  onToneChange: (newTone: Tone) => void;
  isRefining: boolean;
  onShare: () => void;
}

const ToneSelector: React.FC<{ selectedTone: Tone; onToneChange: (tone: Tone) => void; disabled: boolean; }> = ({ selectedTone, onToneChange, disabled }) => {
  const tones: Tone[] = ['Luxury', 'Adventure', 'Family'];
  return (
    <div>
      <label className="text-sm font-medium text-slate-300">Adjust Tone</label>
      <fieldset className="mt-2">
        <legend className="sr-only">Notification method</legend>
        <div className="flex space-x-2 rounded-md bg-slate-800/60 p-1 border border-slate-700">
          {tones.map((tone) => (
            <button
              key={tone}
              onClick={() => onToneChange(tone)}
              disabled={disabled}
              className={`w-full px-3 py-1 text-sm font-medium rounded transition-all ${
                selectedTone === tone
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              } disabled:opacity-50 disabled:hover:bg-transparent`}
            >
              {tone}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
};


const EditorAndPreview: React.FC<EditorAndPreviewProps> = ({ itinerary, prose, onProseChange, tone, onToneChange, isRefining, onShare }) => {

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const previewContent = document.getElementById('preview-content')?.innerHTML;
    
    // Using Tailwind CDN is simpler for print styles than parsing stylesheets
    const tailwindCDN = '<script src="https://cdn.tailwindcss.com"><\/script>';
    
    printWindow?.document.write(`<html><head><title>${itinerary.title}</title>${tailwindCDN}</head><body class="p-8">${previewContent}</body></html>`);
    printWindow?.document.close();
    printWindow?.focus();
    setTimeout(() => {
        printWindow?.print();
    }, 500);
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Editor Panel */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 flex flex-col">
        <h2 className="text-xl font-bold text-slate-50">Editor</h2>
        <p className="text-sm text-slate-400 mb-6">Refine the generated content and adjust the tone.</p>
        
        <ToneSelector selectedTone={tone} onToneChange={onToneChange} disabled={isRefining} />

        <div className="mt-4 flex-1 flex flex-col">
            <label htmlFor="prose-editor" className="text-sm font-medium text-slate-300">Itinerary Summary</label>
            <div className="relative flex-1">
                 <textarea
                    id="prose-editor"
                    value={prose}
                    onChange={(e) => onProseChange(e.target.value)}
                    className="mt-1 block w-full h-full p-3 border-slate-700 bg-slate-800/60 text-slate-200 rounded-md resize-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={8}
                />
                {isRefining && <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center rounded-md"><p className="text-sm font-medium text-slate-300">Refining tone...</p></div>}
            </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg flex flex-col">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
             <div>
                <h2 className="text-xl font-bold text-slate-50">Live Preview</h2>
                <p className="text-sm text-slate-400">View the client-ready brief.</p>
            </div>
            <div className="flex space-x-2">
                 <button onClick={onShare} className="p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-50">
                    <ShareIcon className="h-5 w-5" />
                </button>
                 <button onClick={handlePrint} className="p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-50">
                    <DownloadIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
        <div className="p-4 bg-slate-800/30 overflow-y-auto flex-1">
            <div id="preview-content" className="p-8 bg-white rounded-md shadow-lg mx-auto max-w-2xl">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{itinerary.title}</h1>
                        <p className="text-lg text-indigo-600 font-semibold">{itinerary.destination} | {itinerary.dates}</p>
                    </div>
                     <div className="text-2xl font-bold text-slate-400 bg-slate-100 p-3 rounded-md flex-shrink-0">LOGO</div>
                </div>

                <p className="text-slate-700 mb-8 leading-relaxed">{prose}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div>
                        <h3 className="text-base font-semibold text-green-700 mb-2">What's Included</h3>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                            {itinerary.inclusions.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-red-700 mb-2">What's Not Included</h3>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                            {itinerary.exclusions.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-slate-200 text-right">
                    <p className="text-sm text-slate-500">Total Cost</p>
                    <p className="text-2xl font-bold text-slate-900">{itinerary.cost}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditorAndPreview;