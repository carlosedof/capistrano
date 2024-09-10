import ReactPlayer from "react-player";
import { Pause, Play } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useGeneralStore } from "@/store/generalStore";

const AlbumVideo = () => {
  const playerRef = useRef();
  const [player, setPlayer] = useState({
    url: "",
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  });
  const { fulldata } = useGeneralStore();
  const songs = fulldata.songs;
  const videos = fulldata.videos;
  return (
    <section
      className={"flex min-h-[740px] w-full flex-col sm:flex-row"}
      id={"albumVideo"}
    >
      <section
        className={
          "flex flex-1 flex-col items-center space-y-6 bg-black/45 px-3 py-12 sm:p-12"
        }
      >
        <h2 className={"text-lg font-light uppercase text-white"}>
          Escute o album Arredio
        </h2>
        <img
          alt={"Album cover"}
          src={
            "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className={
            "h-[300px] w-[300px] border border-gray-700/30 bg-black object-cover shadow-xl"
          }
        />
        {player.url && (
          <div className="player-wrapper hidden">
            <ReactPlayer
              ref={playerRef}
              className="react-player"
              width="100%"
              height="100%"
              url={player.url}
              pip={player.pip}
              playing={player.playing}
              controls={player.controls}
              loop={player.loop}
              playbackRate={player.playbackRate}
              volume={player.volume}
              muted={player.muted}
              onReady={() => console.log("onReady")}
              onStart={() => console.log("onStart")}
              onPlay={() => console.log("onPlay")}
              onEnablePIP={() => console.log("onEnablePIP")}
              onDisablePIP={() => console.log("onDisablePIP")}
              onPause={() => console.log("onPause")}
              onBuffer={() => console.log("onBuffer")}
              onPlaybackRateChange={(e) =>
                console.log("onPlaybackRateChange", e)
              }
              onSeek={(e) => console.log("onSeek", e)}
              onEnded={() => console.log("onEnded")}
              onError={(e) => console.log("onError", e)}
              onProgress={(e) => setPlayer((p) => ({ ...p, ...e }))}
              onDuration={(e) => setPlayer((p) => ({ ...p, duration: e }))}
              onPlaybackQualityChange={(e) =>
                console.log("onPlaybackQualityChange", e)
              }
            />
          </div>
        )}
        <div className={"space-y-6"}>
          <div className={"flex w-full flex-col items-center"}>
            <span className={"text-lg font-light uppercase text-white"}>
              {songs.find((s) => s.url === player.url)?.title || "-"}
            </span>
            <span className={"text-sm font-thin uppercase text-white"}>
              {songs.find((s) => s.url === player.url)?.author ||
                "Escolha uma música"}
            </span>
            <div className={"flex items-center space-x-3"}>
              <span
                className={"w-[30px] text-xs font-light text-white"}
              >{`${Math.floor((player.played * 100) / 60)
                .toString()
                .padStart(2, "0")}:${Math.floor((player.played * 100) % 60)
                .toString()
                .padStart(2, "0")}`}</span>
              <progress
                className={"h-1.5"}
                max={1}
                value={player.played}
                style={{ background: "#606060" }}
              />
              <span
                className={"w-[30px] text-xs font-light text-white"}
              >{`${Math.floor(player.duration / 60)
                .toString()
                .padStart(2, "0")}:${Math.floor((player.duration * 100) % 60)
                .toString()
                .padStart(2, "0")}`}</span>
            </div>
          </div>
          <div className={"flex flex-col space-y-4"}>
            <div
              className={
                "max-h-[180px] flex-1 space-y-1 overflow-y-auto bg-white/5 p-2"
              }
            >
              {songs?.map((s, i) => (
                <div
                  className={"flex w-full justify-between space-x-2"}
                  key={i}
                >
                  <p
                    className={
                      "overflow-hidden text-ellipsis text-sm font-light uppercase text-white"
                    }
                  >{`${s.trackNr} ${s.title}`}</p>
                  <button
                    onClick={() => {
                      setPlayer((p) => ({
                        ...p,
                        url: s.url,
                      }));
                      setTimeout(() => {
                        setPlayer((p) => ({
                          ...p,
                          playing: !p.playing,
                        }));
                      }, 100);
                    }}
                  >
                    {player.playing && player.url === s.url ? (
                      <Pause weight={"fill"} className={"text-white"} />
                    ) : (
                      <Play weight={"fill"} className={"text-white"} />
                    )}
                  </button>
                </div>
              ))}
            </div>
            <span className={"text-sm text-white/70"}>
              Clique{" "}
              <Link
                className={"text-white hover:underline"}
                href={
                  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3"
                }
                target={"_blank"}
              >
                aqui
              </Link>{" "}
              para fazer o download do album
            </span>
          </div>
        </div>
      </section>
      <section
        className={
          "flex flex-1 flex-col items-center space-y-6 bg-slate-800/45 px-3 py-12 sm:p-12"
        }
      >
        <h2 className={"text-lg font-light uppercase text-white"}>Videos</h2>
        {videos.map((v) => (
          <iframe
            key={v}
            className={"w-full max-w-[800px]"}
            height="330"
            src={v}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
                web-share"
            allowFullScreen
          ></iframe>
        ))}
        <Link
          className={"text-white/70 hover:text-white hover:underline"}
          href={"https://youtube.com"}
          target={"_blank"}
        >
          Acessar canal no Youtube
        </Link>
      </section>
    </section>
  );
};

export default AlbumVideo;
