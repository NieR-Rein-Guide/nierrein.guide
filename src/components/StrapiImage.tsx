import Image from "next/legacy/image";
import {
  StrapiImage as StrapiImageType,
  StrapiImageFormats,
} from "@models/types";

type LayoutValue = "fill" | "fixed" | "intrinsic" | "responsive" | undefined;

export default function StrapiImage({
  expectedWidth,
  formats,
  alt,
  layout = "responsive",
  className,
}: {
  expectedWidth: number;
  formats: StrapiImageFormats;
  alt: string;
  layout?: LayoutValue;
  className?: string | undefined;
}): JSX.Element {
  const usedFormat = chooseFormat(formats, expectedWidth);
  return (
    <Image
      quality={100}
      layout={layout}
      src={usedFormat?.url}
      alt={alt}
      className={className}
      height={usedFormat?.height}
      width={usedFormat?.width}
    />
  );
}

function chooseFormat(formats: StrapiImageFormats, expectedWidth: number) {
  let maxDiff = Infinity;
  let retFormat: StrapiImageType;
  for (const formatKey in formats) {
    const format = formats[formatKey] as StrapiImageType;
    const diff = Math.abs(format.width - expectedWidth);
    // fast path for perfect match (<=1 because precisions)
    if (diff <= 1) {
      return format;
    }
    if (diff < maxDiff) {
      if (format.width > expectedWidth) {
        maxDiff = diff;
      }
      retFormat = format;
    }
  }
  return retFormat;
}
