import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-brand"><span>Ibrahim</span><strong>Alli</strong><i>.</i></div>
      <div className="footer-bottom">
        <div><p>Ibrahim — Builder, Creator & Entrepreneur</p><p className="footer-muted">© 2026 Ibrahim Alli. All rights reserved.</p></div>
        <nav><Link to="/">Home</Link><Link to="/about">About</Link><Link to="/" hash="work">Work</Link><Link to="/" hash="contact">Contact</Link></nav>
      </div>
    </div>
  </footer>;
}
