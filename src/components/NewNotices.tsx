import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination, Navigation } from "swiper";
import Link from "next/link";
import useBreakpoint from "@hooks/useBreakpoint";
import classNames from "classnames";

const SLIDER_BREAKPOINTS = ["lg", "xl", "2xl"];

export default function NewNotices({ notifications }) {
  const breakpoint = useBreakpoint();

  return (
    <>
      <div className="pb-0 swiper--notices overflow-hidden relative lg:pb-16">
        {SLIDER_BREAKPOINTS.includes(breakpoint) && (
          <Swiper
            modules={[A11y, Pagination, Navigation]}
            slidesPerView={5}
            pagination={{ clickable: true }}
            navigation
            className="cursor-move"
          >
            {notifications.map((notification) => (
              <SwiperSlide key={notification.notification_id}>
                <div className="relative flex items-center justify-center h-28 w-52 bg-grey-dark border border-beige border-opacity-50">
                  {(notification.thumbnail_path && (
                    <img
                      className="object-contain mt-4 mb-2 md:mt-0 md:mb-0"
                      loading="lazy"
                      src={`https://web.app.nierreincarnation.com${notification.thumbnail_path}`}
                      alt={notification.title}
                    />
                  )) || (
                    <h3 className="text-2xl text-center line-clamp-3">
                      {notification.title}
                    </h3>
                  )}
                  <Link
                    href={`/notice/${notification.notification_id}`}
                    passHref
                  >
                    <a className="absolute inset-0 z-10">
                      <span className="sr-only">See notice</span>
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-2 pt-4 lg:hidden">
        {[...notifications].splice(0, 8).map((notification) => (
          <div
            key={notification.notification_id}
            className={classNames(
              "relative flex items-center justify-center bg-grey-dark",
              notification.thumbnail_path
                ? ""
                : "border border-beige border-opacity-50"
            )}
          >
            {(notification.thumbnail_path && (
              <img
                className="object-contain mt-4 mb-2 md:mt-0 md:mb-0"
                loading="lazy"
                src={`https://web.app.nierreincarnation.com${notification.thumbnail_path}`}
                alt={notification.title}
              />
            )) || (
              <h3 className="text-center line-clamp-3">{notification.title}</h3>
            )}
            <Link href={`/notice/${notification.notification_id}`} passHref>
              <a className="absolute inset-0 z-10">
                <span className="sr-only">See notice</span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
