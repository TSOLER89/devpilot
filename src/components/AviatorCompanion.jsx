function AviatorCompanion({ compact = false }) {
  return (
    <figure className={`aviator-companion${compact ? " aviator-companion--compact" : ""}`}>
      <img
        src={`${import.meta.env.BASE_URL}aviator.png`}
        alt="Aviator, DevPilot's friendly AI pilot companion"
        width="1312"
        height="1199"
      />
      <figcaption>Aviator</figcaption>
    </figure>
  );
}

export default AviatorCompanion;
