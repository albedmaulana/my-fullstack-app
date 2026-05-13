import React from 'react';
import Sidebar from '../Sidebar'; // Naik satu level ke folder components
import StatistikContent from './StatistikContent';
import StatistikFooter from './StatistikFooter';

const StatistikAdmin = () => {
  return (
    <div className="min-h-screen bg-[#fcf8ff] flex">
      {/* Sidebar tetap fixed di kiri */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-72 min-h-screen flex flex-col">
        <div className="p-8 flex-grow">
          <StatistikContent />
        </div>
        <StatistikFooter />
      </main>
    </div>
  );
};

export default StatistikAdmin;