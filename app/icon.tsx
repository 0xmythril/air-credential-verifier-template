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
          <linearGradient id="icon-bg" x1="12" y1="8" x2="54" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#020817" />
            <stop offset="1" stopColor="#0B1220" />
          </linearGradient>
          <linearGradient id="icon-ring" x1="8" y1="10" x2="48" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#icon-bg)" />
        <g transform="translate(5 4) scale(0.92)">
          <path
            d="M0.935513 35.7499C3.76341 30.4124 14.9131 30.8249 25.8509 36.6499C36.7888 42.4874 43.354 51.5374 40.5386 56.8749C37.7107 62.2124 26.561 61.7999 15.6231 55.9749C4.68528 50.1374 -1.89239 41.0874 0.935513 35.7499ZM49.1468 8.06241C55.1639 8.06241 60.0473 18.1374 60.0473 30.5624C60.0473 42.9874 55.1639 53.0624 49.1468 53.0624C43.1298 53.0624 38.2463 42.9874 38.2463 30.5624C38.2463 18.1374 43.1298 8.06241 49.1468 8.06241ZM15.5858 5.27491C26.5236 -0.562587 37.6733 -0.962587 40.5012 4.37491C43.3291 9.71241 36.7514 18.7624 25.8135 24.5999C14.8757 30.4374 3.72604 30.8374 0.89814 25.4999C-1.92976 20.1624 4.64791 11.1124 15.5858 5.27491Z"
            fill="url(#icon-ring)"
          />
        </g>
        <path
          d="M22 34.5L29.5 41.5L42 26"
          stroke="#F8FAFC"
          strokeWidth="4.5"
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

