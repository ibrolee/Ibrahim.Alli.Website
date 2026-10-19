import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Gamepad2, Search, SlidersHorizontal, Trophy } from "lucide-react";
import css from "../gaming.css?url";

type GameStatus = "Playing now" | "Played" | "Want to play";
type Game = { title: string; platform: string; genre: string; status: GameStatus; note: string; year: string; appId: string };

const games: Game[] = [
  { title: "Onimusha", platform: "ROG Ally", genre: "Action · Adventure", status: "Playing now", note: "Samurai action, puzzles, and demon-slaying.", year: "Classic", appId: "761600" },
  { title: "EA SPORTS FC", platform: "ROG Ally · PC", genre: "Sports · Football", status: "Playing now", note: "Football, matches, and squad building.", year: "Series", appId: "3405690" },
  { title: "Days Gone", platform: "PC", genre: "Action · Open world", status: "Played", note: "A personal favourite for its world, survival, and story.", year: "2019", appId: "1259420" },
  { title: "Marvel's Spider-Man Remastered", platform: "PC", genre: "Action · Open world", status: "Played", note: "Swinging through the city with a great superhero story.", year: "2022", appId: "1817070" },
  { title: "Red Dead Redemption 2", platform: "PC", genre: "Action · Open world", status: "Played", note: "A richly detailed western and an unforgettable journey.", year: "2018", appId: "1174180" },
  { title: "The Last of Us Part I", platform: "PC", genre: "Action · Story", status: "Played", note: "A tense, character-driven survival story.", year: "2022", appId: "1888930" },
  { title: "The Last of Us Part II", platform: "PlayStation", genre: "Action · Story", status: "Played", note: "An intense, emotionally driven continuation.", year: "2020", appId: "2531310" },
  { title: "Detroit: Become Human", platform: "PC", genre: "Interactive drama", status: "Played", note: "Choices, consequences, and branching narratives.", year: "2018", appId: "1222140" },
  { title: "Grand Theft Auto V", platform: "PC", genre: "Action · Open world", status: "Played", note: "A chaotic open world with three playable leads.", year: "2013", appId: "271590" },
  { title: "Sleeping Dogs: Definitive Edition", platform: "PC", genre: "Action · Open world", status: "Played", note: "An undercover crime drama with satisfying hand-to-hand combat.", year: "2014", appId: "307690" },
  { title: "God of War", platform: "PC", genre: "Action · Story", status: "Played", note: "Mythology, powerful combat, and a father-son journey.", year: "2018", appId: "1593500" },
  { title: "Ghost of Tsushima Director's Cut", platform: "PlayStation · PC", genre: "Action · Adventure", status: "Played", note: "A cinematic samurai adventure across a beautiful island.", year: "2020", appId: "2215430" },
  { title: "Horizon Zero Dawn Remastered", platform: "PC", genre: "Action · RPG", status: "Want to play", note: "A mysterious world, machine creatures, and a story to uncover.", year: "2024", appId: "2561580" },
  { title: "Horizon Forbidden West", platform: "PC", genre: "Action · RPG", status: "Want to play", note: "A bigger adventure through a stunning post-apocalyptic world.", year: "2022", appId: "2420110" },
  { title: "Cyberpunk 2077", platform: "PC · ROG Ally", genre: "RPG · Open world", status: "Want to play", note: "Explore Night City and its branching stories.", year: "2020", appId: "1091500" },
  { title: "Uncharted: Legacy of Thieves Collection", platform: "PC · PlayStation", genre: "Action · Adventure", status: "Want to play", note: "Two cinematic treasure-hunting adventures.", year: "2022", appId: "1659420" },
  { title: "Far Cry 6", platform: "PC · ROG Ally", genre: "Action · Open world", status: "Want to play", note: "Take on a dictatorship in a large open world.", year: "2021", appId: "2369390" },
  { title: "Assassin's Creed Origins", platform: "PC · ROG Ally", genre: "Action · Adventure", status: "Want to play", note: "Explore ancient Egypt in a story-led open world.", year: "2017", appId: "582160" },
  { title: "Mafia: Definitive Edition", platform: "PC", genre: "Action · Crime", status: "Want to play", note: "A cinematic gangster story set in a period city.", year: "2020", appId: "1030840" },
  { title: "Marvel's Guardians of the Galaxy", platform: "PC", genre: "Action · Story", status: "Want to play", note: "A character-focused space adventure with humour.", year: "2021", appId: "1088850" },
  { title: "Batman: Arkham Knight", platform: "PC", genre: "Action · Adventure", status: "Want to play", note: "A dark superhero story across Gotham City.", year: "2015", appId: "208650" },
];

const statusOptions = ["All games", "Playing now", "Played", "Want to play"] as const;
const steamArt = (appId: string) => `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`;

export const Route = createFileRoute("/gaming")({
  head: () => ({
    meta: [
      { title: "Gaming — Ibrahim Alli" },
      { name: "description", content: "A personal gaming profile by Ibrahim Alli: games played, currently playing, and next on the list." },
      { property: "og:title", content: "Gaming — Ibrahim Alli" },
      { property: "og:description", content: "One player. Too many worlds to explore." },
    ],
    links: [{ rel: "stylesheet", href: css }],
  }),
  component: GamingPage,
});

function GamingPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statusOptions)[number]>("All games");
  const [platform, setPlatform] = useState("All platforms");
  const platforms = ["All platforms", ...Array.from(new Set(games.flatMap((game) => game.platform.split(" · "))))];
  const filteredGames = useMemo(() => games.filter((game) => {
    const matchesQuery = `${game.title} ${game.genre} ${game.platform}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "All games" || game.status === status;
    const matchesPlatform = platform === "All platforms" || game.platform.split(" · ").includes(platform);
    return matchesQuery && matchesStatus && matchesPlatform;
  }), [query, status, platform]);
  const playingCount = games.filter((game) => game.status === "Playing now").length;
  const playedCount = games.filter((game) => game.status === "Played").length;
  const wishlistCount = games.filter((game) => game.status === "Want to play").length;

  return (
    <main className="gaming-page">
      <section className="gaming-hero">
        <img className="gaming-hero-image" src={steamArt("1259420")} alt="" fetchPriority="high" />
        <div className="gaming-hero-shade" />
        <div className="gaming-hero-grid" aria-hidden="true" />
        <div className="gaming-hero-inner">
          <p className="gaming-eyebrow"><Gamepad2 size={15} /> IBRAHIM ALLI <span>/</span> PLAYER PROFILE</p>
          <p className="gaming-kicker">MY SAVE FILE · MY STORY</p>
          <h1>Press start<span>.</span><br /><em>Stay awhile.</em></h1>
          <p className="gaming-intro">The games I've played, the worlds I'm in right now, and the adventures still waiting for me.</p>
          <a className="gaming-hero-link" href="#library">Explore my library <ArrowDownRight size={17} /></a>
          <div className="gaming-hero-index"><span>PLAYER</span><strong>01</strong><span>EST. ALWAYS</span></div>
        </div>
        <div className="gaming-hero-bottom"><span>STORY FIRST. ALWAYS.</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="gaming-content" id="library">
        <div className="gaming-section-heading">
          <div><p className="gaming-eyebrow">THE PERSONAL ARCHIVE</p><h2>My game library<span>.</span></h2></div>
          <p className="gaming-section-note">One player. Too many worlds to explore.</p>
        </div>
        <div className="gaming-stats" aria-label="Library summary">
          <div><span className="gaming-stat-number">{games.length.toString().padStart(2, "0")}</span><span className="gaming-stat-label">Games collected</span></div>
          <div><span className="gaming-stat-number">{playingCount.toString().padStart(2, "0")}</span><span className="gaming-stat-label">Playing now</span></div>
          <div><span className="gaming-stat-number">{playedCount.toString().padStart(2, "0")}</span><span className="gaming-stat-label">Played & loved</span></div>
          <div><span className="gaming-stat-number">{wishlistCount.toString().padStart(2, "0")}</span><span className="gaming-stat-label">On my wishlist</span></div>
        </div>
        <div className="gaming-toolbar">
          <label className="gaming-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, genres, platforms…" /></label>
          <label className="gaming-select"><SlidersHorizontal size={16} /><select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value as (typeof statusOptions)[number])}>{statusOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="gaming-select"><select aria-label="Filter by platform" value={platform} onChange={(event) => setPlatform(event.target.value)}>{platforms.map((option) => <option key={option}>{option}</option>)}</select></label>
        </div>
        <div className="gaming-results-line"><span>SHOWING <b>{filteredGames.length.toString().padStart(2, "0")}</b> TITLES</span><span>CURATED BY IBRAHIM</span></div>
        <div className="gaming-cards">
          {filteredGames.map((game, index) => (
            <article className="gaming-card" key={game.title}>
              <div className="gaming-card-art">
                <img src={steamArt(game.appId)} alt={`${game.title} cover art`} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                <div className="gaming-card-art-shade" />
                <span className="gaming-card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="gaming-art-platform">{game.platform}</span>
                <span className="gaming-art-open"><ArrowUpRight size={18} /></span>
              </div>
              <div className="gaming-card-body">
                <div className="gaming-card-meta"><span>{game.genre}</span><span className={`gaming-status gaming-status-${game.status === "Playing now" ? "playing" : game.status === "Want to play" ? "backlog" : "completed"}`}>{game.status}</span></div>
                <h3>{game.title}</h3>
                <p>{game.note}</p>
                <div className="gaming-card-foot"><span>{game.year}</span><span>IBRAHIM'S LIBRARY <ArrowUpRight size={13} /></span></div>
              </div>
            </article>
          ))}
          {filteredGames.length === 0 && <div className="gaming-empty"><Trophy size={24} /><h3>No games found</h3><p>Try another title, platform, or status.</p></div>}
        </div>
        <p className="gaming-disclaimer">A living collection — games I've finished, games I'm playing, and stories I can't wait to get into.</p>
      </section>
      <footer className="gaming-footer"><span>GG, THANKS FOR PLAYING.</span><span>IBRAHIM ALLI © {new Date().getFullYear()}</span><a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>BACK TO TOP ↑</a></footer>
    </main>
  );
}
