import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Gamepad2, Search, SlidersHorizontal, Trophy } from "lucide-react";
import css from "../gaming.css?url";

type GameStatus = "Playing now" | "Played" | "Want to play";
type Game = { title: string; platform: string; genre: string; status: GameStatus; note: string; year: string };

const games: Game[] = [
  { title: "Onimusha", platform: "ROG Ally", genre: "Action · Adventure", status: "Playing now", note: "Samurai action, puzzles, and demon-slaying.", year: "Classic" },
  { title: "EA SPORTS FC", platform: "ROG Ally · PC", genre: "Sports · Football", status: "Playing now", note: "Football, matches, and squad building.", year: "Series" },
  { title: "Days Gone", platform: "PC", genre: "Action · Open world", status: "Played", note: "A favourite for its world, survival, and story.", year: "2019" },
  { title: "Marvel's Spider-Man", platform: "PC", genre: "Action · Open world", status: "Played", note: "Swinging through the city with a great superhero story.", year: "2018" },
  { title: "Red Dead Redemption 2", platform: "PC", genre: "Action · Open world", status: "Played", note: "A richly detailed western and an unforgettable journey.", year: "2018" },
  { title: "The Last of Us Part I", platform: "PC", genre: "Action · Story", status: "Played", note: "A tense, character-driven survival story.", year: "2022" },
  { title: "The Last of Us Part II", platform: "PlayStation", genre: "Action · Story", status: "Played", note: "An intense, emotionally driven continuation.", year: "2020" },
  { title: "Detroit: Become Human", platform: "PC", genre: "Interactive drama", status: "Played", note: "Choices, consequences, and branching narratives.", year: "2018" },
  { title: "Grand Theft Auto V", platform: "PC", genre: "Action · Open world", status: "Played", note: "A chaotic open world with three playable leads.", year: "2013" },
  { title: "Sleeping Dogs", platform: "PC", genre: "Action · Open world", status: "Played", note: "Undercover crime drama with satisfying hand-to-hand combat.", year: "2012" },
  { title: "God of War", platform: "PC", genre: "Action · Story", status: "Played", note: "Mythology, powerful combat, and a father-son journey.", year: "2018" },
  { title: "Ghost of Tsushima", platform: "PlayStation · PC", genre: "Action · Adventure", status: "Played", note: "A cinematic samurai adventure across a beautiful island.", year: "2020" },
  { title: "Horizon Zero Dawn Remastered", platform: "PC", genre: "Action · RPG", status: "Want to play", note: "A mysterious world, machine creatures, and a story to uncover.", year: "2024" },
  { title: "Horizon Forbidden West", platform: "PC", genre: "Action · RPG", status: "Want to play", note: "A bigger adventure through a stunning post-apocalyptic world.", year: "2022" },
  { title: "Cyberpunk 2077", platform: "PC · ROG Ally", genre: "RPG · Open world", status: "Want to play", note: "Explore Night City and its branching stories.", year: "2020" },
  { title: "Uncharted 4: A Thief's End", platform: "PC · PlayStation", genre: "Action · Adventure", status: "Want to play", note: "A cinematic treasure-hunting adventure.", year: "2016" },
  { title: "Uncharted: The Lost Legacy", platform: "PC · PlayStation", genre: "Action · Adventure", status: "Want to play", note: "A globe-trotting adventure with a new duo.", year: "2017" },
  { title: "Far Cry 6", platform: "PC · ROG Ally", genre: "Action · Open world", status: "Want to play", note: "Take on a dictatorship in a large open world.", year: "2021" },
  { title: "Assassin's Creed Origins", platform: "PC · ROG Ally", genre: "Action · Adventure", status: "Want to play", note: "Explore ancient Egypt in a story-led open world.", year: "2017" },
  { title: "Mafia: Definitive Edition", platform: "PC", genre: "Action · Crime", status: "Want to play", note: "A cinematic gangster story set in a period city.", year: "2020" },
  { title: "Marvel's Guardians of the Galaxy", platform: "PC", genre: "Action · Story", status: "Want to play", note: "A character-focused space adventure with humour.", year: "2021" },
  { title: "Batman: Arkham Knight", platform: "PC", genre: "Action · Adventure", status: "Want to play", note: "A dark superhero story across Gotham City.", year: "2015" },
];

const statusOptions = ["All games", "Playing now", "Played", "Want to play"] as const;

export const Route = createFileRoute("/gaming")({
  head: () => ({
    meta: [
      { title: "Gaming — Ibrahim Alli" },
      { name: "description", content: "Ibrahim Alli's personal gaming collection: games played, currently playing, and want to play." },
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
        <div className="gaming-hero-grid" aria-hidden="true" />
        <div className="gaming-hero-inner">
          <p className="gaming-eyebrow"><Gamepad2 size={15} /> IBRAHIM ALLI / PLAYER PROFILE</p>
          <h1>Press start<span>.</span><br /><em>Stay awhile.</em></h1>
          <p className="gaming-intro">The games I've played, the worlds I'm in right now, and the adventures still waiting for me.</p>
          <a className="gaming-hero-link" href="#library">Explore my library <ArrowUpRight size={17} /></a>
          <div className="gaming-hero-mark" aria-hidden="true">PLAYER<br />ONE</div>
        </div>
        <div className="gaming-scanline" aria-hidden="true" />
      </section>

      <section className="gaming-content" id="library">
        <div className="gaming-section-heading">
          <div><p className="gaming-eyebrow">MY PERSONAL COLLECTION</p><h2>My game library<span>.</span></h2></div>
          <p className="gaming-section-note">One player. Too many worlds to explore.</p>
        </div>

        <div className="gaming-stats" aria-label="Library summary">
          <div><span className="gaming-stat-number">{games.length.toString().padStart(2, "0")}</span><span className="gaming-stat-label">In my collection</span></div>
          <div><span className="gaming-stat-number">{playingCount.toString().padStart(2, "0")}</span><span className="gaming-stat-label">Playing now</span></div>
          <div><span className="gaming-stat-number">{playedCount.toString().padStart(2, "0")}</span><span className="gaming-stat-label">Played</span></div>
          <div><span className="gaming-stat-number">{wishlistCount.toString().padStart(2, "0")}</span><span className="gaming-stat-label">Want to play</span></div>
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
                <span className="gaming-card-index">{String(index + 1).padStart(2, "0")}</span>
                <Gamepad2 size={42} strokeWidth={1.1} />
                <span className="gaming-art-platform">{game.platform}</span>
              </div>
              <div className="gaming-card-body">
                <div className="gaming-card-meta"><span>{game.genre}</span><span className={`gaming-status gaming-status-${game.status === "Playing now" ? "playing" : game.status === "Want to play" ? "backlog" : "completed"}`}>{game.status}</span></div>
                <h3>{game.title}</h3>
                <p>{game.note}</p>
                <div className="gaming-card-foot"><span>{game.year}</span><span className="gaming-card-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span></div>
              </div>
            </article>
          ))}
          {filteredGames.length === 0 && <div className="gaming-empty"><Trophy size={24} /><h3>No games found</h3><p>Try another title, platform, or status.</p></div>}
        </div>
        <p className="gaming-disclaimer">Your personal game list, organised by what you've played, what you're playing, and what you want to play next.</p>
      </section>

      <footer className="gaming-footer"><span>GG, THANKS FOR PLAYING.</span><span>IBRAHIM ALLI © {new Date().getFullYear()}</span></footer>
    </main>
  );
}
