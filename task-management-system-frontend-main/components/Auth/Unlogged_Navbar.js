"use client";
import React from "react";


const Unlogged_Navbar = () => {
  return (
    <>
      <nav className="bg-orange-400 mb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="text-white">
                  Task Management System
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Unlogged_Navbar;
