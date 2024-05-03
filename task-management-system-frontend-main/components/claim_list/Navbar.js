"use client";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from "react";
import SignOut from './Signout';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () =>{
    Cookies.remove('authToken');
    <SignOut/>
    router.replace("/login");
    
  }

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
          <div className="flex items-center">
            <button onClick={handleLogout} className="text-white ml-4">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
