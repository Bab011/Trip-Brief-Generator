import React, { useState } from 'react';
import { WandIcon, UploadCloudIcon } from './icons';

interface InputAreaProps {
  onGenerate: (text: string) => void;
  isLoading: boolean;
}

const sampleData = `Supplier: Classic Vacations
Offer: Italian Riviera Holiday
Dates: October 5-12, 2024
Destination: Portofino & Cinque Terre, Italy
Package includes:
- 7 nights accommodation at Hotel Splendido, A Belmond Hotel
- Private airport transfers from Genoa (GOA)
- Daily buffet breakfast
- A full-day private boat tour to Cinque Terre
- A pesto making class in a traditional Genoese home
Price: $5,000 USD per person based on double occupancy.
Not included: International flights, travel insurance, meals other than breakfast, and gratuities.`;

const InputArea: React.FC<InputAreaProps> = ({ onGenerate, isLoading }) => {
  const [text, setText] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleGenerateClick = () => {
    onGenerate(text);
  };
  
  const handleUseSample = () => {
    setText(sampleData);
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-8">
      <div 
        className={`relative w-full p-8 border rounded-xl transition-all duration-300 ${isDragOver ? 'border-indigo-500/80 bg-indigo-500/10 shadow-[0_0_30px_0_rgba(132,144,246,0.2)]' : 'border-slate-800 bg-slate-900/50'}`}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={() => setIsDragOver(false)}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-slate-800/70 border border-slate-700">
                <UploadCloudIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-slate-50">Upload or Paste Supplier Data</h3>
            <p className="mt-1 text-sm text-slate-400">Drag & drop a PDF, paste an email, or type notes below.</p>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your supplier email, notes, or PDF content here..."
          className="mt-6 block w-full h-48 p-4 text-sm border-slate-700 bg-slate-800/60 rounded-lg resize-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-200 placeholder:text-slate-500"
        />
      </div>
      <div className="mt-6 flex items-center space-x-4">
        <button
          onClick={handleGenerateClick}
          disabled={isLoading || !text}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#030303] disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-colors"
        >
          <WandIcon className="h-5 w-5 mr-2"/>
          {isLoading ? 'Generating...' : 'Generate Brief'}
        </button>
        <button
          onClick={handleUseSample}
          className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          Use Sample Data
        </button>
      </div>
    </div>
  );
};

export default InputArea;