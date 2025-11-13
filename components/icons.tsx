
import React from 'react';

export const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const PaletteIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l5.304-5.304a3.75 3.75 0 00-5.304-5.304l-5.304 5.304a3.75 3.75 0 000 5.304zm-3.12-3.12a.75.75 0 010-1.06l2.122-2.122a.75.75 0 011.06 0l1.06 1.06a.75.75 0 010 1.06l-2.122 2.122a.75.75 0 01-1.06 0l-1.06-1.06z" />
    </svg>
);

export const UploadCloudIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M19.5 12c0-2.625-2.125-4.75-4.75-4.75S10 9.375 10 12s2.125 4.75 4.75 4.75S19.5 14.625 19.5 12z" />
  </svg>
);

export const WandIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082a9.75 9.75 0 018.25 9.664c0 1.343-.326 2.616-.895 3.776-1.372 2.8-4.437 4.6-7.855 4.6a9.75 9.75 0 01-9.75-9.75c0-4.32 2.66-8.018 6.38-9.351" />
  </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const ShareIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.042.583.056M16.5 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM16.5 12v-1.5a2.25 2.25 0 00-2.25-2.25H7.864a2.25 2.25 0 00-2.25 2.25v1.5" />
  </svg>
);
