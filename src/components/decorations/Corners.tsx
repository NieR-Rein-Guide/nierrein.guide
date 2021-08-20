export default function Corners(): JSX.Element {
  return (
    <>
      <span className="w-4 h-4 absolute bottom-2 left-2 border-b-2 border-l-2"></span>
      <span className="w-1 h-1 absolute bottom-4 left-4 border rounded-full bg-white"></span>

      <span className="w-4 h-4 absolute top-2 right-2 border-t-2 border-r-2"></span>
      <span className="w-1 h-1 absolute top-4 right-4 border rounded-full bg-white"></span>
    </>
  );
}
