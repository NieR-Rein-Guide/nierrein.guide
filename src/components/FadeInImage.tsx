import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Img = styled.img`
  position: absolute;
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 0px;
  height: 0px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: none;
  background-size: contain;
  background-image: none;
  background-position: 0% 0%;
`;

export default function FadeInImage({
  src,
  alt,
  placeholderdataURL,
}: {
  src: string;
  alt: string;
  placeholderdataURL?: string;
}): JSX.Element {
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);

  const prevSrcRef: React.MutableRefObject<string> = useRef();
  const prevSrc = prevSrcRef.current;

  useEffect(() => {
    console.log(src, prevSrc);
    setCurrentImageLoaded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div
      style={{
        display: "inline-block",
        maxWidth: "100%",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
        margin: "0px",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          display: "block",
          maxWidth: "100%",
        }}
      >
        <img
          alt=""
          aria-hidden="true"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA0OCIgaGVpZ2h0PSIyMDQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg=="
          style={{
            maxWidth: "100%",
            display: "block",
            margin: "0px",
            border: "none",
            padding: "0px",
          }}
        ></img>
      </div>
      <Img
        alt={alt}
        src={src}
        onLoad={() => {
          setCurrentImageLoaded(true);
          prevSrcRef.current = src;
        }}
        style={{
          aspectRatio: "auto",
          transition: "opacity ease-in 500ms",
          transitionDuration: "500ms",
          transitionDelay: "0ms",
          // transitionDuration: !highResImageLoaded ? "500ms" : "100ms",
          // transitionDelay: !highResImageLoaded ? "0ms" : "150ms",
          opacity: currentImageLoaded ? 1 : 0,
        }}
        width={2048}
        height={2048}
      />
      {placeholderdataURL ? (
        <Img
          aria-hidden="true"
          alt=""
          src={placeholderdataURL}
          style={{
            filter: "blur(3px)",
            aspectRatio: "auto",
            transition: "opacity ease-in 500ms",
            transitionDuration: "500ms",
            transitionDelay: currentImageLoaded ? "0ms" : "150ms",
            opacity: currentImageLoaded ? 0 : 1,
          }}
          width={2048}
          height={2048}
        />
      ) : (
        <Img
          aria-hidden="true"
          alt=""
          src={prevSrc}
          style={{
            aspectRatio: "auto",
            transition: "opacity ease-in 500ms",
            transitionDuration: "500ms",
            transitionDelay: "0ms",
            // transitionDuration: highResImageLoaded ? "500ms" : "100ms",
            // transitionDelay: highResImageLoaded ? "0ms" : "150ms",
            opacity: currentImageLoaded ? 0 : 1,
          }}
          width={2048}
          height={2048}
        />
      )}
    </div>
  );
}
