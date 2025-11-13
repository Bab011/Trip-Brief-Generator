import React from 'react';
import { ShareIcon } from './icons';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const shareLink = "https://tripgen.example.com/brief/ab12cd34";

  const handleCopyLink = () => {
      navigator.clipboard.writeText(shareLink).then(() => {
          // A more modern notification could be implemented here
          alert('Link copied to clipboard!');
      });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="p-6">
          <div className="flex items-start">
             <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/10 sm:mx-0 sm:h-10 sm:w-10 border border-indigo-500/20">
                <ShareIcon className="h-6 w-6 text-indigo-400" aria-hidden="true" />
             </div>
             <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-semibold leading-6 text-slate-50">
                  Share Itinerary
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                    Anyone with this link will be able to view the trip brief.
                </p>
             </div>
          </div>
          <div className="mt-4">
            <div className="flex rounded-md shadow-sm">
                <input
                    type="text"
                    readOnly
                    value={shareLink}
                    className="block w-full flex-1 rounded-none rounded-l-md border-slate-700 bg-slate-800 text-slate-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                    type="button"
                    onClick={handleCopyLink}
                    className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-slate-700 bg-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-600"
                >
                    <span>Copy</span>
                </button>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 px-6 py-4 flex justify-end rounded-b-lg border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded-md hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;