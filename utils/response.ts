import { NextResponse } from "next/server";

export const json = (data: any, status: number = 200) => NextResponse.json(data, { status });
