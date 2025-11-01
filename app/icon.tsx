import { ImageResponse } from "next/og";

const renderIcon = (dimension: number) =>
  new ImageResponse(
    (
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="icon-bg" x1="12" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0056D2" />
            <stop offset="1" stopColor="#2B7BFF" />
          </linearGradient>
          <linearGradient id="icon-glow" x1="20" y1="16" x2="46" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0F9FF" stopOpacity="0.65" />
            <stop offset="1" stopColor="#BFDBFE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#icon-bg)" />
        <circle cx="32" cy="32" r="22" fill="url(#icon-glow)" opacity="0.7" />
        <path
          d="M44 24.5a14.5 14.5 0 1 0 0 15"
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 26.5a12.5 12.5 0 1 0 0 11"
          fill="none"
          stroke="#0E3EA8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    {
      width: dimension,
      height: dimension,
    }
  );

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return renderIcon(size.width);
}

export { renderIcon };

