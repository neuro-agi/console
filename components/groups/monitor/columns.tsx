"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReasoningLog } from "@/lib/db";

export const columns: ColumnDef<ReasoningLog>[] = [
  {
    accessorKey: "createdAt",
    header: "Timestamp",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "query",
    header: "Query",
  },
  {
    accessorKey: "latency",
    header: "Latency (ms)",
  },
  {
    accessorKey: "cost",
    header: "Cost ($)",
  },
  {
    accessorKey: "response",
    header: "Response",
    cell: ({ row }) => {
      const response = row.getValue("response") as { result: string };
      return response.result;
    },
  },
];
