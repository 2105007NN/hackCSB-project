const Banner = () => {
  return (
    <div
      className="hero h-96 mb-8"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-4xl">
          <h1 className="mb-5 text-5xl font-bold">
            Change can start with a single step
          </h1>
          <p className="mb-5">
            Our online mental health tests can help make sense of your feelings
            and could be the first step towards getting the right help. Prof
            Uttom Chowdhury - MB ChB, MRC Psych - Consultant Child & Adolescent
            Psychiatrist
          </p>
          <button className="btn btn-primary text-xl">Take Tests</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
