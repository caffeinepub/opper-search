interface OpperLogoProps {
  size?: "sm" | "md" | "xl";
}

const LETTER_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#4285F4", "#34A853"];
const LETTERS = ["O", "p", "p", "e", "r"];

export default function OpperLogo({ size = "md" }: OpperLogoProps) {
  const fontSizes: Record<string, string> = {
    sm: "1.5rem",
    md: "2.5rem",
    xl: "5rem",
  };

  return (
    <span
      aria-label="Opper"
      style={{
        fontFamily: "'GeneralSans', Arial, sans-serif",
        fontSize: fontSizes[size],
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {LETTERS.map((letter, idx) => (
        <span key={letter + String(idx)} style={{ color: LETTER_COLORS[idx] }}>
          {letter}
        </span>
      ))}
    </span>
  );
}
