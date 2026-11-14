const companions = {
  welcome: {
    image: "pilot-welcome.png",
    name: "Pilot",
    alt: "DevPilot pilot head with a microphone",
    message: "Ready for takeoff?",
    width: 1349,
    height: 1166,
  },
  active: {
    image: "quiz.png",
    name: "Co-Pilot",
    alt: "DevPilot holographic Co-Pilot with a quiz checklist",
    message: "Let's test your skills!",
    width: 1312,
    height: 1199,
  },
  completed: {
    image: "aviator.png",
    name: "Aviator",
    alt: "Aviator, DevPilot's friendly AI pilot companion giving a thumbs-up",
    message: "Flight completed! Great job!",
    width: 1312,
    height: 1199,
  },
};

function AviatorCompanion({ stage = "active", compact = false, isCelebrating = false, isEncouraging = false }) {
  const companion = companions[stage];
  return (
    <figure className={`aviator-companion${compact ? " aviator-companion--compact" : ""}${isCelebrating ? " aviator-companion--celebrating" : ""}${isEncouraging ? " aviator-companion--encouraging" : ""}`}>
      <img
        src={`${import.meta.env.BASE_URL}${companion.image}`}
        alt={companion.alt}
        width={companion.width}
        height={companion.height}
      />
      <figcaption>
        {companion.name}
        <span className="aviator-message">{companion.message}</span>
      </figcaption>
      <p className="aviator-feedback" role="status" aria-atomic="true">
        {isCelebrating ? "Great job!" : isEncouraging ? "Keep learning!" : ""}
      </p>
    </figure>
  );
}

export default AviatorCompanion;
