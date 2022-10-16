import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination, Navigation } from "swiper";
import Link from "next/link";

export default function NewNotices({ notifications }) {
  return (
    <div className="swiper--notices overflow-hidden relative pb-16">
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
              <Link href={`/notice/${notification.notification_id}`} passHref>
                <a className="absolute inset-0 z-10">
                  <span className="sr-only">See notice</span>
                </a>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
