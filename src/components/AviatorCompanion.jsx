function AviatorCompanion({ compact = false, isCelebrating = false }) {
  return (
    <figure className={`aviator-companion${compact ? " aviator-companion--compact" : ""}${isCelebrating ? " aviator-companion--celebrating" : ""}`}>
      <img
        src={`${import.meta.env.BASE_URL}aviator.png`}
        alt="Aviator, DevPilot's friendly AI pilot companion"
        width="1312"
        height="1199"
      />
      <figcaption>Aviator</figcaption>
      <p className="aviator-feedback" role="status" aria-atomic="true">
        {isCelebrating ? "Great job!" : ""}
      </p>
    </figure>
  );
}

export default AviatorCompanion;
