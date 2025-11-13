import React from 'react';
import { PlusIcon, FileTextIcon, PaletteIcon } from './icons';
import { mockProjects } from '../services/mockData';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-72 bg-[#09090b] border-r border-slate-800 flex-shrink-0 lg:flex flex-col hidden">
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-slate-50">TripGen</h1>
        <button className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-50">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <h2 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent Briefs</h2>
        {mockProjects.map((project) => (
          <a
            key={project.id}
            href="#"
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
              project.id === '1'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <FileTextIcon className="h-5 w-5 mr-3 flex-shrink-0" />
            <div className="flex-1 truncate">
                <p className="font-semibold">{project.name}</p>
                <p className="text-xs text-slate-500">{project.lastUpdated}</p>
            </div>
          </a>
        ))}
      </nav>
      <div className="p-6 mt-auto border-t border-slate-800">
        <button className="w-full flex items-center justify-center bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 border border-slate-700">
            <PaletteIcon className="h-5 w-5 mr-2" />
            Branding Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;