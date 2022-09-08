import { LOADOUT_TYPES } from "../store/loadout";
import Link from "next/link";
import Element from "./Element";
import { loadouts } from "@prisma/client-nrg";
import { Chip } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { FiThumbsUp } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import { useLoadoutsVotes } from "@store/votes";

export default function LoadoutListinItem({
  loadout_id,
  title,
  description,
  type,
  attribute,
  slug,
  votes,
}: loadouts) {
  const router = useRouter();
  const localVotes = useLoadoutsVotes((state) => state.votes);
  const addVote = useLoadoutsVotes((state) => state.addVote);

  const hasVoted = localVotes.includes(loadout_id);

  async function vote() {
    if (hasVoted) {
      return;
    }

    await axios.post("/api/loadouts/vote", {
      loadout_id,
    });

    addVote(loadout_id);

    router.replace(router.asPath, undefined, {
      scroll: false,
    });
  }

  return (
    <div
      key={loadout_id}
      className="flex flex-col gap-x-4 bg-grey-dark bordered relative p-8 transition hover:bg-grey-lighter overflow-hidden w-full h-full"
    >
      <div className="absolute top-4 right-4 z-40">
        <Tooltip
          title={hasVoted ? "You already voted for this loadout" : "Vote"}
        >
          <Chip
            className="pl-2"
            onClick={hasVoted ? undefined : vote}
            color={hasVoted ? "success" : "default"}
            variant={hasVoted ? "outlined" : "filled"}
            label={votes}
            icon={<FiThumbsUp />}
          />
        </Tooltip>
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
