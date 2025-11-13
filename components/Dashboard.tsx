import React, { useState } from 'react';
import InputArea from './StatCard'; // Repurposed StatCard.tsx as InputArea
import EditorAndPreview from './PendingRepliesTable'; // Repurposed PendingRepliesTable.tsx as EditorAndPreview
import ShareModal from './MessageComposerModal'; // Repurposed
import { Itinerary, Tone } from '../types';
import { generateItineraryJson, refineProseWithTone } from '../services/geminiService';
import { HeroGeometric } from './ui/shape-landing-hero';
import { PlusIcon } from './icons';

const TripBriefGenerator: React.FC = () => {
  const [step, setStep] = useState<'hero' | 'input' | 'edit'>('hero');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [prose, setProse] = useState('');
  const [tone, setTone] = useState<Tone>('Luxury');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleGenerate = async (text: string) => {
    setIsLoading(true);
    try {
      const structuredData = await generateItineraryJson(text);
      setItinerary(structuredData);
      
      const initialProse = await refineProseWithTone(structuredData, tone);
      setProse(initialProse);

      setStep('edit');
    } catch (error) {
      alert(error instanceof Error ? error.message : "An unknown error occurred.");
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToneChange = async (newTone: Tone) => {
    if (!itinerary) return;
    setTone(newTone);
    setIsRefining(true);
    try {
      const newProse = await refineProseWithTone(itinerary, newTone);
      setProse(newProse);
    } catch (error) {
       alert("Failed to refine prose. Please try again.");
    } finally {
      setIsRefining(false);
    }
  };
  
  const handleStartOver = () => {
      setItinerary(null);
      setProse('');
      setStep('input');
  }
  
  const handleNewBrief = () => {
      setItinerary(null);
      setProse('');
      setStep('hero');
  }


  return (
    <main className="flex-1 p-6 md:p-8 lg:p-10 bg-[#030303] text-slate-50 flex flex-col">
       <div className="flex justify-between items-center mb-6 h-10">
            <div>
                 {step !== 'hero' && (
                    <>
                        <h2 className="text-2xl font-bold text-slate-50">
                            {step === 'input' ? 'Create a New Brief' : itinerary?.title || 'Editing Brief'}
                        </h2>
                        <p className="text-sm text-slate-400">
                            {step === 'input' ? 'Start by providing your supplier data.' : 'Edit the generated content below.'}
                        </p>
                    </>
                 )}
            </div>
            {step === 'edit' && (
                <div className="flex items-center space-x-4">
                     <button
                        onClick={handleStartOver}
                        className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
                    >
                        Start Over
                    </button>
                    <button
                        onClick={handleNewBrief}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                    >
                        <PlusIcon className="h-4 w-4 mr-2"/>
                        New Brief
                    </button>
                </div>
            )}
       </div>

      <div className="flex-1 flex items-center justify-center">
        {step === 'hero' && (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full h-[500px] mb-8">
                    <HeroGeometric badge="TripGen AI" title1="Instant Itineraries" title2="From Raw Notes" />
                </div>
                <button
                    onClick={() => setStep('input')}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#030303]"
                >
                    Create Your First Brief
                </button>
            </div>
        )}

        {step === 'input' && (
          <InputArea onGenerate={handleGenerate} isLoading={isLoading} />
        )}

        {step === 'edit' && itinerary && (
          <div className="w-full h-full">
            <EditorAndPreview
              itinerary={itinerary}
              prose={prose}
              onProseChange={setProse}
              tone={tone}
              onToneChange={handleToneChange}
              isRefining={isRefining}
              onShare={() => setIsShareModalOpen(true)}
            />
          </div>
        )}
      </div>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </main>
  );
};

export default TripBriefGenerator;