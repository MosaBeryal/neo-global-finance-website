import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

const reasons = [
  {
    title: 'Expert Team',
    description: 'Certified CPAs and financial professionals with decades of combined experience across industries.',
  },
  {
    title: 'Client-Centric Approach',
    description: 'We understand your unique challenges and create personalized solutions that drive real results.',
  },
  {
    title: 'Proactive Strategy',
    description: 'Rather than reactive accounting, we provide forward-thinking strategies to optimize your finances.',
  },
  {
    title: 'Technology-Driven',
    description: 'We leverage cutting-edge accounting software and tools for efficiency and accuracy.',
  },
  {
    title: 'Transparent Communication',
    description: 'Clear, jargon-free explanations ensure you understand your financial position at all times.',
  },
  {
    title: 'Global Perspective',
    description: 'Experience serving multinational businesses with expertise in international tax and compliance.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="w-full py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24 space-y-6 sm:space-y-8">
          <span className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-accent/8 text-primary text-xs sm:text-sm font-medium rounded-full border border-accent/40 tracking-wide">
            Why Choose Us
          </span>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-primary leading-tight">
            Why Neo Global Finance
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto px-2 font-light">
            We are dedicated to becoming your trusted partner in financial success.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 md:gap-10 mb-16 sm:mb-20 md:mb-24">
          {reasons.map((reason, idx) => (
            <Card
              key={idx}
              className="p-8 sm:p-9 md:p-10 bg-white border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-2xl group cursor-pointer rounded-xl"
            >
              <div className="flex gap-5">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle2 className="text-primary group-hover:text-accent group-hover:scale-110 transition-all duration-300" size={32} />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-3 leading-tight">{reason.title}</h3>
                  <p className="text-base sm:text-base text-foreground/70 leading-relaxed font-light">{reason.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom testimonial section */}
        <div className="bg-white rounded-2xl p-10 sm:p-12 md:p-16 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 italic leading-relaxed px-2 font-light">
              {"Neo Global Finance has transformed our financial management. Their strategic insights and proactive approach have saved us significant costs while improving our overall financial health."}
            </p>
            <div className="pt-8 border-t border-border/40">
              <p className="font-semibold text-primary text-lg">John Mitchell</p>
              <p className="text-sm text-foreground/60 font-light">CEO, Global Tech Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
