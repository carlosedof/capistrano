"use client";

import Overlay from "@/app/components/overlay/overlay";
import { useEffect, useState } from "react";
import { CaretLeft, Pause, Play, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Dashboard() {
  const router = useRouter();
  const authenticated = useAuthStore((state) => state.authenticated);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [songRecord, setSongRecord] = useState({
    trackNr: "",
    title: "",
    author: "",
    url: "",
  });
  const [agendaRecord, setAgendaRecord] = useState({
    date: "",
    title: "",
    description: "",
    url: "",
  });
  const [videosRecord, setVideosRecord] = useState("");
  const [fulldata, setFulldata] = useState();
  const [songs, setSongs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [leads, setLeads] = useState([]);
  const fetchData = async () => {
    const generalResponse = await fetch("/api/general");
    const leadsResponse = await fetch("/api/lead");
    const data = await generalResponse.json();
    const leads = await leadsResponse.json();
    setFulldata(data);
    setSongs(data?.songs || []);
    setVideos(data?.videos || []);
    setAgenda(data?.agenda || []);
    setLeads(leads?.leads || []);
  };

  const createRecord = async (record, name, setFn) => {
    const response = await fetch("/api/general", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [name]: [record],
      }),
    });
    const data = await response.json();
    setFn(data?.[name] || []);
  };

  const deleteRecord = async (record, propRef, name, setFn) => {
    await fetch("/api/general", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [name]: null,
      }),
    });
    const response = await fetch("/api/general", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [name]: fulldata?.[name]?.filter((a) =>
          propRef ? a[propRef] !== record[propRef] : a !== record
        ),
      }),
    });
    const data = await response.json();
    setFulldata(data);
    setFn(data?.[name] || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!authenticated) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-8">
        <span>Você não tem acesso a essa página</span>
        <button
          className={"rounded bg-white/30 p-3"}
          onClick={() => router.back()}
        >
          Retornar
        </button>
      </div>
    );
  }
  return (
    <div>
      <Overlay opacity={0.5} />
      <button
        className={
          "absolute left-6 top-3 flex items-center justify-center rounded bg-white/30 p-3"
        }
        onClick={() => router.back()}
      >
        <CaretLeft className="text-white" />
      </button>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center space-y-6 p-3 sm:p-12">
        <h1 className="text-2xl font-light text-white">Dashboard</h1>
        <div
          className={
            "flex w-full flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0"
          }
        >
          <div
            className={
              "flex flex-col space-y-3 rounded border border-white/30 bg-black/30 p-6 sm:w-1/2"
            }
          >
            <h2 className="text-2xl font-light text-white">Músicas</h2>
            <div className={"flex-1 space-y-1 overflow-y-auto p-2"}>
              {songs?.map((s, i) => (
                <div
                  className={"flex w-full justify-between space-x-2"}
                  key={i}
                >
                  <p
                    className={
                      "overflow-hidden text-ellipsis text-sm font-light uppercase"
                    }
                  >{`${s.trackNr} ${s.title}`}</p>
                  <button
                    onClick={async () => {
                      await deleteRecord(s, "url", "songs", setSongs);
                    }}
                  >
                    <Trash className={"text-white"} />
                  </button>
                </div>
              ))}
            </div>
            <input
              className={
                "rounded bg-white/20 px-4 py-1 text-sm text-white outline-none"
              }
              placeholder={"Informe o número da faixa"}
              value={songRecord.trackNr}
              onChange={(e) =>
                setSongRecord({ ...songRecord, trackNr: e.target.value })
              }
            />
            <input
              className={
                "rounded bg-white/20 px-4 py-1 text-sm text-white outline-none"
              }
              placeholder={"Informe o título da faixa"}
              value={songRecord.title}
              onChange={(e) =>
                setSongRecord({ ...songRecord, title: e.target.value })
              }
            />
            <input
              className={
                "rounded bg-white/20 px-4 py-1 text-sm text-white outline-none"
              }
              placeholder={"Informe o(s) autor(es) da faixa"}
              value={songRecord.author}
              onChange={(e) =>
                setSongRecord({ ...songRecord, author: e.target.value })
              }
            />
            <input
              className={
                "rounded bg-white/20 px-4 py-1 text-sm text-white outline-none"
              }
              placeholder={"Informe a url"}
              value={songRecord.url}
              onChange={(e) =>
                setSongRecord({ ...songRecord, url: e.target.value })
              }
            />
            <button
              onClick={async () => {
                await createRecord(songRecord, "songs", setSongs);
                setSongRecord({
                  trackNr: "",
                  title: "",
                  author: "",
                  url: "",
                });
              }}
              className={
                "rounded border border-white/30 p-2 text-sm transition-all hover:bg-white hover:text-gray-800"
              }
            >
              Adicionar
            </button>
          </div>
          <div
            className={
              "space-y-3 rounded border border-white/30 bg-black/30 p-6 sm:w-1/2"
            }
          >
            <h2 className="text-2xl font-light text-white">Videos</h2>
            <div className={"flex-1 space-y-1 overflow-y-auto p-2"}>
              {videos?.map((s, i) => (
                <div
                  className={"flex w-full justify-between space-x-2"}
                  key={i}
                >
                  <Link
                    href={s}
                    className={
                      "overflow-hidden text-ellipsis text-sm font-light underline"
                    }
                  >
                    {s}
                  </Link>
                  <button
                    onClick={async () => {
                      await deleteRecord(s, null, "videos", setVideos);
                    }}
                  >
                    <Trash className={"text-white"} />
                  </button>
                </div>
              ))}
            </div>
            <div className={"flex flex-col space-y-2"}>
              <input
                className={
                  "rounded bg-white/20 px-4 py-1 text-sm text-white outline-none"
                }
                placeholder={"Informe o link embed do vídeo (youtube)"}
                value={videosRecord}
                onChange={(e) => setVideosRecord(e.target.value)}
              />
              <button
                onClick={async () => {
                  await createRecord(videosRecord, "videos", setVideos);
                  setVideosRecord("");
                }}
                className={
                  "rounded border border-white/30 p-2 text-sm transition-all hover:bg-white hover:text-gray-800"
                }
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            "flex w-full flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0"
          }
        >
          <div
            className={
              "rounded border border-white/30 bg-black/30 p-6 sm:w-1/2"
            }
          >
            <h2 className="text-2xl font-light text-white">Agenda</h2>
            <div
              className={
                "flex w-full flex-col items-center justify-center space-y-4 py-4"
              }
            >
              {agenda.map((a, i) => (
                <div className={"flex w-full justify-between"} key={i}>
                  <div className={"flex space-x-4"}>
                    <span className={"w-[90px] font-light text-white/70"}>
                      {a.date}
                    </span>
                    <div className={"flex flex-col"}>
                      {a.url ? (
                        <Link href={a.url}>
                          <span
                            className={"font-medium text-white/70 underline"}
                          >
                            {a.title}
                          </span>
                        </Link>
                      ) : (
                        <span className={"font-medium text-white/70"}>
                          {a.title}
                        </span>
                      )}
                      <span className={"text-sm font-light text-white/70"}>
                        {a.description}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      await deleteRecord(a, "date", "agenda", setAgenda);
                    }}
                  >
                    <Trash className={"text-white"} />
                  </button>
                </div>
              ))}
            </div>
            <div className={"flex flex-col space-y-2"}>
              <input
                className={
                  "rounded bg-white/20 px-4 py-1 text-sm text-white outline-none"
                }
                placeholder={"Informe a data"}
                value={agendaRecord.date}
                onChange={(e) =>
                  setAgendaRecord({ ...agendaRecord, date: e.target.value })
                }
              />
              <input
                className={
                  "rounded bg-white/20 px-4 py-1 text-sm text-white outline-none"
                }
                placeholder={"Informe o título"}
                value={agendaRecord.title}
                onChange={(e) =>
                  setAgendaRecord({ ...agendaRecord, title: e.target.value })
                }
              />
              <input
                className={
                  "rounded bg-white/20 px-4 py-1 text-sm text-white outline-none"
                }
                placeholder={"Informe a descrição"}
                value={agendaRecord.description}
                onChange={(e) =>
                  setAgendaRecord({
                    ...agendaRecord,
                    description: e.target.value,
                  })
                }
              />
              <input
                className={
                  "rounded bg-white/20 px-4 py-1 text-sm text-white outline-none"
                }
                placeholder={"Informe a url (se houver)"}
                value={agendaRecord.url}
                onChange={(e) =>
                  setAgendaRecord({ ...agendaRecord, url: e.target.value })
                }
              />
              <button
                onClick={async () => {
                  await createRecord(agendaRecord, "agenda", setAgenda);
                  setAgendaRecord({
                    date: "",
                    title: "",
                    description: "",
                    url: "",
                  });
                }}
                className={
                  "rounded border border-white/30 p-2 text-sm transition-all hover:bg-white hover:text-gray-800"
                }
              >
                Adicionar
              </button>
            </div>
          </div>
          <div
            className={
              "space-y-3 rounded border border-white/30 bg-black/30 p-6 sm:w-1/2"
            }
          >
            <h2 className="text-2xl font-light text-white">
              Leads
              <span className={"ml-2 text-sm text-white/70"}>
                (Clique no e-mail para copiar)
              </span>
            </h2>
            <div
              className={
                "flex max-h-[600px] w-full flex-col items-center justify-center space-y-3 overflow-y-auto rounded bg-black/40 pt-8"
              }
            >
              {!leads.length && (
                <span className={"pb-6 text-white/70"}>
                  Nenhum lead cadastrado
                </span>
              )}
              {!!leads.length &&
                leads.map((l, i) => (
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(l);
                      toast("E-mail copiado para a área de transferência");
                    }}
                    key={i}
                  >
                    <span className={"font-light text-white/70"}>{l}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
