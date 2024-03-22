import { tierlists } from "@prisma/client-nrg";
import TierlistListingItem from "@components/TierlistListingItem";
import { sub } from "date-fns";

interface LoadoutProps {
  tierlists: tierlists[];
}

export const defaultFromDate = sub(new Date(), {
  months: 12,
});

export default function ListingLoadout({
  tierlists = [],
}: LoadoutProps): JSX.Element {

  return <>
    {tierlists.length > 0 && (
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {tierlists.map((tierlist) => (
          <TierlistListingItem key={tierlist.tierlist_id} {...tierlist} />
        ))}
      </div>
    )}
  </>;
}
