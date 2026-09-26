import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { skills } from "@/lib/portfolio-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ibrahim Alli" },
      {
        name: "description",
        content:
          "Background, education, experience, skills and interests of Ibrahim Alli.",
      },
    ],
  }),
  component: About,
});

const experience = [
  {
    period: "2025 — Present",
    role: "Business Manager / Digital Operations",
    company: "Super Plus Fitness & Spa",
    place: "Lagos, Nigeria",
    body: "Managing day-to-day business operations while developing the company’s website, digital marketing, staff systems, membership processes and customer-facing digital tools.",
  },
  {
    period: "2024 — Present",
    role: "Construction Worker",
    company: "Northernland Construction and Real Estate Company",
    place: "North Cyprus",
    body: "Practical site experience covering site preparation, material handling, general construction support and team-oriented physical work.",
  },
  {
    period: "2023 — 2024",
    role: "Kitchen Team Lead",
    company: "Hungry House",
    place: "Lefkosa & Girne, North Cyprus",
    body: "Supported kitchen operations, coordinated team workflow and helped maintain smooth daily restaurant operations.",
  },
];

const personal = [
  ["Name", "Ibrahim Alli"],
  ["Born", "1998"],
  ["Based around", "Nigeria / North Cyprus"],
  ["Focus", "Business · Digital · Creative work"],
];

const background = [
  "My path has never been limited to one kind of work. I’ve moved between communication, postgraduate study, construction, hospitality, business operations and technology.",
  "That mix shaped how I approach projects: I’m interested in people, systems and practical outcomes, not just job titles or aesthetics.",
  "Today, a major part of my work is building and improving digital experiences for businesses, while continuing to explore web development, design and new ideas.",
];

function About() {
  return (
    <main id="main-content" className="about-page">
      <section className="about-hero section">
        <div className="section-inner">
          <Link to="/" className="back-link">
            <ArrowLeft /> Back home
          </Link>

          <div className="about-hero-grid">
            <div>
              <p className="eyebrow">About Ibrahim</p>
              <h1 className="about-title">
                More than
                <br />
                <em>a timeline.</em>
              </h1>
            </div>

            <p className="about-lead">
              A closer look at the person behind the projects — background,
              education, work, skills and the things that keep me curious.
            </p>
          </div>
        </div>
      </section>

      <section className="about-block personal-block section">
        <div className="section-inner about-grid">
          <div>
            <p className="eyebrow">Personal</p>
            <h2 className="section-title">
              The person
              <br />
              behind the work.
            </h2>
          </div>

          <div className="personal-list">
            <div className="personal-story-trigger">
              <span>My Story</span>
              <strong>The story behind Ibrahim Alli</strong>

              <details>
                <summary>
                  Read my story <span aria-hidden="true">+</span>
                </summary>

                <div className="personal-story">
                  <article>
                    <p className="story-label">1998 — Where It Started</p>
                    <p>
                      I was born in 1998 in Bariga, Lagos, the second of five
                      children. I grew up in Shomolu, Lagos, in an environment
                      that shaped a lot of who I am today.
                    </p>
                  </article>

                  <article>
                    <p className="story-label">Growing Up</p>
                    <p>
                      My early education started at Crown Gate Primary School
                      in Lagos. For secondary school, I spent two years at Al
                      Kawthar Model College as a boarding student, but I
                      eventually had to leave because I was frequently falling
                      sick. I continued at Mims Comprehensive College in
                      Bajulaiye, Lagos, where I completed my secondary
                      education.
                    </p>
                  </article>

                  <article>
                    <p className="story-label">2010 — Technology & Gaming</p>
                    <p>
                      Some of my strongest interests started developing around
                      2010, when I was in JSS. Technology and video gaming were
                      becoming increasingly exciting to me, and I was
                      completely drawn to them. I would sometimes sneak out of
                      school just to spend time playing games at a game centre.
                      Looking back, that fascination with technology wasn't
                      just a phase. It became one of the interests that has
                      followed me throughout my life.
                    </p>
                    <p>
                      My parents also played a big part in nurturing that
                      curiosity. Whenever they could, they did their best to
                      get me whatever new technology or gadget I was interested
                      in. Those experiences made technology feel less like
                      something distant and more like something I could explore
                      and understand myself.
                    </p>
                  </article>

                  <article>
                    <p className="story-label">2014 — University</p>
                    <p>
                      I gained admission into Olabisi Onabanjo University
                      immediately after secondary school in 2014, at just 16
                      years old, to study Mass Communication. University was
                      another important stage of my growth. I graduated with a
                      4.0/5.0, earning a Second Class Upper degree, and
                      afterwards served my country through NYSC in Akwa Ibom
                      State.
                    </p>
                  </article>

                  <article>
                    <p className="story-label">
                      NYSC — Leadership & Service
                    </p>
                    <p>
                      Leadership had actually been part of my life long before
                      university. During secondary school, I took on different
                      responsibilities, including serving as an Art Department
                      class captain, Press Club role and Library Prefect.
                      During NYSC, I continued taking on leadership
                      responsibilities, including serving as MCLO of the
                      Ibiono Ibom Local Government MCAN group and later as
                      President of the Drug-Free CDS group. I also worked with
                      the Ibiono Ibom Local Government during my service year.
                    </p>
                  </article>

                  <article>
                    <p className="story-label">
                      Lagos — Love, Family & A New Chapter
                    </p>
                    <p>
                      After NYSC, I returned to Lagos and eventually
                      reconnected with someone from my past — my
                      secondary-school classmate and the girl I had a crush on
                      back then, <strong>Salmah</strong>. That reunion
                      eventually became something much more meaningful. Today,
                      she is my wife, and together we are blessed with our
                      beautiful son, <strong>Jamal</strong>. Family has become
                      one of the most important parts of the person I am.
                    </p>
                  </article>

                  <article>
                    <p className="story-label">
                      A Journey That Became Personal
                    </p>
                    <p>
                      Around this period, I also began exploring other
                      interests more seriously. Photography became one of
                      them. I bought my first camera with money I had saved
                      from my NYSC allowance, and what started as curiosity
                      grew into another creative outlet for me. I still
                      consider photography a hobby, but it has given me
                      another way to look at the world and express creativity.
                    </p>
                    <p>
                      I also had an experience that became particularly
                      meaningful to me. My mother sponsored me to perform{" "}
                      <strong>Umrah in Saudi Arabia</strong>, which was not
                      only my first international experience but also an
                      important moment in my spiritual journey. The experience
                      uplifted my spirituality and gave me a deeper
                      appreciation for faith, travel and experiencing the
                      world beyond what I had always known. It is an
                      experience I hope to have again someday — this time
                      alongside my wife.
                    </p>
                    <p>
                      I also invested in developing practical skills outside
                      my university degree. I attended an LSETF-sponsored
                      digital marketing training at Poise Nigeria Limited in
                      Pinnock Estate, Lagos Island. That experience added
                      another layer to my growing interest in digital work,
                      business and technology.
                    </p>
                  </article>

                  <article>
                    <p className="story-label">
                      North Cyprus — A New Chapter
                    </p>
                    <p>
                      Eventually, I moved to North Cyprus to pursue a master's
                      degree in Political Science and International Relations
                      at Bahçeşehir Cyprus University. After graduating, I
                      began working and experiencing a completely different
                      environment from the one I had grown up in Lagos. I've
                      worked in different places across the island, continued
                      developing myself, and kept exploring the interests that
                      have stayed with me over the years. I currently work
                      with Northernland, a real estate and construction
                      company in Famagusta (Magusa), North Cyprus.
                    </p>
                  </article>

                  <article>
                    <p className="story-label">
                      Today — Still Becoming
                    </p>
                    <p>
                      Through all these different stages, some things have
                      remained constant:{" "}
                      <strong>
                        my curiosity, my love for technology, my fascination
                        with gaming, my interest in photography, and my desire
                        to keep learning.
                      </strong>
                    </p>
                    <p>
                      Today, I have a lot of different interests competing for
                      my time. I enjoy gaming, reading about technology,
                      photography and watching movies. I have a PC gaming
                      laptop that I still use whenever I get the chance, and I
                      genuinely enjoy learning about new technology even when
                      I'm not actively using it.
                    </p>
                    <p>
                      I've also learned that growing up isn't necessarily
                      about becoming one particular thing. It's about
                      carrying pieces of every experience with you — the
                      places you've lived, the people you've met, the
                      responsibilities you've taken on, the things you've
                      struggled through, and even the hobbies you picked up
                      as a kid.
                    </p>
                    <p>
                      <strong>
                        When I look at my journey so far, I can see how each
                        of those pieces has shaped the person I am today —
                        and I'm still becoming.
                      </strong>
                    </p>
                  </article>
                </div>
              </details>
            </div>

            {personal.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block background-block section">
        <div className="section-inner about-grid">
          <div>
            <p className="eyebrow">Background</p>
            <h2 className="section-title">
              Different rooms.
              <br />
              <em>One story.</em>
            </h2>
          </div>

          <div className="about-prose">
            {background.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block education-block section">
        <div className="section-inner">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Education</p>
              <h2 className="section-title">
                What I
                <br />
                <em>studied.</em>
              </h2>
            </div>
          </div>

          <div className="education-list">
            <div className="education-card">
              <span>2018</span>
              <div>
                <h3>BSc Mass Communication</h3>
                <p>Olabisi Onabanjo University</p>
                <small>Undergraduate degree</small>
              </div>
            </div>

            <div className="education-card">
              <span>2023</span>
              <div>
                <h3>
                  Master’s in Political Science & International Relations
                </h3>
                <p>Bahçeşehir Cyprus University</p>
                <small>Postgraduate degree</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-block experience-block section">
        <div className="section-inner">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Work experience</p>
              <h2 className="section-title">
                Where I’ve
                <br />
                <em>worked.</em>
              </h2>
            </div>

            <p className="heading-note">
              The work has changed. The habit of learning has stayed.
            </p>
          </div>

          <div className="experience-list">
            {experience.map((item, index) => (
              <article className="experience-card" key={item.company}>
                <div className="experience-number">
                  0{index + 1}
                </div>

                <div className="experience-main">
                  <p className="experience-period">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="experience-company">
                    {item.company}
                    {item.place ? ` · ${item.place}` : ""}
                  </p>
                </div>

                <p className="experience-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block skills-block section">
        <div className="section-inner about-grid">
          <div>
            <p className="eyebrow">Skills</p>
            <h2 className="section-title">
              What I can
              <br />
              <em>work with.</em>
            </h2>
          </div>

          <div className="skills-groups">
            {Object.entries(skills).map(([group, items]) => (
              <div className="skill-group" key={group}>
                <h3>{group}</h3>
                <div>
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block interests-block section">
        <div className="section-inner about-grid">
          <div>
            <p className="eyebrow">Interests</p>
            <h2 className="section-title">
              Life outside
              <br />
              <em>the screen.</em>
            </h2>
          </div>

          <div className="interest-grid-about">
            {[
              "Technology",
              "Gaming",
              "Photography",
              "Design",
              "Business",
              "Learning new skills",
              "Exploring new ideas",
            ].map((item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="section-inner hobby-note">
          <p>
            <strong>Photography</strong> is a personal hobby and creative
            outlet — a way to pay attention to light, composition and
            everyday details. It isn’t presented here as a professional
            photography service.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <div className="section-inner">
          <p className="eyebrow light">What’s next</p>
          <h2>
            Still building.
            <br />
            <em>Still learning.</em>
          </h2>

          <Link to="/" hash="contact" className="text-link light-link">
            Start a conversation <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}