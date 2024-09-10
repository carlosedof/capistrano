"use client";
import { useEffect, useState } from "react";
import { CaretUp } from "@phosphor-icons/react";
import useOutsideClick from "../hooks/useOutsideClick";
import Bio from "@/app/sections/bio/bio";
import Agenda from "@/app/sections/agenda/agenda";
import Cover from "@/app/sections/cover/cover";
import AlbumVideo from "@/app/sections/albumVideo/albumVideo";
import Classes from "@/app/sections/classes/classes";
import Footer from "@/app/sections/footer/footer";
import Header from "@/app/components/header/header";
import { useGeneralStore } from "@/store/generalStore";

export default function Home() {
  const { setFulldata } = useGeneralStore();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState();
  const [opacity, setOpacity] = useState(0);
  const fetchData = async () => {
    const response = await fetch("/api/general");
    const data = await response.json();
    setFulldata(data);
  };
  const handleScroll = (sectionId) => {
    const container = document.getElementById("home");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuVisible(false);
    }
  };

  const handleOutsideClick = () => {
    setIsMenuVisible(false);
  };

  const dropdownRef = useOutsideClick(handleOutsideClick);

  useEffect(() => {
    const container = document.getElementById("home");
    const handleScroll = () => {
      const scrollY = container.scrollTop; // Get the current scroll position
      const screenHeight = window.innerHeight;
      setScrollPosition(scrollY);
      const normalizedScroll = (scrollY % (2 * screenHeight)) / screenHeight;
      let newOpacity;
      if (normalizedScroll <= 1) {
        newOpacity = 0.25 + normalizedScroll * 0.4; // Increases from 0.3 to 0.7
      } else {
        newOpacity = 0.85 - (normalizedScroll - 1) * 0.4; // Decreases from 0.7 to 0.3
      }
      setOpacity(newOpacity);
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id={"home"}>
      <main className="flex flex-col items-center">
        <Header
          dropdownRef={dropdownRef}
          handleScroll={handleScroll}
          isMenuVisible={isMenuVisible}
          setIsMenuVisible={setIsMenuVisible}
          opacity={opacity}
        />
        <Cover />
        <AlbumVideo />
        <Agenda />
        <Bio />
        <Classes />
      </main>
      <Footer />
      {!!scrollPosition && (
        <button
          className={
            "fixed bottom-8 right-8 rounded border border-white/30 bg-white/10 p-2.5 shadow-sm shadow-black"
          }
          onClick={() => {
            document
              .getElementById("home")
              .scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <CaretUp weight={"fill"} className={"text-white/75"} />
        </button>
      )}
    </div>
  );
}
