interface ResultItemProps {
  index: number;
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
}

export default function ResultItem({
  title,
  link,
  displayLink,
  snippet,
}: ResultItemProps) {
  return (
    <div className="group">
      {/* URL breadcrumb */}
      <div className="flex items-center gap-1 mb-1">
        <span
          className="text-xs truncate max-w-xs"
          style={{ color: "#188038" }}
        >
          {displayLink}
        </span>
      </div>

      {/* Title link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-lg font-medium leading-snug hover:underline mb-1"
        style={{ color: "#1A0DAB" }}
      >
        {title}
      </a>

      {/* Snippet */}
      <p
        className="text-sm leading-relaxed line-clamp-2"
        style={{ color: "#5F6368" }}
      >
        {snippet}
      </p>
    </div>
  );
}
