import useIsMobile from "@/hooks/useBreakpoint";

const Cover = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className={
        "flex h-screen w-full flex-col items-center justify-center gap-6"
      }
    >
      <h1
        className={
          "text-center text-3xl font-light uppercase text-white text-shadow sm:text-6xl"
        }
        style={{ letterSpacing: isMobile ? 12 : 32 }}
      >
        {`EP Arredio`}
      </h1>
      <h1
        className={
          "text-center text-lg font-light uppercase text-white text-shadow"
        }
        style={{ letterSpacing: isMobile ? 8 : 12 }}
      >
        Vinícius Capistrano
      </h1>
    </div>
  );
};

export default Cover;
