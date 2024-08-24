const SBookmarkIcon = ({ saved }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill={saved ? "#1D4ED8" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M5 3v18l7-5 7 5V3z"
        fill={saved ? "#1D4ED8" : "none"} 
      />
    </svg>
  );

  export default SBookmarkIcon;
  