"use client";

import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { ContactSection } from "./ContactSection";
import { TestimonialSection } from "./Testimonial";

export const HomeContent = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Portfolio Content: Layout and Background are now handled by (portfolio)/layout.jsx */}
      <section>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialSection />
        <ContactSection />
      </section>
    </div>
  );
};
