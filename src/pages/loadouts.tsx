import Layout from "@components/Layout";
import Meta from "@components/Meta";
import prisma from "@libs/prisma";
import { NextPageContext } from "next";
import { loadouts } from "@prisma/client-nrg";
import LoadoutListingItem from "@components/LoadoutListingItem";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ATTRIBUTES from "@utils/attributes";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { sub } from "date-fns";
import Link from "next/link";

interface LoadoutProps {
  loadouts: loadouts[];
}

export default function ListingLoadout({
  loadouts,
}: LoadoutProps): JSX.Element {
  const router = useRouter();
  const firstUpdate = useRef(true);

  const defaultFromDate = sub(new Date(), {
    months: 1,
  });

  const [sortBy, setSortBy] = useState("created_at");
  const [fromDate, setFromDate] = useState<Date | null>(defaultFromDate);
  const [attribute, setAttribute] = useState("all");
  const [type, setType] = useState("all");

  useEffect(() => {
    if (firstUpdate.current) return;

    router.push(
      `/loadouts?attribute=${attribute}&type=${type}&from=${fromDate.toISOString()}&sortBy=${sortBy}`
    );
  }, [attribute, type, fromDate, sortBy]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }, []);

  return (
    <Layout>
      <Meta
        title="Loadouts"
        description="A list of community created loadouts."
        cover="https://nierrein.guide/cover-loadouts.jpg"
      />

      <section>
        <h2 className="overlap">Community loadouts</h2>

        <Link
          href="/tools/loadout-builder"
          passHref
          className="btn mb-4 md:mb-0 top-3 right-4 md:absolute">
          
            Create a loadout
          
        </Link>

        <div className="flex flex-col items-center md:flex-row gap-y-4 gap-x-4 bg-grey-dark border border-beige border-opacity-50 p-4 mb-8">
          <FormControl className="mt-8 md:mt-0">
            <InputLabel id="attribute-select-label">Sort by</InputLabel>
            <Select
              labelId="attribute-select-label"
              value={sortBy}
              label="Attribute"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="created_at">Created date</MenuItem>
              <MenuItem value="votes">Votes</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              className="mt-4 md:mt-0"
              label="Created after"
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
              <MenuItem value="quests">Quests</MenuItem>
              <MenuItem value="arena">Arena</MenuItem>
              <MenuItem value="subjugation">Subj.</MenuItem>
            </Select>
          </FormControl>
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
        </div>

        {loadouts.length > 0 && (
          <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadouts.map((loadout) => (
              <LoadoutListingItem key={loadout.loadout_id} {...loadout} />
            ))}
          </div>
        )}

        {loadouts.length === 0 && (
          <div className="bg-grey-dark text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center rounded-lg">
            <img
              className="inline-block"
              src="/decorations/fio-confused.png"
              alt="Fio confused"
            />
            <p className="mt-4">Sorry, no loadouts found.</p>
            <div className="flex justify-center mt-4">
              <Link href="/tools/loadout-builder" passHref className="btn">
                Create one!
              </Link>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const where = {};
  let orderBy = {};

  /**
   * Filters
   */
  if (context.query.attribute) {
    if (context.query.attribute !== "all") {
      where["attribute"] = context.query.attribute;
    }
  }

  if (context.query.type !== "all") {
    where["type"] = context.query.type;
  }

  if (context.query.from) {
    where["created_at"] = {};
    where["created_at"]["gte"] = context.query.from;
  }

  /**
   * Order by
   */

  if (context.query.sortBy) {
    orderBy = {
      [context.query.sortBy as string]: "desc",
    };
  } else {
    orderBy = {
      created_at: "desc",
    };
  }

  const loadouts = await prisma.nrg.loadouts.findMany({
    where,
    orderBy,
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        loadouts,
      })
    ),
  };
}
