import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Services from '@/components/services'
import WhyChooseUs from '@/components/why-choose-us'
import CTA from '@/components/cta'

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="w-full">
        <Hero />
        <Services />
        <WhyChooseUs />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
