import { Navbar } from "@/app/components/Navbar";
import { HeroSection } from "@/app/components/HeroSection";
import { AboutSection } from "@/app/components/AboutSection";
import { SkillsSection } from "@/app/components/SkillsSection";
import { ExperienceSection } from "@/app/components/ExperienceSection";
import { CertificationsSection } from "@/app/components/CertificationsSection";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { StatisticsSection } from "@/app/components/StatisticsSection";
import { FeedbackSection } from "@/app/components/FeedbackSection";
import { TestimonialsSlider } from "@/app/components/TestimonialsSlider";
import { ContactSection } from "@/app/components/ContactSection";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-bg text-primary-light scroll-smooth">
      <Navbar />


      <div className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary-accent/20 via-transparent to-transparent blur-3xl" />

        <section id="home">
          <HeroSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="experience">
          <ExperienceSection />
        </section>

        <section id="certifications">
          <CertificationsSection />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="statistics">
          <StatisticsSection />
        </section>

        <section id="feedback">
          <FeedbackSection />
        </section>

        <section id="testimonials">
          <TestimonialsSlider />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </div>

      <Footer />
    </main>
  );
}

