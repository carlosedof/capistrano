import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const res = await fetch(
    "https://getpantry.cloud/apiv1/pantry/apikey/basket/capistrano"
  );
  const json = await res.json();
  if (json.username !== data.username || json.password !== data.password) {
    return NextResponse.json(
      { message: "Credenciais inválidas" },
      { status: 401 }
    );
  }
  return NextResponse.json({ status: 200 });
}
