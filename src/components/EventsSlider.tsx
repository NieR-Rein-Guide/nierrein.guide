import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper";
import { Event } from "@models/types";
import Image from "next/image";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import SVG from "react-inlinesvg";
import { useState } from "react";
import Squares from "./decorations/Squares";

interface EventsSlider {
  currentEvents: Event[];
}

export default function EventsSlider({
  currentEvents,
}: EventsSlider): JSX.Element {
  const [activeEvent, setActiveEvent] = useState(currentEvents[0]);

  function handleSlideChange(event) {
    setActiveEvent(currentEvents[event.activeIndex]);
  }

  return (
    <div className="grid grid-cols-third-one gap-y-10 lg:gap-x-10">
      <section className="p-0 overflow-hidden">
        <h2 className="overlap text-4xl font-bold">Events</h2>

        <div className="px-16 pt-16 pb-10 relative">
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
                <div className="flex justify-between mb-12">
                  <h3 className="font-labor text-2xl text-beige-text">
                    {event.title}
                  </h3>
                  <span className="mr-8 text-grey-detail">
                    Ends in {formatDistanceToNow(new Date(event.end_date))}
                  </span>
                  <div className="absolute mt-6 hidden lg:flex items-center w-full">
                    <span
                      style={{ height: "1px" }}
                      className="w-full bg-beige-dark"
                    ></span>
                    <SVG src="/decorations/inner-square.svg" />
                  </div>
                </div>
                <Image
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
      </section>

      <div className="border border-beige-inactive bg-grey-lighter">
        <div className="bg-grey-foreground py-4 text-center">
          <h3 className="text-2xl text-beige-inactive">Other Events</h3>
        </div>

        <div className="flex flex-col justify-between px-8 py-5 h-9/10">
          <div className="border-3 relative">
            <div className="flex justify-center items-center py-6 mr-2">
              <img
                className="-mr-3 h-14"
                src="/ui/skill/skill100001_standard.png"
                alt="skill"
              />
              <div>
                <h3 className="text-beige-accent text-2xl">GUERILLA</h3>
                <span className="tracking-wider">in 35 minutes</span>
              </div>
            </div>
            <Squares />
          </div>

          {currentEvents
            .filter((event) => event.slug !== activeEvent.slug)
            .slice(0, 3)
            .map((event) => (
              <div key={event.slug} className="border-3 relative select-none">
                <Image
                  layout="responsive"
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
            ))}
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
}
