import { useCallback, useState } from "react";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";

export type View = "home" | "results";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = useCallback((q: string, p = 1) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setPage(p);
    setView("results");
  }, []);

  const handleHome = useCallback(() => {
    setView("home");
    setQuery("");
    setPage(1);
  }, []);

  if (view === "results") {
    return (
      <ResultsPage
        query={query}
        page={page}
        onSearch={handleSearch}
        onHome={handleHome}
      />
    );
  }

  return <HomePage onSearch={handleSearch} />;
}
