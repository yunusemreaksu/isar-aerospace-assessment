"use client";

import ReactLoading, { LoadingType } from "react-loading";

type Props = {
  type: LoadingType;
  color: string;
  delay?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
};

export default function LoadingSpinner({
  type,
  color,
  delay,
  height,
  width,
  className,
}: Props) {
  return (
    <div className="flex w-full items-center justify-center">
      <ReactLoading
        type={type}
        color={color}
        delay={delay}
        height={height}
        width={width}
        className={className}
      />
    </div>
  );
}
