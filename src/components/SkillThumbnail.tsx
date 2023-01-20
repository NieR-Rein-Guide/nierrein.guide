import { CDN_URL } from "@config/constants";
import { Tooltip } from "@mui/material";
import { weapon_skill, costume_skill } from "@prisma/client";
import SVG from "react-inlinesvg";

export default function SkillThumbnail({
  skill,
  hasTooltip = true,
  children,
}: {
  skill: weapon_skill | costume_skill;
  hasTooltip?: boolean;
  children?: JSX.Element;
}) {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="relative transform">
        <Tooltip
          className="cursor-help"
          title={
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: skill.description,
              }}
            ></div>
          }
        >
          <div>
            <SVG
              src="/decorations/frame-ability.svg"
              className="h-12 w-12 transform rotate-45"
            />
            <div className="h-12 w-12 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <img
                className="h-6"
                alt=""
                src={`${CDN_URL}${skill.image_path}`}
              />
            </div>
            <div className="absolute -top-2 -right-2 z-20 flex items-center justify-center bg-grey-lighter text-beige border border-beige rounded-full h-5 w-5 font-labor">
              ?
            </div>
          </div>
        </Tooltip>
      </div>

      {children || (
        <span className="mt-2 text-sm text-center leading-none">
          {skill.name}
        </span>
      )}
    </div>
  );
}
