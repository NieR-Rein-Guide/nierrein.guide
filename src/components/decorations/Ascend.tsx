import SVG from "react-inlinesvg";

export default function Ascend({ level, ...props }: { level: number }) {
  const levels = Array.from(Array(level).keys());
  const missing = Array.from(Array(Math.abs(levels.length - 4)).keys());

  return (
    <div className="flex">
      {levels.map((level, index) => (
        <SVG
          key={level}
          src="/decorations/ascend-full.svg"
          className="h-6 w-auto"
          {...props}
        />
      ))}
      {missing.map((level, index) => (
        <SVG
          key={level}
          src="/decorations/ascend.svg"
          className="h-6 w-auto"
          {...props}
        />
      ))}
    </div>
  );
}

export function AscendFull() {
  return <SVG src="/decorations/ascend-full.svg" className="h-6 w-auto" />;
}

export function AscendEmpty() {
  return <SVG src="/decorations/ascend.svg" className="h-6 w-auto" />;
}
