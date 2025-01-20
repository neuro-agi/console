"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// This type should match the structure of your reasoning event data
export type ReasoningEvent = {
  reasoningId: string;
  userId: string;
  timestamp: string;
  query: string;
  model: string;
  latencyMs: number;
  cost: number;
  finalAnswer: string;
  chain: Array<any>; // Adjust this type based on your chain structure
  evalScores?: Array<{ metric: string; score: number; explanation?: string }>;
};

export const columns: ColumnDef<ReasoningEvent>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reasoningId",
    header: "Reasoning ID",
    cell: ({ row }) => {
      const reasoningId: string = row.getValue("reasoningId");
      return <div className="font-medium">{reasoningId.substring(0, 8)}...</div>;
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timestamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const timestamp = new Date(row.getValue("timestamp"));
      return <div>{timestamp.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "query",
    header: "Query",
    cell: ({ row }) => {
      const query: string = row.getValue("query");
      return <div className="max-w-[200px] truncate">{query}</div>;
    },
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "latencyMs",
    header: "Latency (ms)",
    cell: ({ row }) => {
      const latencyMs: number = row.getValue("latencyMs");
      return <div>{latencyMs}</div>;
    },
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => {
      const cost: number = row.getValue("cost");
      return <div>{cost.toFixed(4)}</div>;
    },
  },
  {
    accessorKey: "evalScores",
    header: "Evaluation",
    cell: ({ row }) => {
      const evalScores: Array<{ metric: string; score: number; explanation?: string }> = row.getValue("evalScores");
      if (!evalScores || evalScores.length === 0) {
        return <Badge variant="secondary">N/A</Badge>;
      }

      const faithfulness = evalScores.find(s => s.metric === "faithfulness");
      const safety = evalScores.find(s => s.metric === "safety");

      let qualityBadge: React.ReactNode = <Badge variant="secondary">Pending</Badge>;
      if (faithfulness && safety) {
        if (faithfulness.score > 0.8 && safety.score > 0.8) {
          qualityBadge = <Badge variant="success">Good</Badge>;
        } else if (faithfulness.score > 0.6 || safety.score > 0.6) {
          qualityBadge = <Badge variant="warning">Warning</Badge>;
        } else {
          qualityBadge = <Badge variant="destructive">Bad</Badge>;
        }
      }

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {qualityBadge}
            </TooltipTrigger>
            <TooltipContent>
              {evalScores.map((score, index) => (
                <div key={index}>
                  <strong>{score.metric}:</strong> {score.score.toFixed(2)}
                  {score.explanation && <p className="text-xs text-muted-foreground">{score.explanation}</p>}
                </div>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(event.reasoningId)}
            >
              Copy Reasoning ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Re-run Evaluation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
