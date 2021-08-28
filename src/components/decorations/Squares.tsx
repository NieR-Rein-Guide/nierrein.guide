import SVG from "react-inlinesvg";

export default function Squares(): JSX.Element {
  return (
    <>
      <SVG
        src="/decorations/squares-fusion.svg"
        className="left-2 top-2 reversed"
      />
      <SVG src="/decorations/squares-fusion.svg" className="right-2 top-2" />
      <SVG src="/decorations/squares-fusion.svg" className="left-2 bottom-2" />
      <SVG
        src="/decorations/squares-fusion.svg"
        className="right-2 bottom-2 reversed"
      />
    </>
  );
}
