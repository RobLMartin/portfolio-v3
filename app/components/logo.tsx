const Logo = ({ height, width }: { height?: number; width?: number }) => (
  <svg
    width={width ?? 22}
    height={height ?? 29}
    viewBox="0 0 22 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="7.25" height="7.25" fill="currentColor" />
    <rect x="7.25" width="7.25" height="7.25" fill="currentColor" />
    <rect x="14.5" y="7.25" width="7.25" height="7.25" fill="currentColor" />
    <rect x="7.25" y="14.5" width="7.25" height="7.25" fill="currentColor" />
    <rect x="14.5" y="21.75" width="7.25" height="7.25" fill="currentColor" />
    <rect y="14.5" width="7.25" height="7.25" fill="currentColor" />
  </svg>
);

export default Logo;
