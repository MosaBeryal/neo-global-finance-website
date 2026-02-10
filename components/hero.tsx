import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Premium gradient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
        <div className="inline-block animate-fade-in-down opacity-0">
          <span className="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-accent/8 text-primary text-xs sm:text-sm font-medium rounded-full border border-accent/40 tracking-wide hover-scale">
            Trusted Financial Partners
          </span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary leading-tight tracking-tight text-balance animate-fade-in-up opacity-0 animate-delay-100">
          Your Global <span className="text-accent block sm:inline">Financial</span> Partner
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-foreground/65 max-w-3xl mx-auto leading-relaxed font-light px-2 animate-fade-in-up opacity-0 animate-delay-200">
          Expert accountancy services, strategic tax planning, and comprehensive financial advisory for forward-thinking businesses worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-8 sm:pt-10 px-2 animate-fade-in-up opacity-0 animate-delay-300">
          <Button size="lg" className="bg-primary hover:bg-primary/85 text-white rounded-full group font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 px-8 py-3 text-base">
            Schedule Consultation
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary/8 rounded-full bg-transparent font-medium transition-all duration-300 hover:-translate-y-1 px-8 py-3 text-base"
          >
            Learn More
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 pt-12 sm:pt-16 md:pt-20 px-2 animate-fade-in-up opacity-0 animate-delay-400">
          <div className="space-y-3 p-4 sm:p-6 bg-white/40 rounded-xl backdrop-blur-sm border border-accent/20 hover-lift transition-smooth">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent">500+</p>
            <p className="text-sm sm:text-base text-foreground/70 font-light">Active Clients</p>
          </div>
          <div className="space-y-3 p-4 sm:p-6 bg-white/40 rounded-xl backdrop-blur-sm border border-accent/20 hover-lift transition-smooth hover:border-accent/40">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent">20+</p>
            <p className="text-sm sm:text-base text-foreground/70 font-light">Years Experience</p>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-3 p-4 sm:p-6 bg-white/40 rounded-xl backdrop-blur-sm border border-accent/20 hover-lift transition-smooth hover:border-accent/40">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent">50M+</p>
            <p className="text-sm sm:text-base text-foreground/70 font-light">Assets Managed</p>
          </div>
        </div>
      </div>
    </section>
  )
}
