import { Card } from '@/components/ui/card'
import { BarChart3, TrendingUp, FileText, Users, Shield, PieChart } from 'lucide-react'

const services = [
  {
    icon: BarChart3,
    title: 'Tax Planning & Optimization',
    description:
      'Strategic tax solutions designed to minimize liabilities while maximizing efficiency. Our experts ensure full compliance with regulations.',
  },
  {
    icon: TrendingUp,
    title: 'Financial Advisory',
    description:
      'Comprehensive financial guidance to drive growth and profitability. From expansion to investment strategy, we guide every decision.',
  },
  {
    icon: FileText,
    title: 'Bookkeeping & Accounting',
    description:
      'Accurate financial records and reporting. We maintain meticulous documentation ensuring transparency and regulatory compliance.',
  },
  {
    icon: Users,
    title: 'Payroll Management',
    description:
      'Complete payroll processing and HR compliance. We handle all aspects so you can focus on your business core operations.',
  },
  {
    icon: Shield,
    title: 'Audit & Assurance',
    description:
      'Independent audits and assurance services to verify financial integrity and enhance stakeholder confidence in your operations.',
  },
  {
    icon: PieChart,
    title: 'Business Consulting',
    description:
      'Strategic business insights and operational optimization. We help you identify opportunities and strengthen your competitive position.',
  },
]

export default function Services() {
  return (
    <section id="services" className="w-full py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24 space-y-6 sm:space-y-8 animate-fade-in-down opacity-0">
          <span className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-accent/8 text-primary text-xs sm:text-sm font-medium rounded-full border border-accent/40 tracking-wide hover-scale transition-smooth">
            Our Services
          </span>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-primary leading-tight">
            Comprehensive Financial Solutions
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto px-2 font-light">
            We provide a complete suite of accounting and financial services tailored to your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 md:gap-10">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <Card
                key={idx}
                className={`p-8 sm:p-9 md:p-10 bg-white border border-border hover:border-accent/50 transition-smooth hover:shadow-2xl hover:-translate-y-2 group cursor-pointer rounded-xl animate-fade-in-up opacity-0`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/8 rounded-xl flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-accent/15 transition-all duration-300">
                  <Icon className="text-primary group-hover:text-accent transition-colors duration-300" size={28} />
                </div>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-4 leading-tight">{service.title}</h3>
                <p className="text-base sm:text-base text-foreground/70 leading-relaxed font-light">{service.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
