import Layout from "@components/Layout";
import Meta from "@components/Meta";
import prisma from "@libs/prisma";
import { NextPageContext } from "next";
import { tierlists } from "@prisma/client-nrg";
import TierlistListingItem from "@components/TierlistListingItem";
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
  tierlists: tierlists[];
}

export default function ListingLoadout({
  tierlists,
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
      `/tierlists/community?attribute=${attribute}&type=${type}&from=${fromDate.toISOString()}&sortBy=${sortBy}`
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
        title="Tierlists"
        description="A list of community created tierlists."
        cover="https://nierrein.guide/cover-tierlists.jpg"
      />

      <section>
        <h2 className="overlap">Community Tier Lists</h2>

        <Link href="/tools/tierlist-builder" passHref>
          <a className="btn mb-4 md:mb-0 top-3 right-4 md:absolute">
            Create a tierlist
          </a>
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
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  context.res.setHeader("Cache-Control", "public, maxage=86400");

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

  const tierlists = await prisma.nrg.tierlists.findMany({
    orderBy,
    where,
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        tierlists,
      })
    ),
  };
}
