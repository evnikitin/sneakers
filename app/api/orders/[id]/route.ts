import { prisma } from "@/app/_lib/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  console.log("Received ID:", id);

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Order ID is required" }),
      { status: 400 }
    );
  }

  try {
    const status = await req.json();
    console.log("Received Status:", status);

    await prisma.order.update({
      where: { id },
      data: { status },
    });

    return new NextResponse(
      JSON.stringify({ message: "Status has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
};
