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

      <svg
        className="flying-logo__plane"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 12 3 5.5v4l10 2.5-10 2.5v4L22 12Z" fill="currentColor" />
      </svg>
    </div>
  );
}

export default FlyingLogo;
