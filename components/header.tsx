'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/98 backdrop-blur-lg border-b border-border/40 transition-smooth">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group flex-shrink-0 hover-scale transition-smooth">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
              <span className="text-white font-bold text-base sm:text-lg">N</span>
            </div>
            <span className="text-base sm:text-lg font-semibold text-primary hidden sm:inline whitespace-nowrap tracking-tight">Neo Global</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <Link href="#services">
              <Button variant="ghost" className="text-foreground/80 hover:text-primary font-medium text-sm lg:text-base transition-smooth">
                Services
              </Button>
            </Link>
            <Link href="#why-us">
              <Button variant="ghost" className="text-foreground/80 hover:text-primary font-medium text-sm lg:text-base transition-smooth">
                Why Us
              </Button>
            </Link>
            <Link href="#contact">
              <Button variant="ghost" className="text-foreground/80 hover:text-primary font-medium text-sm lg:text-base transition-smooth">
                Contact
              </Button>
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block flex-shrink-0">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm lg:text-base transition-smooth shadow-sm hover:shadow-md hover:scale-105">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-5 space-y-2 border-t border-border/40 pt-4 animate-in fade-in slide-in-from-top-2">
            <Link href="#services" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200">
                Services
              </Button>
            </Link>
            <Link href="#why-us" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200">
                Why Us
              </Button>
            </Link>
            <Link href="#contact" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200">
                Contact
              </Button>
            </Link>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all duration-300 shadow-sm">
              Get Started
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}
