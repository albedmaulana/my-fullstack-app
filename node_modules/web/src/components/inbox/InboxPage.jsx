import React from 'react';
import Sidebar from '../Sidebar';
import Header from './HeaderAdmin';
import InboxView from './InboxView';
import InboxFooter from './InboxFooter';

const InboxPage = () => {
  return (
    <div className="flex h-screen w-full bg-[#fcf8ff] font-body text-stone-900 overflow-hidden">
      
      {/* 1. Sidebar - Fixed w-72 */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="ml-72 flex-1 flex flex-col h-full min-w-0">
        
        {/* Header - Tetap di posisi atas */}
        <Header />
        
        {/* Area Scrollable Utama 
            Kunci: h-full dan flex-col memastikan area ini memenuhi sisa layar
        */}
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
          
          {/* Konten Inbox 
              flex-1 di sini akan 'memaksa' area konten mengambil ruang sebanyak mungkin,
              sehingga footer di bawahnya akan terdorong ke posisi paling dasar.
          */}
          <div className="flex-1 w-full">
            <InboxView />
          </div>

          {/* Footer - Akan menempel di paling bawah karena flex-1 di atas */}
          <div className="w-full border-t border-stone-100 bg-white/50 backdrop-blur-sm">
            <InboxFooter />
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default InboxPage;