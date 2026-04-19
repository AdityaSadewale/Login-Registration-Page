import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-auto flex flex-col items-center justify-center space-y-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
      <div className="flex items-center space-x-2 text-sm font-medium tracking-wide">
        <span>Professionally created with</span>
        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
        <span>by</span>
        <span className="text-white font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Aditya Sadewale
        </span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
        &copy; {new Date().getFullYear()} All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
