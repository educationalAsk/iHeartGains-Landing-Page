import React from 'react';
import { User } from 'firebase/auth';
import { Calendar, Heart, LogOut } from 'lucide-react';
import { logoutGoogle } from '../services/firebaseAuth';

interface NavbarProps {
  currentUser: User | null;
  onOpenUpcoming: () => void;
  onSignInClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenUpcoming,
  onSignInClick,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#000000]/90 border-b border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#050505] border border-[#FF0619] flex items-center justify-center transition-colors group-hover:border-[#00FFFF]">
            <Heart className="w-4 h-4 text-[#FF0619] fill-[#FF0619]" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-[#FFFFFF] font-['Space_Grotesk']">
            iHeart<span className="text-[#FF0619]">Gains</span>
            <span className="text-[#A0FF00]">.com</span>
          </span>
        </button>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#CCCCCC]">
          <button
            onClick={() => scrollTo('pillars')}
            className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            Strategy
          </button>
          <button
            onClick={() => scrollTo('endurance-hub')}
            className="hover:text-[#00FFFF] transition-colors cursor-pointer"
          >
            5K to Marathon
          </button>
          <button
            onClick={() => scrollTo('fertility')}
            className="hover:text-[#A0FF00] transition-colors cursor-pointer"
          >
            IVF &amp; Fertility
          </button>
          <button
            onClick={() => scrollTo('alacarte')}
            className="hover:text-[#FF0619] transition-colors cursor-pointer"
          >
            À La Carte
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-[#050505] border border-[#333333] rounded-lg py-1.5 px-2.5">
              <span className="hidden sm:inline text-xs font-medium text-[#FFFFFF] max-w-[110px] truncate">
                {currentUser.displayName || currentUser.email}
              </span>
              <button
                onClick={onOpenUpcoming}
                className="flex items-center gap-1 text-xs font-semibold text-[#00FFFF] hover:text-[#A0FF00] cursor-pointer"
                title="View synced Google Calendar sessions"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Sessions</span>
              </button>
              <button
                onClick={() => logoutGoogle()}
                className="text-[#CCCCCC] hover:text-[#FF0619] p-0.5 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onSignInClick}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#CCCCCC] hover:text-[#FFFFFF] bg-[#050505] border border-[#333333] hover:border-[#00FFFF] rounded-lg px-3 py-2 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#00FFFF]" />
              <span>Sync Google Calendar</span>
            </button>
          )}

          <button
            onClick={() => scrollTo('schedule')}
            className="text-xs sm:text-sm font-bold bg-[#FF0619] hover:bg-[#e00516] text-[#FFFFFF] px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Book Session
          </button>
        </div>
      </div>
    </header>
  );
};
