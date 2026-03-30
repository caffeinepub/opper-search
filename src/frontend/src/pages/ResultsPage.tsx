import { ChevronDown, Mic, Search, Settings } from "lucide-react";
import { type KeyboardEvent, useEffect, useState } from "react";
import Footer from "../components/Footer";
import OpperLogo from "../components/OpperLogo";
import ResultItem from "../components/ResultItem";
import SkeletonResults from "../components/SkeletonResults";

const API_KEY = "AIzaSyDznTO5ec8nS8WncTC2SkyOAbgJzIxiN9E";
const CX = "802cd595465e948ff";
const BASE_URL = "https://www.googleapis.com/customsearch/v1";

interface SearchItem {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlTitle: string;
}

interface SearchResponse {
  searchInformation?: {
    totalResults: string;
    formattedTotalResults: string;
    formattedSearchTime: string;
  };
  items?: SearchItem[];
  queries?: {
    nextPage?: Array<{ startIndex: number }>;
    request?: Array<{ startIndex: number; searchTerms: string }>;
  };
  spelling?: { correctedQuery: string };
}

interface ResultsPageProps {
  query: string;
  page: number;
  onSearch: (query: string, page?: number) => void;
  onHome: () => void;
}

const TABS = ["All", "Images", "Maps", "News", "Videos"];

export default function ResultsPage({
  query,
  page,
  onSearch,
  onHome,
}: ResultsPageProps) {
  const [input, setInput] = useState(query);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = (page - 1) * 10 + 1;

  useEffect(() => {
    setInput(query);
    setData(null);
    setError(null);
    setLoading(true);

    const url = `${BASE_URL}?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}&start=${start}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: SearchResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [query, start]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(input);
  };

  const relatedSearches: string[] = data?.queries?.nextPage
    ? [
        `${query} tutorial`,
        `${query} examples`,
        `${query} guide`,
        `${query} 2024`,
        `best ${query}`,
        `how to ${query}`,
      ]
    : [
        `${query} definition`,
        `${query} Wikipedia`,
        `${query} news`,
        `${query} images`,
        `learn ${query}`,
        `${query} near me`,
      ];

  const peopleAlsoAsk = [
    `What is ${query}?`,
    `How does ${query} work?`,
    `Why is ${query} important?`,
    `When was ${query} created?`,
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(var(--background))" }}
    >
      <header className="bg-white border-b border-border sticky top-0 z-10">
        {/* Utility nav */}
        <div
          className="flex items-center justify-between px-6 py-1"
          style={{ background: "#f8f9fa" }}
        >
          <div className="flex gap-4">
            {["News", "Images", "Maps"].map((t) => (
              <button
                type="button"
                key={t}
                className="text-xs text-gray-500 hover:text-gray-700 py-1"
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Settings"
            className="text-gray-500 hover:text-gray-700"
          >
            <Settings size={16} />
          </button>
        </div>

        {/* Search row */}
        <div className="flex items-center gap-4 px-4 md:px-6 py-3">
          <button
            type="button"
            onClick={onHome}
            data-ocid="results.home_link"
            aria-label="Go to Opper home"
            className="shrink-0"
          >
            <OpperLogo size="sm" />
          </button>

          <div className="flex-1 flex items-center gap-2 max-w-2xl">
            <div
              className="search-pill flex items-center px-4 gap-2 flex-1"
              style={{ height: 44 }}
            >
              <Search className="shrink-0 text-gray-400" size={18} />
              <input
                data-ocid="results.search_input"
                className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search"
              />
              <Mic
                className="shrink-0 text-gray-400 cursor-pointer hover:text-gray-600"
                size={18}
              />
            </div>
            <button
              type="button"
              data-ocid="results.search_button"
              className="opper-btn shrink-0"
              onClick={() => onSearch(input)}
            >
              Opper Search
            </button>
          </div>
        </div>

        {/* Tab nav */}
        <nav
          className="flex items-center gap-1 px-4 md:px-6"
          aria-label="Search type tabs"
        >
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab}
              data-ocid={`results.${tab.toLowerCase()}.tab`}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                tab === "All"
                  ? "search-tab-active text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 px-4 md:px-6 py-4 max-w-screen-xl mx-auto w-full">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0 max-w-2xl">
            {error && (
              <div
                data-ocid="results.error_state"
                className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
              >
                <p className="font-medium">Search failed</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}

            {loading && <SkeletonResults />}

            {!loading && data && (
              <>
                {data.spelling?.correctedQuery && (
                  <p className="text-sm text-gray-600 mb-3">
                    Showing results for{" "}
                    <button
                      type="button"
                      className="italic text-blue-600 hover:underline"
                      onClick={() => onSearch(data.spelling!.correctedQuery)}
                    >
                      {data.spelling.correctedQuery}
                    </button>
                  </p>
                )}

                {data.searchInformation && (
                  <p className="text-sm text-gray-500 mb-4">
                    About {data.searchInformation.formattedTotalResults} results
                    ({data.searchInformation.formattedSearchTime} seconds)
                  </p>
                )}

                {(!data.items || data.items.length === 0) && (
                  <div
                    data-ocid="results.empty_state"
                    className="text-center py-12"
                  >
                    <p className="text-gray-500 text-lg">
                      No results found for <strong>{query}</strong>
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}

                {data.items && (
                  <ol className="space-y-6" data-ocid="results.list">
                    {data.items.map((item, i) => (
                      <li key={item.link} data-ocid={`results.item.${i + 1}`}>
                        <ResultItem
                          index={i + 1 + (page - 1) * 10}
                          title={item.title}
                          link={item.link}
                          displayLink={item.displayLink}
                          snippet={item.snippet}
                        />
                      </li>
                    ))}
                  </ol>
                )}

                {data.items && data.items.length > 0 && (
                  <div
                    data-ocid="results.pagination_section"
                    className="flex items-center justify-center gap-1 mt-10 mb-6"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((p) => (
                      <button
                        type="button"
                        key={p}
                        data-ocid={
                          p === page
                            ? "results.pagination_current"
                            : "results.pagination_next"
                        }
                        onClick={() => onSearch(query, p)}
                        className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                          p === page
                            ? "bg-blue-600 text-white"
                            : "text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    {page < 10 && (
                      <button
                        type="button"
                        data-ocid="results.pagination_next"
                        onClick={() => onSearch(query, page + 1)}
                        className="ml-2 px-4 h-9 rounded-full text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {!loading && data?.items && data.items.length > 0 && (
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="bg-white rounded-xl border border-border p-4 mb-4">
                <h2
                  className="font-semibold text-gray-800 mb-3"
                  style={{ fontSize: 15 }}
                >
                  People also ask
                </h2>
                <div className="divide-y divide-border">
                  {peopleAlsoAsk.map((q, i) => (
                    <button
                      type="button"
                      key={q}
                      data-ocid={`results.also_ask.item.${i + 1}`}
                      className="w-full flex items-center justify-between py-3 text-left text-sm text-gray-700 hover:text-gray-900 gap-2"
                      onClick={() => onSearch(q)}
                    >
                      <span>{q}</span>
                      <ChevronDown
                        size={16}
                        className="shrink-0 text-gray-400"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-border p-4">
                <h2
                  className="font-semibold text-gray-800 mb-3"
                  style={{ fontSize: 15 }}
                >
                  Related searches
                </h2>
                <div className="space-y-2">
                  {relatedSearches.map((s, i) => (
                    <button
                      type="button"
                      key={s}
                      data-ocid={`results.related.item.${i + 1}`}
                      onClick={() => onSearch(s)}
                      className="block w-full text-left text-sm text-blue-600 hover:underline py-1"
                    >
                      &ldquo;{s}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
