"use client";

import { useFilters } from "@/context/FilterContext";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.6c0-.9.3-1.5 1.6-1.5H16.5V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8v3h2.4V21h3.1Z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.6 7.4c.5-.3.9-.8 1.1-1.4-.5.3-1.1.5-1.7.6A2.7 2.7 0 0 0 14.4 9c0 .2 0 .4.1.6-2.3-.1-4.3-1.2-5.7-2.9-.2.4-.4.9-.4 1.4 0 .9.5 1.8 1.2 2.3-.4 0-.9-.1-1.2-.4v.1c0 1.3.9 2.4 2.2 2.6-.2.1-.5.1-.8.1-.2 0-.4 0-.5-.1.4 1.1 1.4 1.9 2.7 2A5.4 5.4 0 0 1 5 16.6 7.6 7.6 0 0 0 9.2 18c5 0 7.8-4.2 7.8-7.8v-.4c.5-.4.9-.8 1.3-1.4-.5.2-1 .4-1.7.5Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const { setSelectedCategory } = useFilters();

  const onSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <footer className="bg-[#001f4d] text-white mt-16 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="text-xl font-bold tracking-tight mb-4 text-white">
              Filters
            </h4>
            <div className="flex items-center space-x-4 text-blue-200 text-sm">
              <div>
                
              </div>
              <span
                onClick={() => onSelectCategory("All")}
                className="hover:text-white cursor-pointer font-medium"
              >
                All
              </span>
              <span
                onClick={() => onSelectCategory("Electronics")}
                className="hover:text-white cursor-pointer font-mono tracking-widest text-xs"
              >
                el:e:zronk
              </span>
              <span>&copy; 2024 American</span>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold tracking-tight mb-4 text-white">
              About Us
            </h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold tracking-tight mb-4 text-white">
              Follow Us
            </h4>
            <div className="flex items-center space-x-3">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-sm"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-400 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-sm"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-sm"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
}
