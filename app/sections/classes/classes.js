import { toast } from "react-toastify";
import { useState } from "react";

const Classes = () => {
  const [email, setEmail] = useState("");
  const createRecord = async () => {
    await fetch("/api/lead", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leads: [email],
      }),
    });
    setEmail("");
    toast("Cadastrado com sucesso! Entraremos em contato em breve.");
  };
  return (
    <section
      id={"aulas"}
      className={
        "flex w-full flex-1 flex-col items-center justify-center space-y-6 bg-gray-700/30 px-3 py-12 sm:p-12"
      }
    >
      <h2 className={"text-xl font-light uppercase text-white"}>
        Aulas, materiais, textos e vídeos
      </h2>
      <div
        className={"flex w-full flex-col items-center justify-center space-y-4"}
      >
        <p className={"text-center font-light text-white/70"}>
          Tenha acesso à conteúdo exclusivo, insira seu e-mail aqui:
        </p>
        <div
          className={
            "flex w-full flex-col items-center justify-center space-y-8"
          }
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={
              " placeholder:white w-full rounded-none border-b border-white bg-transparent py-2.5 text-center outline-none placeholder:font-light"
            }
            placeholder={"Email*"}
          />
          <button
            onClick={createRecord}
            className={
              "w-full rounded border border-white py-3 font-light uppercase text-white transition-all hover:bg-white hover:text-black sm:w-[300px]"
            }
          >
            Enviar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Classes;
