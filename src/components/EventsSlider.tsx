import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper";
import { Event } from "@models/types";
import Image from "next/image";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import SVG from "react-inlinesvg";
import { useState } from "react";
import Squares from "./decorations/Squares";
import Link from "next/link";
import useGuerilla from "hooks/useGuerilla";

interface EventsSlider {
  currentEvents: Event[];
}

export default function EventsSlider({
  currentEvents,
}: EventsSlider): JSX.Element {
  const [activeEvent, setActiveEvent] = useState(currentEvents[0]);
  const nextGuerilla = useGuerilla();

  function handleSlideChange(event) {
    setActiveEvent(currentEvents[event.activeIndex]);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-third-one gap-y-10 lg:gap-x-10">
      <section className="p-0 overflow-hidden">
        <h2 className="overlap text-4xl font-bold">Events</h2>

        <div className="px-8 py-8 md:px-16 md:pt-16 pb-10 relative">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            spaceBetween={100}
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange}
            navigation
          >
            {currentEvents.map((event, index) => (
              <SwiperSlide key={index} className="select-none">
                <div className="flex flex-col lg:flex-row items-start justify-between mt-4 mb-12 md:mt-0">
                  <h3 className="font-labor text-2xl text-beige-text">
                    {event.title}
                  </h3>
                  <SVG
                    className="lg:hidden"
                    src="/decorations/small-title-separator.svg"
                  />
                  <span className="mr-8 text-grey-detail">
                    Ends in {formatDistanceToNow(new Date(event.end_date))}
                  </span>
                  <div className="hidden absolute mt-6 lg:flex items-center w-full">
                    <span
                      style={{ height: "1px" }}
                      className="w-full bg-beige-dark"
                    ></span>
                    <SVG src="/decorations/inner-square.svg" />
                  </div>
                </div>
                <Image
                  layout="responsive"
                  objectFit="cover"
                  height={500}
                  width={800}
                  src={
                    event.image.formats?.medium?.url ??
                    event.image.formats?.small.url ??
                    event.image.formats?.thumbnail?.url
                  }
                  alt=""
                  placeholder="blur"
                  blurDataURL={
                    event.image.formats?.medium?.hash ??
                    event.image.formats?.small.hash ??
                    event.image.formats?.thumbnail?.hash
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Link href={`/event/${activeEvent.slug}`}>
          <a className="btn absolute bottom-6 sm:bottom-7 left-1/2 transform -translate-x-1/2 z-50">
            See Event
          </a>
        </Link>
      </section>

      <div className="border border-beige-inactive bg-grey-lighter">
        <div className="bg-grey-foreground py-4 text-center">
          <h3 className="text-2xl text-beige-inactive">Other Events</h3>
        </div>

        <div className="slider__other-events grid grid-rows-4 px-8 gap-y-4 py-4 h-9/10">
          <div className="border-3 relative h-32">
            <div className="flex justify-center items-center py-6 mr-2 h-full">
              <img
                className="-mr-3 h-14"
                src="/ui/skill/skill100001_standard.png"
                alt="skill"
              />
              <div>
                <h3 className="text-beige-accent text-2xl">GUERILLA</h3>
                <span>
                  {(nextGuerilla &&
                    formatDistanceToNow(nextGuerilla, {
                      addSuffix: true,
                    })) ||
                    "calculating..."}
                </span>
              </div>
            </div>
            <Squares />
          </div>

          {currentEvents
            .filter((event) => event.slug !== activeEvent.slug)
            .slice(0, 3)
            .map((event) => (
              <Link key={event.slug} href={event.slug} passHref={true}>
                <a className="slider__other-event">
                  <div className="border-3 border-beige-text hover:border-beige transition-colors relative select-none h-32">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      height={128}
                      width={232}
                      src={
                        event.image.formats?.medium?.url ??
                        event.image.formats?.small.url ??
                        event.image.formats?.thumbnail?.url
                      }
                      alt={`Thumbnail ${event.title}`}
                      placeholder="blur"
                      blurDataURL={
                        event.image.formats?.medium?.hash ??
                        event.image.formats?.small.hash ??
                        event.image.formats?.thumbnail?.hash
                      }
                    />
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
