import { prisma } from "../../_lib/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const sneakers = await prisma.sneaker.findMany();
    return new NextResponse(JSON.stringify(sneakers), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Error has been apeared" }),
      { status: 500 }
    );
  }
};
