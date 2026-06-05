import AdvantageSection from "@/components/AdvantageSection/AdvantageSection";
import AppDownloadCTA from "@/components/AppDownloadCTA/AppDownloadCTA";
import BookingSteps from "@/components/BookingSteps/BookingSteps";
import FAQSection from "@/components/FAQSection/FAQSection";
import HeroSection from "@/components/HeroSectionComponent/HeroSectionComponent";
import HostingCTA from "@/components/HostingCTA/HostingCTA";
import LuxuryCollection from "@/components/LuxuryCollection/LuxuryCollection";
import NewsletterSection from "@/components/NewsletterSection/NewsletterSection";
import OffersSection from "@/components/OffersSection/OffersSection";
import PopularAreas from "@/components/PopularAreas/PopularAreas";
import PropertySection from "@/components/PropertySection/PropertySection";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import StatsSection from "@/components/StatsSection/StatsSection";
import TrendingSection from "@/components/TrendingSection/TrendingSection";


export default function Home() {
  return (
    <div>
     <HeroSection/>
     <PropertySection/>
     <PopularAreas/>
     <AdvantageSection/>
     <LuxuryCollection/>
     <TrendingSection />
      <ReviewSection />
      <BookingSteps />
      <HostingCTA />
      <OffersSection/>
      <AppDownloadCTA/>
      <FAQSection />
      <NewsletterSection />
      <StatsSection />
    </div>
  );
}
