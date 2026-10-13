/** Decorative vector character for the portfolio's hero. Pure SVG: fast, accessible and crisp. */
export function HeroIllustration() {
  return (
    <div className="hero-figure" aria-hidden="true">
      <svg viewBox="0 0 410 560" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hood" x1="115" y1="150" x2="318" y2="345" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6F68"/><stop offset=".55" stopColor="#D94352"/><stop offset="1" stopColor="#B92F45"/></linearGradient>
          <linearGradient id="pants" x1="164" y1="322" x2="293" y2="495" gradientUnits="userSpaceOnUse"><stop stopColor="#5169BD"/><stop offset="1" stopColor="#253C8E"/></linearGradient>
          <linearGradient id="skin" x1="177" y1="65" x2="269" y2="181" gradientUnits="userSpaceOnUse"><stop stopColor="#DA9770"/><stop offset=".6" stopColor="#B97857"/><stop offset="1" stopColor="#915436"/></linearGradient>
          <linearGradient id="face" x1="192" y1="71" x2="256" y2="173" gradientUnits="userSpaceOnUse"><stop stopColor="#E3A380"/><stop offset="1" stopColor="#B8734D"/></linearGradient>
          <linearGradient id="sneaker" x1="160" y1="495" x2="215" y2="531" gradientUnits="userSpaceOnUse"><stop stopColor="#EF635B"/><stop offset="1" stopColor="#B43041"/></linearGradient>
          <filter id="characterShadow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="13"/></filter>
          <filter id="softDrop" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="2" dy="6" stdDeviation="7" floodColor="#59637B" floodOpacity=".18"/></filter>
        </defs>
        <ellipse cx="221" cy="529" rx="120" ry="16" fill="#68768E" opacity=".2" filter="url(#characterShadow)"/>
        <g filter="url(#softDrop)">
          {/* Legs */}
          <path d="M147 319c-1 55 9 109 15 173l43 2 14-112 15 111 43-4c9-65 13-112 7-166l-137-4Z" fill="url(#pants)"/>
          <path d="M168 359c6 39 10 82 11 125M253 363c8 41 10 76 8 116" stroke="#7E8FD8" strokeWidth="7" strokeLinecap="round" opacity=".5"/>
          <path d="M210 326c-6 25 1 51 6 71" stroke="#1A2D6E" strokeWidth="5" opacity=".28"/>
          {/* Socks */}
          <path d="M164 477h40l-1 32h-40zM238 476h39l1 32h-39z" fill="#F9FAFB"/>
          <path d="M163 484h41M163 494h41M239 486h39M239 496h39" stroke="#262C36" strokeWidth="6"/>
          {/* Shoes */}
          <path d="M161 502c-16 1-23 13-40 17-10 2-14 9-10 17 4 7 68 9 87 2 13-5 11-22-2-32l-35-4Z" fill="url(#sneaker)"/>
          <path d="M111 531c14 5 71 5 95-1" stroke="#FFF" strokeWidth="10" strokeLinecap="round"/>
          <path d="m151 510 19 11m-8-17 19 12" stroke="#FFF3EA" strokeWidth="4" strokeLinecap="round"/>
          <path d="M244 503c14-3 26 11 38 16 12 4 24 10 19 19-6 10-73 9-85 2-9-6-5-21 7-32l21-5Z" fill="url(#sneaker)"/>
          <path d="M215 536c19 7 74 5 88-2" stroke="#FFF" strokeWidth="9" strokeLinecap="round"/>
          <path d="m249 509-15 13m26-8-17 13" stroke="#FFF3EA" strokeWidth="4" strokeLinecap="round"/>
          {/* Hoodie upper body */}
          <path d="M172 155c-33 9-49 21-56 46-13 49-1 93 10 129 45 18 127 22 184-1 12-58 12-101-6-140-13-26-41-34-65-38l-67 4Z" fill="url(#hood)"/>
          <path d="M145 196c-13 51-7 103 3 131M293 202c6 53 7 94-3 122" stroke="#FF9B87" strokeWidth="9" strokeLinecap="round" opacity=".38"/>
          <path d="M146 325c36 9 106 14 156-1" stroke="#AE3345" strokeWidth="12" strokeLinecap="round"/>
          <path d="M168 255c15 12 69 16 83 7" stroke="#AC3545" strokeWidth="3" opacity=".55"/>
          {/* hood and neck */}
          <path d="M170 157c-5 7-15 21-15 39 15 15 32 25 59 33l30-1c24-9 41-20 53-35-9-21-27-34-48-39l-79 3Z" fill="#C83E4B"/>
          <path d="M187 147v29c13 16 38 25 58 2v-33h-58Z" fill="url(#skin)"/>
          <path d="M163 182c5 18 30 35 58 39M286 184c-9 17-27 30-47 37" stroke="#FF887A" strokeWidth="10" strokeLinecap="round"/>
          <path d="M211 214v43m27-40-3 41" stroke="#FDF1E9" strokeWidth="5" strokeLinecap="round"/>
          <circle cx="210" cy="257" r="4" fill="#FFF6F0"/><circle cx="235" cy="259" r="4" fill="#FFF6F0"/>
          {/* Face and ears */}
          <path d="M181 84c5-35 28-50 61-46 33 3 54 27 47 66l-10 42c-6 29-25 49-53 50-25 0-43-14-51-40l-8-42c-4-15 0-24 14-30Z" fill="url(#face)"/>
          <path d="M179 117c-17-9-21 15-11 28 6 8 12 8 16 5M279 116c15-9 19 16 11 27-4 7-10 7-15 5" fill="#BD7D5C"/>
          <path d="M176 105c-2-23-5-34 0-50 9-29 42-43 73-36 18 3 32 13 40 28 9 15 6 36-2 57l-9 8-6-34c-26 6-64 2-86-6l-10 33Z" fill="#252633"/>
          <path d="M176 55c16-25 50-29 74-22 22 6 31 18 34 29" stroke="#33313B" strokeWidth="18" strokeLinecap="round"/>
          <path d="M194 106c8-6 16-6 23-2M240 103c7-5 15-5 23-1" stroke="#3A2925" strokeWidth="5" strokeLinecap="round"/>
          <ellipse cx="207" cy="117" rx="4" ry="5" fill="#261E1D"/><ellipse cx="252" cy="116" rx="4" ry="5" fill="#261E1D"/>
          <circle cx="209" cy="115" r="1.5" fill="white"/><circle cx="254" cy="114" r="1.5" fill="white"/>
          <path d="M227 121c-3 10-6 19-4 23 5 3 10 4 14 0" stroke="#995C43" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M213 159c10 9 27 9 38-2" stroke="#783F3B" strokeWidth="3.8" strokeLinecap="round"/>
          <path d="M191 142c-4 5-7 11-6 17M267 142c4 6 5 12 4 16" stroke="#F4B08B" strokeWidth="5" strokeLinecap="round" opacity=".55"/>
          {/* crossed arms, intentionally in foreground */}
          <path d="M121 206c-12 29-13 64 12 82 19 12 64 6 102-13l-19-29-57 12 5-35-43-17Z" fill="#D7474F"/>
          <path d="M305 210c13 32 7 62-14 80-22 18-83 5-122-15l20-31 75 16-3-35 44-15Z" fill="url(#hood)"/>
          <path d="M216 249c20-3 36-1 49 7 9 6 11 14 4 19-7 5-18 2-27 0l-28 4-11-17 13-13Z" fill="#D38B66"/>
          <path d="M163 248c-15 1-23 5-32 13-8 7-6 17 4 19 8 2 17-3 25-7l26 8 12-18-35-15Z" fill="#C78766"/>
          <path d="M124 217c-6 22-3 37 9 53M296 223c3 17 0 37-8 52" stroke="#F67869" strokeWidth="8" opacity=".6" strokeLinecap="round"/>
          <path d="M151 279c20 9 41 13 57 14M240 293c20 2 38-4 52-13" stroke="#A93244" strokeWidth="3" opacity=".4"/>
        </g>
      </svg>
      <div className="hero-figure-bubble">WEB · APPS · DESIGN<span>Created with purpose ✳</span></div>
    </div>
  );
}
