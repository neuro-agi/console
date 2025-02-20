"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReasoningLog } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  score: z.coerce.number().min(1).max(5),
  comment: z.string().optional(),
});

function EvaluateDialog({ log }: { log: ReasoningLog }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score: 3,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch("/api/neuro/eval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logId: log.id,
        ...values,
      }),
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Evaluate</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Evaluate Response</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score (1-5)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export const unevaluatedColumns: ColumnDef<ReasoningLog>[] = [
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
    accessorKey: "response",
    header: "Response",
    cell: ({ row }) => {
      const response = row.getValue("response") as { result: string };
      return response.result;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const log = row.original;
      return <EvaluateDialog log={log} />;
    },
  },
];

export const evaluatedColumns: ColumnDef<any>[] = [
    {
        accessorKey: "reasoning_logs",
        header: "Query",
        cell: ({ row }) => {
            const log = row.original.reasoning_logs;
            return log.query;
        }
    },
    {
        accessorKey: "reasoning_logs",
        header: "Response",
        cell: ({ row }) => {
            const log = row.original.reasoning_logs;
            const response = log.response as { result: string };
            return response.result;
        }
    },
    {
        accessorKey: "evaluations",
        header: "Score",
        cell: ({ row }) => {
            const evaluation = row.original.evaluations;
            return evaluation.score;
        }
    },
    {
        accessorKey: "evaluations",
        header: "Comment",
        cell: ({ row }) => {
            const evaluation = row.original.evaluations;
            return evaluation.comment;
        }
    }
]
