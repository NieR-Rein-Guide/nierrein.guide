import { CDN_URL } from "@config/constants";
import { Tooltip } from "@mui/material";
import { costume_ability, weapon_ability } from "@prisma/client";
import SVG from "react-inlinesvg";

export default function AbilityThumbnail({
  ability,
  hasTooltip = true,
  children,
}: {
  ability: costume_ability | weapon_ability;
  hasTooltip?: boolean;
  children?: JSX.Element;
}) {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="relative transform">
        {hasTooltip && (
          <Tooltip
            className="cursor-help"
            title={
              <div
                className="text-center"
                dangerouslySetInnerHTML={{
                  __html: ability.description,
                }}
              ></div>
            }
          >
            <div className="absolute -top-2 -right-2 z-20 flex items-center justify-center bg-grey-lighter text-beige border border-beige rounded-full h-5 w-5 font-labor">
              ?
            </div>
          </Tooltip>
        )}
        <SVG src="/decorations/frame-ability.svg" className="h-12 w-12" />
        <div className="h-12 w-12 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <img
            className="h-6"
            alt=""
            src={`${CDN_URL}${ability.image_path_base}standard.png`}
          />
        </div>
      </div>

      {children || (
        <span className="mt-1 text-sm text-center leading-none">
          {ability.name}
        </span>
      )}
    </div>
  );
}
