import { getAuthSession } from "@/app/_lib/utils/auth";
import { prisma } from "../../_lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const session = await getAuthSession();
  console.log("sses:" + session);
  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Error has been occurred" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You don't have permission" }),
      { status: 401 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    const body = await req.json();
    try {
      await prisma.order.create({
        data: { ...body, userEmail: session.user.email },
      });
      return new NextResponse(
        JSON.stringify({ message: "Order has been added" }),
        { status: 201 }
      );
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Error has been occurred" }),
        { status: 500 }
      );
    }
  }
  return new NextResponse(
    JSON.stringify({ message: "Error has been occurred" }),
    { status: 500 }
  );
};
