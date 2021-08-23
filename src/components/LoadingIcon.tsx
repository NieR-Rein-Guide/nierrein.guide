import { gsap } from "gsap";
import { createRef, useEffect } from "react";

/**
 * Original code by B0und
 * Translated to a React component
 *
 * @see https://github.com/B0und/nierAnimation
 */
export default function LoadingIcon({ ...props }): JSX.Element {
  const element = createRef<SVGSVGElement>();
  const querySelector = gsap.utils.selector(element);

  useEffect(() => {
    const master = gsap.timeline({ repeat: -1, repeatDelay: 0.1 });

    const circle = querySelector("#circle"),
      topSquare = querySelector("#rectTop"),
      bottomSquare = querySelector("#rectBottom"),
      leftSquare = querySelector("#rectLeft"),
      rightSquare = querySelector("#rectRight"),
      ghost = querySelector("#ghost"),
      leftLine = querySelector("#leftLine"),
      rightLine = querySelector("#rightLine");

    gsap.set(circle, { transformOrigin: "center center" });

    function expandCircle() {
      const tl = gsap.timeline();
      tl.from(circle, {
        duration: 0.3,
        rotation: 0.01,
        scale: 0.65,
        ease: "easeOut",
      });
      return tl;
    }

    function rotateCircle() {
      const tl = gsap.timeline();
      tl.to(circle, {
        duration: 0.5,
        rotation: 90,
        opacity: 0.6,
        ease: "easeInOut",
      });
      return tl;
    }

    function shrinkCircle() {
      const tl = gsap.timeline();
      tl.to(circle, {
        duration: 0.6,
        scale: 0.6,
        ease: "none",
      });
      return tl;
    }

    function animateSquares() {
      const squaresTl = gsap.timeline();

      const squaresDuration = 0.125;
      const squaresScale = 0.8;

      gsap.set([topSquare, bottomSquare, leftSquare, rightSquare], {
        transformOrigin: "center",
        rotation: 45,
        scale: 0,
      });

      const topTl = gsap.timeline();
      topTl
        .to(topSquare, { duration: squaresDuration, scale: squaresScale })
        .to(
          topSquare,
          { duration: squaresDuration, y: "-= 5", ease: "easeInOut" },
          "<0.1"
        )
        .to(topSquare, { duration: squaresDuration, scale: 0 });

      const bottomTl = gsap.timeline();
      bottomTl
        .to(bottomSquare, { duration: squaresDuration, scale: squaresScale })
        .to(
          bottomSquare,
          { duration: squaresDuration, y: "+= 5", ease: "easeInOut" },
          "<0.1"
        )
        .to(bottomSquare, { duration: squaresDuration, scale: 0 });

      const rightTl = gsap.timeline();
      rightTl
        .to(rightSquare, { duration: squaresDuration, scale: squaresScale })
        .to(
          rightSquare,
          { duration: squaresDuration, x: "+= 5", ease: "easeInOut" },
          "<0.1"
        )
        .to(rightSquare, { duration: squaresDuration, scale: 0 });

      const leftTl = gsap.timeline();
      leftTl
        .to(leftSquare, { duration: squaresDuration, scale: squaresScale })
        .to(
          leftSquare,
          { duration: squaresDuration, x: "-= 5", ease: "easeInOut" },
          "<0.1"
        )
        .to(leftSquare, { duration: squaresDuration, scale: 0 });

      squaresTl.add(topTl);
      squaresTl.add(bottomTl, "<");
      squaresTl.add(rightTl, "<");
      squaresTl.add(leftTl, "<");

      return squaresTl;
    }

    function animateGhost() {
      const tl = gsap.timeline();

      //   scale ghost
      tl.to(ghost, {
        duration: 0.07,
        scaleX: 0.8,
        scaleY: 1.1,
        transformOrigin: "center",
        ease: "easeInOut",
      })
        // move ghost up
        .to(
          ghost,
          {
            duration: 0.2,
            y: "-=10",
            ease: "easeInOut",
          },
          "<0.1"
        )
        // move ghost down
        .to(ghost, {
          duration: 0.4,
          scaleX: 1,
          scaleY: 1,
          y: "+=10",
          //   ease: "power2.in",
          ease: "none",
        });

      return tl;
    }

    function animateLines() {
      const tl = gsap.timeline();
      gsap.set(leftLine, { strokeDasharray: "1 123", strokeDashoffset: "0" });
      gsap.set(rightLine, { strokeDasharray: "1 123", strokeDashoffset: "0" });

      tl.to(leftLine, {
        duration: 0.3,
        strokeDasharray: "50 74",
        ease: "none",
      }).to(
        rightLine,
        {
          duration: 0.3,
          strokeDasharray: "50 74",
          ease: "none",
        },
        "<"
      );

      tl.to(
        leftLine,
        {
          duration: 0.8,
          strokeDashoffset: "-198 ",
          ease: "none",
        },
        "<0.1"
      ).to(
        rightLine,
        {
          duration: 0.8,
          strokeDashoffset: "-198 ",
          ease: "none",
        },
        "<"
      );

      tl.to(
        leftLine,
        {
          duration: 0.3,
          strokeDasharray: "0 123",
          strokeDashoffset: "-248",
          ease: "none",
        },
        "-=0.25"
      );

      tl.to(
        rightLine,
        {
          duration: 0.3,
          strokeDasharray: "0 123",
          strokeDashoffset: "-248",
          ease: "none",
        },
        "<"
      );

      return tl;
    }

    master.add(expandCircle());
    master.add(animateSquares());
    master.add(rotateCircle(), "<0.125");
    master.add(shrinkCircle(), "<");
    master.add(animateGhost(), 0);
    master.add(animateLines(), 0);

    return () => {
      master.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg
      {...props}
      width="128"
      height="128"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
      ref={element}
    >
      <g id="ResultSvg">
        <g id="circle">
          <path
            id="Ellipse 2"
            d="M40.5471 24.3854C54.9097 15.904 72.9299 15.8843 87.2879 24.3854M24.3704 40.5621C15.889 54.9247 15.8693 72.9449 24.3704 87.3029M103.495 87.3029C111.976 72.9403 111.996 54.9201 103.495 40.5621M87.2879 103.48C72.9253 111.961 54.9051 111.981 40.5471 103.48"
            stroke="#A19E8E"
          />
          <rect
            id="Rectangle 10"
            x="93"
            y="29"
            width="6"
            height="6"
            fill="#A19E8E"
          />
          <rect
            id="Rectangle 12"
            x="29"
            y="29"
            width="6"
            height="6"
            fill="#A19E8E"
          />
          <rect
            id="Rectangle 11"
            x="93"
            y="93"
            width="6"
            height="6"
            fill="#A19E8E"
          />
          <rect
            id="Rectangle 13"
            x="29"
            y="93"
            width="6"
            height="6"
            fill="#A19E8E"
          />
        </g>
        <rect
          id="blackRect"
          x="18.7452"
          y="64"
          width="64"
          height="64"
          transform="rotate(-45 18.7452 64)"
          fill="#33312F"
        />
        <g id="squares">
          <rect
            id="rectTop"
            x="57.9853"
            y="2.48529"
            width="12"
            height="12"
            fill="#A19E8E"
          />
          <rect
            id="rectBottom"
            x="57.9853"
            y="113.485"
            width="12"
            height="12"
            fill="#A19E8E"
          />
          <rect
            id="rectLeft"
            x="2.48529"
            y="58"
            width="12"
            height="12"
            fill="#A19E8E"
          />
          <rect
            id="rectRight"
            x="113.485"
            y="58"
            width="12"
            height="12"
            fill="#A19E8E"
          />
        </g>
        <g id="ghost">
          <path
            id="Vector 1"
            d="M48 75.3899C48 73.4222 52.1372 59.6479 55.6247 56.451C58.5763 53.7455 67.9775 52.665 71.6121 56.451C77.5151 62.6 79 70.5 80.9586 75.1439C79.4828 77.1116 79.5 77.5 78 77C76.3038 76.4346 75.5 77.5 75.5 79C75.5 80.5 72.7864 81.9516 71.3106 80.7218C69.8349 79.492 68.9066 80.3091 68.1687 80.801C65.5313 82.5592 63.5381 82.1945 60.298 81.2929C60.0858 81.2339 59.5601 81.047 59.3141 80.801C59.3141 79.5712 58.8688 79.4062 56.6086 79.8172C56.6086 79.8172 53.4111 79.8171 53.1651 78.0954C52.9192 76.3737 50.2136 76.9886 49.9677 77.3576C49.7217 77.7265 48 77.3576 48 75.3899Z"
            fill="#A19E8E"
          />
          <ellipse
            id="Ellipse 3"
            cx="59.4079"
            cy="62.5785"
            rx="1.72172"
            ry="2.4596"
            transform="rotate(-8.36956 59.4079 62.5785)"
            fill="#393632"
          />
          <ellipse
            id="Ellipse 4"
            cx="67.7705"
            cy="62.5785"
            rx="1.72172"
            ry="2.4596"
            transform="rotate(8.37 67.7705 62.5785)"
            fill="#393632"
          />
        </g>
        <path
          id="rightLine"
          d="M62.8406 20L106.681 63.8406L62.5218 108"
          stroke="#A19E8E"
          strokeWidth="4"
        />
        <path
          id="leftLine"
          d="M65.5 108L21.5 64L65.5 20"
          stroke="#A19E8E"
          strokeWidth="4"
        />
        <path
          id="Rectangle 14"
          d="M62.7805 19.9722L64 18.7527L65.2195 19.9722L65.1685 28.557L63.9429 28.5571L62.7174 28.5571L62.7805 19.9722Z"
          fill="#33312F"
        />
        <path
          id="Rectangle 15"
          d="M108.047 62.7744L109.267 63.9939L108.047 65.2134L99.4623 65.1624L99.4623 63.9368L99.4623 62.7113L108.047 62.7744Z"
          fill="#33312F"
        />
        <path
          id="Rectangle 16"
          d="M65.2255 108L64.0061 109.219L62.7866 108L62.8376 99.4151L64.0631 99.4151L65.2887 99.4151L65.2255 108Z"
          fill="#33312F"
        />
        <path
          id="Rectangle 17"
          d="M20 65.2255L18.7805 64.0061L20 62.7866L28.5849 62.8376L28.5849 64.0631L28.5849 65.2887L20 65.2255Z"
          fill="#33312F"
        />
      </g>
    </svg>
  );
}
