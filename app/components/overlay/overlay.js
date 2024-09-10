const Overlay = ({ opacity }) => {
  return (
    <>
      <img
        alt={"bg"}
        className={"fixed -z-20 h-full w-full object-cover brightness-75"}
        src={
          "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <div
        className={"fixed -z-10 h-full w-full bg-black"}
        style={{
          opacity: opacity,
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
};

export default Overlay;
