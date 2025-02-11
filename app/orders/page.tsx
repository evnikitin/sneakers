"use client";
import { MobileOrderCard, OrderTable } from "@/components/Order/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Order, OrderStatus } from "../_lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OrdersPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isAdmin = session?.user.isAdmin ?? false;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/orders");

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Unknown error");
      }

      return res.json();
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });

      const previousOrders = queryClient.getQueryData(["orders"]);

      queryClient.setQueryData(["orders"], (oldOrders: Order[] | undefined) => {
        if (!oldOrders) return [];
        return oldOrders.map((order) =>
          order.id === id ? { ...order, status } : order
        );
      });

      return { previousOrders };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["orders"], context?.previousOrders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    mutation.mutate({ id: orderId, status: newStatus });
  };

  if (isLoading || status === "loading") return "Loading...";

  if (isError) {
    return (
      "An error has occurred: " +
      (error instanceof Error ? error.message : "Unknown error")
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="m-auto max-w-7xl mx-auto bg-gray-800 text-gray-200 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Order History</h2>

        <OrderTable
          onStatusChange={isAdmin ? handleStatusChange : undefined}
          isAdmin={isAdmin}
          orders={data}
        />

        <div className="block md:hidden">
          {data.map((order: Order) => (
            <MobileOrderCard
              onStatusChange={isAdmin ? handleStatusChange : undefined}
              isAdmin={isAdmin}
              key={order.id}
              order={order}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
