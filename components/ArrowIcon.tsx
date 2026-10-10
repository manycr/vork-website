type Direction = "left" | "right" | "down" | "up-right";

export function ArrowIcon({
  direction = "right",
  className = "h-5 w-5",
}: {
  direction?: Direction;
  className?: string;
}) {
  const rotation = {
    left: "rotate-180",
    right: "",
    down: "rotate-90",
    "up-right": "-rotate-45",
  }[direction];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`${className} ${rotation}`}
    >
      <path
        d="M4.75 12h14.5m-5.5-5.5 5.5 5.5-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
