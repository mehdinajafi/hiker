import { NextResponse } from "next/server";
import db from "@/lib/db";
import Post from "@/models/Post";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await db.connect();
    const post = await Post.findOne({ slug: params.slug });
    await db.disconnect();

    return NextResponse.json(post, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
