import classNames from "classnames";
import SVG from "react-inlinesvg";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure";
import { useEffect, useState } from "react";
import { notification } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

export const EVENT_TYPES = {
  Event: "Event",
  Issue: "Issue",
  SummonsUpdate: "Summons Update",
  Campaign: "Campaign",
};

export default function Notice({
  title,
  body,
  release_time,
  thumbnail_path,
}: notification): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  const [dateRelative, setDateRelative] = useState(
    formatDistanceToNow(new Date(release_time), {
      addSuffix: true,
    })
  );

  useEffect(() => {
    setDateRelative(
      formatDistanceToNow(new Date(release_time), {
        addSuffix: true,
      })
    );
  }, [release_time]);

  return (
    <Disclosure open={isOpen} onChange={() => setOpen(!isOpen)}>
      <div className="w-full">
        <DisclosureButton className="w-full">
          <div className="relative cursor-pointer border border-beige border-opacity-20">
            <div
              className={classNames(
                "flex flex-col md:flex-row md:items-center gap-x-4 bg-beige-darker filter hover:bg-grey-dark transition ease-out-cubic",
                !thumbnail_path && "pt-4 md:p-4",
                isOpen && "bg-grey-dark"
              )}
            >
              {thumbnail_path && (
                <img
                  className="h-28 object-contain mt-4 mb-2 md:mt-0 md:mb-0"
                  loading="lazy"
                  src={`https://web.app.nierreincarnation.com${thumbnail_path}`}
                  alt=""
                />
              )}
              <div className="flex flex-col items-center md:items-baseline">
                <h3 className="font-labor font-semibold text-base md:text-xl text-center md:text-left max-w-xs mx-auto md:mx-0 md:max-w-full">
                  {title}
                </h3>
                <time className="text-sm text-beige">{dateRelative}</time>
              </div>
              <div className="mt-4 md:hidden">
                <div className="relative bordered bg-grey-dark w-full font-semibold z-10 flex items-center justify-center py-4">
                  {isOpen ? "Close" : "Read"}
                  <SVG
                    className={classNames(
                      "absolute right-4 transform transition-transform ease-out-cubic h-6 text-beige-accent",
                      isOpen && "rotate-90",
                      !isOpen && "-rotate-90"
                    )}
                    src="/decorations/arrow-left.svg"
                  />
                </div>
              </div>
              <div className="absolute right-4 hidden md:block">
                <SVG
                  className={classNames(
                    "transform transition-transform ease-out-cubic h-6 text-beige-accent",
                    isOpen && "rotate-90",
                    !isOpen && "-rotate-90"
                  )}
                  src="/decorations/arrow-left.svg"
                />
              </div>
            </div>
          </div>
        </DisclosureButton>
        <DisclosurePanel>
          <div
            className="notice__body"
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
}
