import classNames from "classnames";
import SVG from "react-inlinesvg";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure";
import { useState } from "react";
import { notification } from "generated/dump";

const EVENT_TYPES = {
  Event: "Event",
  Issue: "Issue",
  SummonsUpdate: "Summons Update",
  Campaign: "Campaign",
};

const intl = new Intl.DateTimeFormat(navigator.language, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Notice({
  title,
  body,
  information_type,
  notification_id,
  release_time,
  thumbnail_path,
}: notification): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  const publishedDate = intl.format(new Date(release_time));

  return (
    <Disclosure open={isOpen} onChange={() => setOpen(!isOpen)}>
      <div className="w-full">
        <DisclosureButton className="w-full">
          <div className="relative cursor-pointer border border-beige border-opacity-20">
            <div
              className={classNames(
                "flex flex-col md:flex-row md:items-center gap-x-4 bg-beige-darker filter hover:bg-grey-dark transition ease-out-cubic pb-8",
                !thumbnail_path && "p-4 md:pb-4",
                thumbnail_path && "md:pb-0",
                isOpen && "bg-grey-dark"
              )}
            >
              {thumbnail_path && (
                <img
                  className="h-28 object-contain mt-4 mb-2 md:mt-0 md:mb-0"
                  src={`https://web.app.nierreincarnation.com${thumbnail_path}`}
                  alt=""
                />
              )}
              <div className="flex flex-col items-center md:items-baseline">
                <h3 className="font-labor font-semibold text-base md:text-xl text-center md:text-left max-w-xs mx-auto md:mx-0 md:max-w-full">
                  {title}
                </h3>
                <time className="text-sm">{publishedDate}</time>
              </div>
              <div className="md:hidden">
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 btn w-32 font-semibold z-10">
                  Read
                  <SVG
                    className="transform -rotate-90 h-6 text-black"
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
