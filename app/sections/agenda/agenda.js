import Link from "next/link";
import { useMemo } from "react";
import { useGeneralStore } from "@/store/generalStore";

const Agenda = () => {
  const { fulldata } = useGeneralStore();
  const currentAgenda = useMemo(() => {
    return fulldata.agenda?.filter((a) => {
      const [day, month, year] = a.date.split("/");
      const date = new Date(year, month - 1, day);
      return date >= new Date();
    });
  }, [fulldata.agenda]);

  return (
    <section
      id={"agenda"}
      className={
        "flex w-full flex-1 flex-col items-center justify-center space-y-6 bg-black/30 px-3 py-12 sm:px-16 sm:py-24"
      }
    >
      <h2 className={"text-xl font-light uppercase text-white"}>Agenda</h2>
      <div
        className={"flex w-full flex-col items-center justify-center space-y-4"}
      >
        {currentAgenda.map((a, i) => (
          <div className={"flex space-x-4"} key={i}>
            <span className={"font-light text-white/70"}>{a.date}</span>
            <div className={"flex flex-col"}>
              {a.url ? (
                <Link href={a.url}>
                  <span className={"font-medium text-white/70 underline"}>
                    {a.title}
                  </span>
                </Link>
              ) : (
                <span className={"font-medium text-white/70"}>{a.title}</span>
              )}
              <span className={"text-sm font-light text-white/70"}>
                {a.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Agenda;
