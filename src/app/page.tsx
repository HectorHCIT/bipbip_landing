import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import FeatureGrid from "@/components/sections/feature-grid";
import AppDownload from "@/components/sections/app-download";
import Partners from "@/components/sections/partners";
import Rewards from "@/components/sections/rewards";
import HelpContact from "@/components/sections/help-contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <FeatureGrid />
        <AppDownload />
        <Partners />
        <Rewards />
        <HelpContact />
      </main>
      <Footer />
    </>
  );
}
