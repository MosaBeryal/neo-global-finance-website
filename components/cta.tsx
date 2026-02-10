'use client';

import React from "react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function CTA() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('[v0] Form submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="w-full py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-primary text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {/* Left side - Contact info */}
          <div className="space-y-10 sm:space-y-12 md:space-y-14 animate-slide-in-left opacity-0">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
                Ready to Transform Your Financial Future?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed">
                Get in touch with our team today. We are committed to understanding your unique needs and delivering exceptional results.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-8 sm:space-y-10">
              <div className="flex gap-4 sm:gap-5 hover-lift transition-smooth">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                  <Phone className="text-white/90 transition-transform hover:scale-110" size={28} />
                </div>
                <div>
                  <p className="font-semibold text-base mb-2">Phone</p>
                  <a href="tel:+1234567890" className="text-white/80 hover:text-white transition-colors text-base">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                  <Mail className="text-white/90" size={28} />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base mb-1">Email</p>
                  <a href="mailto:info@neoglobalfinance.com" className="text-white/80 hover:text-accent transition text-sm sm:text-base break-all">
                    info@neoglobalfinance.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                  <MapPin className="text-white/90" size={28} />
                </div>
                <div>
                  <p className="font-semibold text-base mb-2">Address</p>
                  <p className="text-white/80 text-base leading-relaxed">
                    123 Financial Plaza
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-10 sm:p-12 md:p-14 border border-white/20 hover:border-white/30 transition-smooth hover:shadow-lg animate-slide-in-right opacity-0">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-8 sm:mb-10">Send us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
              {submitted && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-white text-sm animate-scale-in">
                  Thank you! Your message has been received. Check your email for confirmation.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/95 mb-2.5">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-base focus-visible:border-white focus-visible:bg-white/15 transition-all rounded-lg"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/95 mb-2.5">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-base focus-visible:border-white focus-visible:bg-white/15 transition-all rounded-lg"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/95 mb-2.5">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-base focus-visible:border-white focus-visible:bg-white/15 transition-all rounded-lg"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/95 mb-2.5">
                  Company
                </label>
                <Input
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-base focus-visible:border-white focus-visible:bg-white/15 transition-all rounded-lg"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/95 mb-2.5">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us about your financial needs..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-base focus-visible:border-white focus-visible:bg-white/15 transition-all rounded-lg resize-none"
                  required
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-white hover:bg-white/90 text-primary font-semibold group transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl">
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
