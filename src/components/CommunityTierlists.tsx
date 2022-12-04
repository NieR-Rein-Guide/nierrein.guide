import { tierlists } from "@prisma/client-nrg";
import TierlistListingItem from "@components/TierlistListingItem";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ATTRIBUTES from "@utils/attributes";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { sub } from "date-fns";
import Link from "next/link";

interface LoadoutProps {
  tierlists: tierlists[];
}

export const defaultFromDate = sub(new Date(), {
  months: 3,
});

export default function ListingLoadout({
  tierlists = [],
}: LoadoutProps): JSX.Element {
  const router = useRouter();

  const [sortBy, setSortBy] = useState("votes");
  const [fromDate, setFromDate] = useState<Date | null>(defaultFromDate);
  const [attribute, setAttribute] = useState("all");
  const [type, setType] = useState("all");

  useEffect(() => {
    if (router.asPath === "/tierlists") return;

    router.push(
      `/tierlists/community?attribute=${attribute}&type=${type}&from=${fromDate.toISOString()}&sortBy=${sortBy}`
    );
  }, [attribute, type, fromDate, sortBy]);

  useEffect(() => {
    if (type === "costumes") {
      setAttribute("all");
    }
  }, [type]);

  return (
    <>
      <div className="flex flex-col items-center md:flex-row gap-y-4 gap-x-4 bg-grey-dark border border-beige border-opacity-50 p-4 mb-8">
        <FormControl className="mt-8 md:mt-0">
          <InputLabel id="sort-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortBy}
            label="sort"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="updated_at">Last updated</MenuItem>
            <MenuItem value="created_at">Created date</MenuItem>
            <MenuItem value="votes">Votes</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            className="mt-4 md:mt-0"
            label="Updated after"
            inputFormat="MM/dd/yyyy"
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormControl className="w-32 mt-8 md:mt-0">
          <InputLabel id="attribute-select-label">Type</InputLabel>
          <Select
            labelId="attribute-select-label"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="costumes">Costumes</MenuItem>
            <MenuItem value="weapons">Weapons</MenuItem>
          </Select>
        </FormControl>
        {type === "weapons" && (
          <FormControl className="w-32 mt-8 md:mt-0">
            <InputLabel id="attribute-select-label">Attribute</InputLabel>
            <Select
              labelId="attribute-select-label"
              value={attribute}
              label="Attribute"
              onChange={(e) => setAttribute(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {ATTRIBUTES.map((attribute) => (
                <MenuItem key={attribute} value={attribute}>
                  {attribute}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>

      {tierlists.length > 0 && (
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tierlists.map((tierlist) => (
            <TierlistListingItem key={tierlist.tierlist_id} {...tierlist} />
          ))}
        </div>
      )}

      {tierlists.length === 0 && (
        <div className="bg-grey-dark text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center rounded-lg">
          <img
            className="inline-block"
            src="/decorations/fio-confused.png"
            alt="Fio confused"
          />
          <p className="mt-4">Sorry, no tierlist found.</p>
          <div className="flex justify-center mt-4">
            <Link href="/tools/tierlist-builder" passHref>
              <a className="btn">Create one!</a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
