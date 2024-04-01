// app/api/v1/telegram/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

interface RequestJSON {
    text?: string;
  }

export async function POST(request: NextRequest) {
    const text : RequestJSON = await request.json();
  
    if (!text) {
      return new NextResponse(
        JSON.stringify({ name: "Please provide something to search for" }),
        { status: 400 }
      );
    }
    
    console.log(text);
    return new NextResponse(JSON.stringify({ text: text }), {
      status: 200,
    });
  }
