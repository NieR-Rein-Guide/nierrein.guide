import Link from "next/link";
import Element from "./Element";
import { tierlists } from "@prisma/client-nrg";
import { Chip } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { FiThumbsUp } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import { useTierlistsVotes } from "@store/tierlist-votes";
import { formatDistanceToNow } from "date-fns";
import Image from "next/legacy/image";
import { CDN_URL } from "@config/constants";

export default function TierlistListingItem({
  title,
  tierlist_id,
  attribute,
  type,
  slug,
  votes,
  created_at,
  updated_at,
}: tierlists) {
  const router = useRouter();
  const localVotes = useTierlistsVotes((state) => state.votes);
  const addVote = useTierlistsVotes((state) => state.addVote);

  const hasVoted = localVotes.includes(tierlist_id);

  async function vote() {
    if (hasVoted) {
      return;
    }

    await axios.post("/api/tierlists/vote", {
      tierlist_id,
    });

    addVote(tierlist_id);

    router.replace(router.asPath, undefined, {
      scroll: false,
    });
  }

  return (
    <div
      key={tierlist_id}
      className="flex flex-col gap-x-4 bg-grey-dark bordered relative p-8 transition hover:bg-grey-lighter w-full h-full"
    >
      <div className="absolute top-4 right-4 z-40">
        <Tooltip
          enterTouchDelay={0}
          title={hasVoted ? "You already voted for this tierlist" : "Vote"}
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
      <h3 className="text-xl truncate md:pr-12">{title}</h3>

      <div className="flex justify-between mt-4">
        <div className="flex items-center justify-center w-7 h-7 bg-grey-lighter text-beige border border-beige-inactive border-opacity-50 rounded-full">
          {type === "costumes" && (
            <Image
              src={`${CDN_URL}ui/character/character001004/character001004_standard.png`}
              height={24}
              width={24}
              alt="Costumes"
            />
          )}
          {type === "weapons" && (
            <Image
              src={`${CDN_URL}ui/weapon/wp001504/wp001504_standard.png`}
              height={24}
              width={24}
              alt="Weapons"
            />
          )}
        </div>

        {type === "weapons" && (
          <>
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
          </>
        )}

        <p className="text-xs text-beige">
          updated{" "}
          {formatDistanceToNow(new Date(updated_at), {
            addSuffix: true,
          })}
        </p>
      </div>

      <Link
        href={`/tierlist/${slug}`}
        passHref
        title={title}
        className="absolute inset-0 z-10">

        <span className="sr-only">See more about {title}</span>

      </Link>
    </div>
  );
}
