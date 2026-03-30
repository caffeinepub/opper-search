const FOOTER_LINKS = [
  "About",
  "Advertising",
  "Business",
  "Privacy",
  "Terms",
  "Settings",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "opper",
  );

  return (
    <footer
      className="border-t border-border px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3"
      style={{ background: "#f8f9fa" }}
    >
      <div className="flex items-center gap-4">
        <span className="font-bold text-gray-500 text-sm">Opper</span>
        <span className="text-xs text-gray-400">
          &copy; {year}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Built with love using caffeine.ai
          </a>
        </span>
      </div>
      <nav className="flex flex-wrap gap-4">
        {FOOTER_LINKS.map((link) => (
          <span
            key={link}
            className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer hover:underline"
          >
            {link}
          </span>
        ))}
      </nav>
    </footer>
  );
}
