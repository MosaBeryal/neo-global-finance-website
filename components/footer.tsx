import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white w-full">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <span className="text-primary font-bold text-base">N</span>
              </div>
              <span className="text-base sm:text-lg font-semibold">Neo Global</span>
            </Link>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Your trusted partner in financial success. Professional accountancy and advisory services for global businesses.
            </p>
            <div className="flex gap-4 pt-3">
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-bold text-base sm:text-lg">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="#services" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
                  Tax Planning
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
                  Financial Advisory
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
                  Bookkeeping
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
                  Audit Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-base sm:text-lg">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-base sm:text-lg">Contact</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex gap-2 text-white/70 text-xs sm:text-sm">
                <Phone size={16} className="flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors break-all">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex gap-2 text-white/70 text-xs sm:text-sm">
                <Mail size={16} className="flex-shrink-0 mt-0.5" />
                <a href="mailto:info@neoglobalfinance.com" className="hover:text-white transition-colors break-all">
                  info@neoglobalfinance.com
                </a>
              </li>
              <li className="flex gap-2 text-white/70 text-xs sm:text-sm">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 flex-shrink-0" />
                <span>123 Financial Plaza, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <p className="text-white/60 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Neo Global Finance. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href="#" className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
