import { Mic, Search } from "lucide-react";
import { type KeyboardEvent, useState } from "react";
import Footer from "../components/Footer";
import OpperLogo from "../components/OpperLogo";

interface HomePageProps {
  onSearch: (query: string) => void;
}

export default function HomePage({ onSearch }: HomePageProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(input);
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "oklch(var(--background))" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl flex flex-col items-center gap-8">
          <OpperLogo size="xl" />

          <div className="w-full">
            <div
              className="search-pill flex items-center px-4 gap-2 w-full"
              style={{ height: 48 }}
            >
              <Search className="shrink-0 text-gray-400" size={20} />
              <input
                data-ocid="home.search_input"
                className="flex-1 bg-transparent outline-none text-base text-gray-900 placeholder-gray-400"
                placeholder="Search the web..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search"
              />
              <Mic
                className="shrink-0 text-gray-400 cursor-pointer hover:text-gray-600"
                size={20}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              data-ocid="home.search_button"
              className="opper-btn"
              onClick={() => onSearch(input)}
            >
              Opper Search
            </button>
            <button
              type="button"
              data-ocid="home.lucky_button"
              className="px-5 py-2 rounded-full bg-white border border-border text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              onClick={() => onSearch(input)}
            >
              I&apos;m Feeling Lucky
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
