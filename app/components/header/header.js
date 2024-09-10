import {
  Calendar,
  InstagramLogo,
  List,
  Lock,
  MusicNote,
  PersonSimple,
  SpotifyLogo,
  X,
  House,
  YoutubeLogo,
  Brain,
  GraduationCap,
  ReadCvLogo,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Overlay from "@/app/components/overlay/overlay";

const Header = ({
  dropdownRef,
  handleScroll,
  isMenuVisible,
  setIsMenuVisible,
  opacity,
}) => {
  const route = useRouter();
  return (
    <>
      <Overlay opacity={opacity} />
      <button
        className={"absolute right-8 top-4 z-20 hidden text-white sm:flex"}
        onClick={() => setIsMenuVisible((v) => !v)}
      >
        {isMenuVisible ? (
          <X size={32} className={"text-white/60"} />
        ) : (
          <List size={32} className={"text-white/60"} />
        )}
      </button>
      {isMenuVisible && (
        <nav
          ref={dropdownRef}
          className="absolute right-6 top-16 z-30 w-2/3 rounded bg-black/40 p-6 shadow shadow-gray-900 sm:w-1/3"
        >
          <ul className={"w-full space-y-3"}>
            {[
              {
                title: "Album e videos",
                onClick: () => handleScroll("albumVideo"),
                Icon: MusicNote,
              },
              {
                title: "Agenda",
                onClick: () => handleScroll("agenda"),
                Icon: Calendar,
              },
              {
                title: "Biografia",
                onClick: () => handleScroll("biografia"),
                Icon: ReadCvLogo,
              },
              {
                title: "Aulas",
                onClick: () => handleScroll("aulas"),
                Icon: GraduationCap,
              },
              {
                title: "Acesso restrito",
                onClick: () => route.push("/login"),
                Icon: Lock,
              },
            ].map((item, i) => (
              <li
                key={i}
                className={
                  "cursor-pointer rounded px-6 py-2 font-light text-white hover:bg-white/20"
                }
                onClick={item.onClick}
              >
                <item.Icon
                  size={16}
                  className={"mr-2 inline-block text-white/60"}
                />
                {item.title}
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className={"z-30 flex items-center space-x-12 py-6"}>
        <Link href={"https://instagram.com"} target={"_blank"}>
          <InstagramLogo
            size={28}
            weight={"fill"}
            className={"text-white/60"}
          />
        </Link>
        <Link href={"https://spotify.com"} target={"_blank"}>
          <SpotifyLogo size={28} weight={"fill"} className={"text-white/60"} />
        </Link>
        <Link href={"https://youtube.com"} target={"_blank"}>
          <YoutubeLogo size={28} weight={"fill"} className={"text-white/60"} />
        </Link>
        <button
          className={"sm:hidden"}
          onClick={() => setIsMenuVisible((v) => !v)}
        >
          {isMenuVisible ? (
            <X size={32} className={"text-white/60"} />
          ) : (
            <List size={32} className={"text-white/60"} />
          )}
        </button>
      </div>
    </>
  );
};

export default Header;
