import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0">
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <path
              d="M2 38 L20 5 L38 38 Z"
              className="fill-[#9DC44D]"
            />
            <rect
              x="16"
              y="20"
              width="8"
              height="8"
              className="fill-[#333333]"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-none text-[#333333]">MED</span>
        <span className="text-xl font-bold leading-none text-[#333333]">IMMO-SECRET</span>
      </div>
    </Link>
  );
}