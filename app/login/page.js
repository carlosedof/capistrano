"use client";

import Overlay from "@/app/components/overlay/overlay";
import { post, put } from "axios";
import { useState } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(formData);
    if (res.ok) {
      setFormData({
        username: "",
        password: "",
      });
      router.push("/dashboard");
    } else {
      toast.error("Credenciais inválidas");
    }
  };

  return (
    <div className="h-screen">
      <Overlay opacity={0.5} />
      <button
        className={
          "absolute left-6 top-6 flex items-center justify-center rounded bg-white/30 p-3"
        }
        onClick={() => router.back()}
      >
        <CaretLeft className="text-white" />
      </button>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-light text-white">Entrar</h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col space-y-8 px-6"
        >
          <div className={"space-y-4"}>
            <input
              className="w-full rounded bg-white/20 px-4 py-2 outline-none"
              type="text"
              name="username"
              placeholder="Usuário"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <input
              className="w-full rounded bg-white/20 px-4 py-2 outline-none"
              type="password"
              name="password"
              placeholder="Senha"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="w-full rounded border border-white py-2.5 transition-all hover:bg-white hover:text-gray-900">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
