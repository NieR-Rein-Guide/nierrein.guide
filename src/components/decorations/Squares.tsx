import SVG from "react-inlinesvg";

export default function Squares(): JSX.Element {
  return (
    <>
      <SVG
        src="/decorations/squares-fusion.svg"
        className="absolute left-1 top-1 reversed"
      />
      <SVG
        src="/decorations/squares-fusion.svg"
        className="absolute right-1 top-1"
      />
      <SVG
        src="/decorations/squares-fusion.svg"
        className="absolute left-1 bottom-1"
      />
      <SVG
        src="/decorations/squares-fusion.svg"
        className="absolute right-1 bottom-1 reversed"
      />
    </>
  );
}
