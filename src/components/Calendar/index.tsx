import Timeline, {
  TimelineMarkers,
  TodayMarker,
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { add, sub } from "date-fns";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Calendar({ groups, items }) {
  const debugLibrary = useRef(true);
  const ABSOLUTE_MAX = items[0].end_time.getTime();
  const ABSOLUTE_MIN = items[items.length - 1].start_time.getTime();
  const DEFAULT_TIME_START = sub(new Date(), { weeks: 3 }).getTime();
  const DEFAULT_TIME_END = add(new Date(), { weeks: 3 }).getTime();

  const [timeStart, setTimeStart] = useState(DEFAULT_TIME_START);
  const [timeEnd, setTimeEnd] = useState(DEFAULT_TIME_END);

  useEffect(() => {
    setTimeout(() => {
      debugLibrary.current = false;
    }, 2000);
  }, []);

  const onPrevClick = () => {
    const zoom = timeEnd - timeStart;
    const visibleTimeStart = timeStart - zoom;
    const visibleTimeEnd = timeEnd - zoom;
    setTimeStart(visibleTimeStart);
    setTimeEnd(visibleTimeEnd);
  };
  const onNextClick = () => {
    const zoom = timeEnd - timeStart;
    const visibleTimeStart = timeStart + zoom;
    const visibleTimeEnd = timeEnd + zoom;
    setTimeStart(visibleTimeStart);
    setTimeEnd(visibleTimeEnd);
  };

  const handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
    if (debugLibrary.current) {
      console.log("lol");
      return;
    }
    const scrollingToLeft = timeEnd > visibleTimeEnd;
    console.log(scrollingToLeft);
    if (scrollingToLeft) {
      onPrevClick();
    } else {
      onNextClick();
    }
  };

  return (
    <Timeline
      groups={groups}
      items={items}
      itemsSorted
      itemTouchSendsClick={false}
      itemHeightRatio={1}
      showCursorLine
      canMove={false}
      canResize={false}
      visibleTimeStart={timeStart}
      visibleTimeEnd={timeEnd}
      itemRenderer={itemRenderer}
      groupRenderer={groupRenderer}
      canChangeGroup={false}
      onTimeChange={handleTimeChange}
    >
      <TimelineHeaders className="sticky">
        <SidebarHeader>
          {({ getRootProps }) => {
            return (
              <div
                className="flex items-center justify-center"
                {...getRootProps()}
              >
                <button
                  className="btn"
                  onClick={() => {
                    setTimeStart(DEFAULT_TIME_START);
                    setTimeEnd(DEFAULT_TIME_END);
                  }}
                >
                  Today
                </button>
              </div>
            );
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>

      <TimelineMarkers>
        <TodayMarker>
          {({ styles }) => (
            // date is value of current date. Use this to render special styles for the marker
            // or any other custom logic based on date:
            // e.g. styles = {...styles, backgroundColor: isDateInAfternoon(date) ? 'red' : 'limegreen'}
            <div style={{ ...styles, backgroundColor: "red" }} />
          )}
        </TodayMarker>
      </TimelineMarkers>
    </Timeline>
  );
}

const itemRenderer = ({ item, itemContext, getItemProps }) => {
  return (
    <div
      className="relative bg transition hover:bg-beige text-grey-dark"
      {...getItemProps({
        style: {
          borderWidth: 1,
          borderRadius: 4,
          borderLeftWidth: itemContext.selected ? 3 : 1,
          borderRightWidth: itemContext.selected ? 3 : 1,
        },
        onMouseDown: () => {
          console.log("on item click", item);
        },
      })}
    >
      <div
        className="flex items-center justify-center text-lg"
        style={{
          overflow: "hidden",
          paddingLeft: 3,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          backgroundSize: "cover",
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${item.image?.formats?.small?.url}) center`,
        }}
      >
        {itemContext.title}
      </div>

      <Link href={`/event/${item.slug}`} passHref>
        <a className="absolute inset-0 z-10">
          <span className="sr-only">See more about {item.title}</span>
        </a>
      </Link>
    </div>
  );
};

const groupRenderer = ({ group }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="title">{group.title}</span>
    </div>
  );
};
