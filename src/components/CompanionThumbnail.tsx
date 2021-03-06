import Image from "next/image";
import SVG from "react-inlinesvg";
import getModelPath from "@utils/getModelPath";
import dynamic from "next/dynamic";
import { useState } from "react";
import Element from "@components/Element";
const ModelWithNoSSR = dynamic(() => import("@components/Model"), {
  ssr: false,
});

export default function CostumeArtwork({ companion }): JSX.Element {
  const [isShowingModel, setIsShowingModel] = useState(false);

  return (
    <div
      className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 w-full"
      style={{ height: "222px" }}
    >
      <div className="bordered-lg bg-grey-dark h-full w-full">
        <div className="relative z-10 h-full w-full">
          {(isShowingModel && (
            <ModelWithNoSSR
              path={getModelPath("companion", `sk_${companion.ActorAssetId}`)}
            />
          )) || (
            <div className="flex justify-center">
              <Image
                src={`https://s3.eu-central-1.wasabisys.com/rein-ui/companion/${companion.ActorAssetId}/${companion.ActorAssetId}_full.png`}
                alt={companion.ActorAssetId}
                layout="intrinsic"
                height="222"
                width="153"
              />
            </div>
          )}
        </div>

        <div className="absolute inset-0 z-0">
          <div className="absolute -left-24 top-24 transform -scale-1">
            <SVG
              src="/decorations/square-right.svg"
              className="h-48 filter brightness-30 floating"
            />
          </div>

          <SVG
            src="/decorations/square-right.svg"
            className="h-48 absolute -right-20 -top-16 filter brightness-30 floating"
          />
          <SVG
            src="/decorations/c_rect_inside.svg"
            className="absolute -left-64 floating"
          />
          <SVG
            src="/decorations/c_rect_outside.svg"
            className="absolute -left-64 floating"
          />
        </div>
      </div>

      <div className="absolute top-4 left-4 w-42 h-24 p-1 z-50">
        <button
          className="btn"
          onClick={() => setIsShowingModel(!isShowingModel)}
        >
          {(isShowingModel && "View Artwork") || "View 3D Model"}
        </button>
      </div>

      <div className="absolute top-6 right-8">
        <Element type={companion.AttributeType} />
      </div>
    </div>
  );
}
