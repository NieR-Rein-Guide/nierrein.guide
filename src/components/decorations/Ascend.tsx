import SVG from "react-inlinesvg";

export default function Ascend({ level }: { level: number }) {
  const levels = Array.from(Array(level).keys());
  const missing = Array.from(Array(Math.abs(levels.length - 4)).keys());

  console.log(levels, missing);

  return (
    <div className="flex">
      {levels.map((level) => (
        <SVG
          key={level}
          src="/decorations/ascend-full.svg"
          className="h-6 w-auto"
        />
      ))}
      {missing.map((level) => (
        <SVG key={level} src="/decorations/ascend.svg" className="h-6 w-auto" />
      ))}
    </div>
  );
}
