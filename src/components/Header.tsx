'use client'

import React from 'react'
import Image from 'next/image'
import { FiSearch, FiBell } from 'react-icons/fi'
import { ChevronDown } from 'lucide-react'

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/90 to-transparent px-6 py-4 flex items-center justify-between">
      {/* Left: Logo & Nav */}
      <div className="flex items-center space-x-6">
        <Image
          src="/NetflixLogo.svg"
          alt="Netflix Logo"
          width={100}
          height={30}
          className="w-auto h-6 object-contain"
        />
        <nav className="hidden md:flex space-x-5 text-sm text-white">
          <a href="#" className="font-semibold hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">TV Shows</a>
          <a href="#" className="hover:text-gray-300">Movies</a>
          <a href="#" className="hover:text-gray-300">New & Popular</a>
          <a href="#" className="hover:text-gray-300">My List</a>
          <a href="#" className="hover:text-gray-300">Browse by Languages</a>
        </nav>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-5 text-white">
        <FiSearch className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <span className="text-sm hover:text-gray-300 cursor-pointer">Kids</span>
        <FiBell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <div className="flex items-center space-x-1 cursor-pointer">
          <Image
            src="/Avatar.svg"
            alt="Profile"
            width={32}
            height={32}
            className="rounded"
          />
          <ChevronDown size={16} className="text-white" />
        </div>
      </div>
    </header>
  )
}

export default Header
