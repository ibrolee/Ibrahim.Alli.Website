import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Gamepad2, Search, SlidersHorizontal, Trophy } from "lucide-react";
import css from "../gaming.css?url";

type GameStatus = "Playing" | "Backlog" | "Completed";
type Game = { title: string; platform: string; genre: string; status: GameStatus; note: string; year: string };

const games: Game[] = [
  { title: "The Last of Us Part II", platform: "PlayStation", genre: "Action · Story", status: "Completed", note: "A brutal, emotionally driven story that stays with you.", year: "2020" },
  { title: "Detroit: Become Human", platform: "PC", genre: "Interactive drama", status: "Completed", note: "Choices, consequences, and branching narratives.", year: "2018" },
  { title: "EA SPORTS FC", platform: "PC", genre: "Sports · Football", status: "Playing", note: "The yearly football ritual: career mode, matches, and squad building.", year: "Series" },
  { title: "Onimusha", platform: "ROG Ally", genre: "Action · Adventure", status: "Playing", note: "Classic samurai action, puzzles, and demon-slaying.", year: "Classic" },
  { title: "The Last of Us Part I", platform: "PC", genre: "Action · Story", status: "Backlog", note: "A story-led journey waiting for the right evening.", year: "2022" },
  { title: "Cyberpunk 2077", platform: "PC · ROG Ally", genre: "RPG · Open world", status: "Backlog", note: "A dense open world to get lost in.", year: "2020" },
];

const statusOptions = ["All games", "Playing", "Backlog", "Completed"] as const;

export const Route = createFileRoute("/gaming")({
  head: () => ({
    meta: [
      { title: "Gaming — Ibrahim Alli" },
      { name: "description", content: "Ibrahim Alli's personal gaming corner: games, platforms, current plays, and the backlog." },
      { property: "og:title", content: "Gaming — Ibrahim Alli" },
      { property: "og:description", content: "A personal archive of games played, games in progress, and adventures still to come." },
    ],
    links: [{ rel: "stylesheet", href: css }],
  }),
  component: GamingPage,
});

function GamingPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statusOptions)[number]>("All games");
  const [platform, setPlatform] = useState("All platforms");

  const platforms = ["All platforms", ...Array.from(new Set(games.map((game) => game.platform)))];
  const filteredGames = useMemo(() => games.filter((game) => {
    const matchesQuery = `${game.title} ${game.genre} ${game.platform}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "All games" || game.status === status;
    const matchesPlatform = platform === "All platforms" || game.platform === platform;
    return matchesQuery && matchesStatus && matchesPlatform;
  }), [query, status, platform]);

  const playingCount = games.filter((game) => game.status === "Playing").length;
  const completedCount = games.filter((game) => game.status === "Completed").length;
  const backlogCount = games.filter((game) => game.status === "Backlog").length;

  return (
    <main className="gaming-page">
      <section className="gaming-hero">
        <div className="gaming-hero-grid" aria-hidden="true" />
        <div className="gaming-hero-inner">
          <p className="gaming-eyebrow"><Gamepad2 size={15} /> IBRAHIM ALLI / PLAYER PROFILE</p>
          <h1>Press start<span>.</span><br /><em>Stay awhile.</em></h1>
          <p className="gaming-intro">A personal corner for the worlds I explore, stories I finish, and games waiting in the queue.</p>
          <a className="gaming-hero-link" href="#library">Explore my library <ArrowUpRight size={17} /></a>
          <div className="gaming-hero-mark" aria-hidden="true">PLAYER<br />ONE</div>
        </div>
        <div className="gaming-scanline" aria-hidden="true" />
      </section>

      <section className="gaming-content" id="library">
        <div className="gaming-section-heading">
          <div><p className="gaming-eyebrow">THE COLLECTION</p><h2>My game library<span>.</span></h2></div>
          <p className="gaming-section-note">A living list. Always one more game to play.</p>
        </div>

        <div className="gaming-stats" aria-label="Library summary">
          <div><span className="gaming-stat-number">{games.length.toString().padStart(2, "0")}</span><span className="gaming-stat-label">In the library</span></div>
          <div><span className="gaming-stat-number">{playingCount.toString().padStart(2, "0")}</span><span className="gaming-stat-label">Currently playing</span></div>
          <div><span className="gaming-stat-number">{completedCount.toString().padStart(2, "0")}</span><span className="gaming-stat-label">Completed</span></div>
          <div><span className="gaming-stat-number">{backlogCount.toString().padStart(2, "0")}</span><span className="gaming-stat-label">On the backlog</span></div>
        </div>

        <div className="gaming-toolbar">
          <label className="gaming-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a game, genre, platform…" /></label>
          <label className="gaming-select"><SlidersHorizontal size={16} /><select value={status} onChange={(event) => setStatus(event.target.value as (typeof statusOptions)[number])}>{statusOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="gaming-select"><select value={platform} onChange={(event) => setPlatform(event.target.value)}>{platforms.map((option) => <option key={option}>{option}</option>)}</select></label>
        </div>

        <div className="gaming-cards">
          {filteredGames.map((game, index) => (
            <article className="gaming-card" key={game.title}>
              <div className={`gaming-card-art gaming-art-${index % 6}`}>
                <span className="gaming-card-index">0{index + 1}</span>
                <Gamepad2 size={42} strokeWidth={1.1} />
                <span className="gaming-art-platform">{game.platform}</span>
              </div>
              <div className="gaming-card-body">
                <div className="gaming-card-meta"><span>{game.genre}</span><span className={`gaming-status gaming-status-${game.status.toLowerCase()}`}>{game.status}</span></div>
                <h3>{game.title}</h3>
                <p>{game.note}</p>
                <div className="gaming-card-foot"><span>{game.year}</span><span className="gaming-card-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span></div>
              </div>
            </article>
          ))}
          {filteredGames.length === 0 && <div className="gaming-empty"><Trophy size={24} /><h3>No games found</h3><p>Try another title, platform, or status.</p></div>}
        </div>
        <p className="gaming-disclaimer">This is the first edition of the library. Titles and statuses are editable starting points, not a synced game account.</p>
      </section>

      <footer className="gaming-footer"><span>GG, THANKS FOR PLAYING.</span><span>IBRAHIM ALLI © {new Date().getFullYear()}</span></footer>
    </main>
  );
}
