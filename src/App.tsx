import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PillarsSection } from './components/PillarsSection';
import { EnduranceHubSection } from './components/EnduranceHubSection';
import { FertilitySection } from './components/FertilitySection';
import { AlaCarteSection } from './components/AlaCarteSection';
import { BookingSection } from './components/BookingSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { UpcomingScheduleModal } from './components/UpcomingScheduleModal';
import { EnduranceProtocol } from './data/enduranceContent';
import {
  initAuth,
  googleSignIn,
  setCachedAccessToken,
} from './services/firebaseAuth';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isUpcomingModalOpen, setIsUpcomingModalOpen] = useState(false);
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const [selectionTrigger, setSelectionTrigger] = useState<number>(0);
  const [selectedAlaCarteIds, setSelectedAlaCarteIds] = useState<string[]>([]);
  const [initialSport, setInitialSport] = useState<string>('5K & 10K Road Racing');
  const [initialNotes, setInitialNotes] = useState<string>('');

  useEffect(() => {
    // Initialize Google Firebase Auth listener
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleAuthSuccess = (user: User, token: string) => {
    setCurrentUser(user);
    setAccessToken(token);
    setCachedAccessToken(token);
  };

  const handleManualSignIn = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        handleAuthSuccess(res.user, res.accessToken);
      }
    } catch (err) {
      console.error('Sign-in error:', err);
    }
  };

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

    // Map distance category to appropriate sport intake label
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
    setInitialNotes(`Focus Goal: ${protocol.title}. Key metric: ${protocol.keyMetric} (${protocol.metricLabel}).`);

    const scheduleEl = document.getElementById('schedule');
    if (scheduleEl) {
      scheduleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFertility = () => {
    setSelectedPillarId('fertility-ivf-optimization');
    setSelectionTrigger((n) => n + 1);
    setInitialSport('Nutrition, Metabolism & Fertility');
    setInitialNotes('Focus: More Than Macros (Nutrition, gut health, metabolic sink, and cellular signaling for fertility & IVF).');
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
      <Navbar
        currentUser={currentUser}
        onOpenUpcoming={() => setIsUpcomingModalOpen(true)}
        onSignInClick={handleManualSignIn}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Consulting Pillars & Biomechanical Lab */}
        <PillarsSection onSelectPillar={handleSelectPillar} />

        {/* Searchable Endurance Hub (5K to Marathon & Triathlon) */}
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

        {/* Interactive Scheduling Form with Google Calendar Integration */}
        <BookingSection
          currentUser={currentUser}
          accessToken={accessToken}
          onAuthSuccess={handleAuthSuccess}
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

      {/* Synced Google Calendar Events Modal */}
      <UpcomingScheduleModal
        isOpen={isUpcomingModalOpen}
        onClose={() => setIsUpcomingModalOpen(false)}
        accessToken={accessToken}
      />
    </div>
  );
}
