import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false); // To check if we're in the browser

  useEffect(() => {
    setIsClient(true); // Set this to true when we're on the client

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Initial check
    if (isClient) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    // Cleanup event listener on unmount
    return () => {
      if (isClient) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [isClient]);

  return isMobile;
};

export default useIsMobile;
