// app/api/v1/telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface RequestJSON {
    text?: string;
  }

export async function POST(request: NextRequest) {
    const text : RequestJSON = await request.json();
    console.log("in POST ============")

    if (!text) {
      return new NextResponse(
        JSON.stringify({ name: "Please provide something to search for" }),
        { status: 400 }
      );
    }
    
    console.log("PASSSSS")
    console.log(text);

    return new NextResponse(JSON.stringify(text), {
      status: 200,
    });
  }
