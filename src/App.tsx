import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PillarsSection } from './components/PillarsSection';
import { EnduranceHubSection } from './components/EnduranceHubSection';
import { FertilitySection } from './components/FertilitySection';
import { AlaCarteSection } from './components/AlaCarteSection';
import { BookingSection } from './components/BookingSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { EnduranceProtocol } from './data/enduranceContent';

export default function App() {
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const [selectionTrigger, setSelectionTrigger] = useState<number>(0);
  const [selectedAlaCarteIds, setSelectedAlaCarteIds] = useState<string[]>([]);
  const [initialSport, setInitialSport] = useState<string>('5K & 10K Road Racing');
  const [initialNotes, setInitialNotes] = useState<string>('');

  const handleSelectPillar = (pillarId: string) => {
    setSelectedPillarId(pillarId);
    setSelectionTrigger((n) => n + 1);
    const scheduleEl = document.getElementById('schedule');
    if (scheduleEl) {
      scheduleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectEnduranceProtocol = (protocol: EnduranceProtocol) => {
    setSelectedPillarId(protocol.suggestedConsultation);
    setSelectionTrigger((n) => n + 1);

    let mappedSport = '5K & 10K Road Racing';
    if (protocol.distanceCategory === 'half-marathon') {
      mappedSport = 'Half Marathon (13.1)';
    } else if (protocol.distanceCategory === 'marathon') {
      mappedSport = 'Full Marathon (26.2) / BQ Prep';
    } else if (protocol.id === 'sprint-triathlon-fundamentals') {
      mappedSport = 'Sprint Triathlon';
    } else if (protocol.distanceCategory === 'triathlon') {
      mappedSport = 'Triathlon (Olympic, 70.3 & Ironman)';
    }

    setInitialSport(mappedSport);
    setInitialNotes(
      `Focus Goal: ${protocol.title}. Strategy focus: ${protocol.keyMetric} (${protocol.metricLabel}).`
    );

    const scheduleEl = document.getElementById('schedule');
    if (scheduleEl) {
      scheduleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFertility = () => {
    setSelectedPillarId('fertility-ivf-optimization');
    setSelectionTrigger((n) => n + 1);
    setInitialSport('Nutrition, Metabolism & Fertility');
    setInitialNotes(
      'Focus: More Than Macros (Nutrition, gut health, metabolic sink, and cellular signaling for fertility & IVF).'
    );
    const scheduleEl = document.getElementById('schedule');
    if (scheduleEl) {
      scheduleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAlaCarte = (id: string) => {
    setSelectedAlaCarteIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleClearAlaCarte = () => {
    setSelectedAlaCarteIds([]);
  };

  const handleProceedAlaCarte = () => {
    setSelectedPillarId('alacarte-three-subject');
    setSelectionTrigger((n) => n + 1);
    const scheduleEl = document.getElementById('schedule');
    if (scheduleEl) {
      scheduleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FF0619] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Strategy Pillars */}
        <PillarsSection onSelectPillar={handleSelectPillar} />

        {/* Searchable Endurance Strategies (5K to Marathon & Triathlon) */}
        <EnduranceHubSection onSelectEnduranceProtocol={handleSelectEnduranceProtocol} />

        {/* Nutrition, Metabolism & Fertility Coaching Section */}
        <FertilitySection onBookFertility={handleBookFertility} />

        {/* À La Carte 3-Subject Strategy Component Menu */}
        <AlaCarteSection
          selectedIds={selectedAlaCarteIds}
          onToggleComponent={handleToggleAlaCarte}
          onClearSelection={handleClearAlaCarte}
          onProceedToBooking={handleProceedAlaCarte}
        />

        {/* Embedded Google Workspace Appointment Schedule & Consult Brief */}
        <BookingSection
          selectedPillarId={selectedPillarId}
          selectionTrigger={selectionTrigger}
          initialSport={initialSport}
          initialNotes={initialNotes}
          selectedAlaCarteIds={selectedAlaCarteIds}
          onRemoveAlaCarte={handleToggleAlaCarte}
        />

        {/* FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
