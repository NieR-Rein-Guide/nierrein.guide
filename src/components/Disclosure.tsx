import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";
import SVG from "react-inlinesvg";
import classNames from "classnames";

const Accordion = ({
  className = "",
  initialHeight,
  children,
}: {
  initialHeight?: string;
  className?: string;
  children: JSX.Element[];
}) => {
  const defaultHeight = initialHeight || "48px";

  const [open, toggle] = useState(false);

  const [contentHeight, setContentHeight] = useState(defaultHeight);

  const [ref, { height }] = useMeasure();

  const expand = useSpring({
    config: { friction: 25 },
    height: open ? `${contentHeight}px` : defaultHeight,
  });

  const scale = useSpring({
    config: { friction: 25 },
    transform: open ? "scale(0.6)" : "scale(0.8)",
  });

  useEffect(() => {
    setContentHeight(height.toString());

    // @ts-expect-error idk
    window.addEventListener("resize", setContentHeight(height));

    // @ts-expect-error idk
    return window.removeEventListener("resize", setContentHeight(height));
  }, [height]);

  return (
    <div
      className={classNames(
        "bg-grey-lighter bordered relative px-6 py-4 w-full",
        className
      )}
    >
      <animated.div className="overflow-hidden" style={expand}>
        <div ref={ref}>{children}</div>
      </animated.div>
      <div
        className="left-0 -bottom-4
       absolute w-full flex justify-center items-end"
      >
        <animated.button
          className="btn"
          onClick={() => toggle(!open)}
          style={scale}
        >
          {open ? "Close" : "Expand"}
        </animated.button>
      </div>
    </div>
  );
};

export default Accordion;
