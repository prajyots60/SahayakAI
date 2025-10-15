import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import Story from "@/components/landing/Story";
import TrustScore from "@/components/landing/TrustScore";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#edf9f1] via-white to-[#f1fbf5] text-slate-900">
      <Navbar />
      <main className="pt-24 space-y-24 lg:space-y-32">
        <HeroSection />
        <Story />
        <TrustScore />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
