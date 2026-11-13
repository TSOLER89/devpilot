type FlyingLogoProps = {
  isLoading: boolean;
};

function FlyingLogo({ isLoading }: FlyingLogoProps) {
  return (
    <div
      className={`flying-logo${isLoading ? " flying-logo--loading" : ""}`}
      aria-hidden="true"
    >
      <span className="flying-logo__orbit" />

      <svg
        className="flying-logo__code"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-10-4 12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="flying-logo__flight">
        <svg
          className="flying-logo__plane"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 2.5c-.8 0-1.5.7-1.5 1.5v5L4 13v2l6.5-2v5l-2 1.5V21l3.5-1 3.5 1v-1.5l-2-1.5v-5L20 15v-2l-6.5-4V4c0-.8-.7-1.5-1.5-1.5Z"
            fill="currentColor"
            transform="rotate(90 12 12)"
          />
        </svg>
      </span>
    </div>
  );
}

export default FlyingLogo;
