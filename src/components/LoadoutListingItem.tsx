import { LOADOUT_TYPES } from "../store/loadout";
import Link from "next/link";
import Element from "./Element";
import { loadouts } from "@prisma/client-nrg";
import { Chip } from "@mui/material";

export default function LoadoutListinItem({
  loadout_id,
  title,
  description,
  type,
  attribute,
  slug,
  votes,
}: loadouts) {
  return (
    <div
      key={loadout_id}
      className="flex flex-col gap-x-4 w-80 bg-grey-dark bordered relative p-8 transition hover:bg-grey-lighter overflow-hidden w-full h-full"
    >
      <div className="absolute top-4 right-4">
        <Chip variant="outlined" label={votes} />
      </div>
      <h3 className="text-xl truncate">{title}</h3>
      <p className="text-xs text-beige mt-1 truncate">{description}</p>

      <div className="flex justify-between mt-4">
        <div className="flex items-center text-sm px-2 bg-grey-lighter text-beige border border-beige-inactive border-opacity-50">
          <span>{LOADOUT_TYPES[type].label}</span>
        </div>

        {(attribute === "all" && (
          <div className="relative flex">
            <div>
              <Element size={24} type="DARK" />
            </div>
            <div className="-ml-3">
              <Element size={24} type="LIGHT" />
            </div>
            <div className="-ml-3">
              <Element size={24} type="FIRE" />
            </div>
            <div className="-ml-3">
              <Element size={24} type="WATER" />
            </div>
            <div className="-ml-3">
              <Element size={24} type="WIND" />
            </div>
          </div>
        )) || <Element size={24} type={attribute} />}
      </div>

      <Link href={`/loadout/${slug}`} passHref>
        <a className="absolute inset-0 z-10">
          <span className="sr-only">See more about {title}</span>
        </a>
      </Link>
    </div>
  );
}
