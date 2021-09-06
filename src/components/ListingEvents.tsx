interface ListingEventsProps {
  title: string;
  children: JSX.Element[];
}

export default function ListingEvents({ title, children }: ListingEventsProps) {
  return (
    <div className="border border-beige-inactive bg-grey-lighter">
      <div className="bg-grey-foreground py-4 text-center">
        <h3 className="text-2xl text-beige-inactive">{title}</h3>
      </div>

      <div className="grid px-8 gap-y-4 py-4">{children}</div>
    </div>
  );
}
