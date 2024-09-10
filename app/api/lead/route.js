import { NextResponse } from "next/server";
import axios from "axios";

// Handle GET request
export async function GET() {
  try {
    // const { env } = nextConfig;
    const res = await fetch(
      `https://getpantry.cloud/apiv1/pantry/apikey/basket/leads`
    );
    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({}, { status: error.response?.status || 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    // const { env } = nextConfig;
    const targetUrl = `https://getpantry.cloud/apiv1/pantry/apikey/basket/leads`;
    const response = await axios.put(targetUrl, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
