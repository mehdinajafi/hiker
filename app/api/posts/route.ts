import { NextResponse } from "next/server";
import db from "@/lib/db";
import Post from "@/models/Post";

export async function GET() {
  try {
    await db.connect();
    const posts = await Post.find().select(
      "time title description image imageAlt slug"
    );
    await db.disconnect();

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
