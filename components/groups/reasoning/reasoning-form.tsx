"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { postReasoningQuery } from "@/lib/data/neuro";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  query: z.string().min(1, { message: "Query cannot be empty." }),
  steps: z.coerce.number().min(1).optional().default(4),
  model: z.string().optional().default("default"),
});

type ReasoningFormValues = z.infer<typeof formSchema>;

export function ReasoningForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const [reasoningResult, setReasoningResult] = React.useState<any>(null);

  const form = useForm<ReasoningFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
      steps: 4,
      model: "default",
    },
  });

  async function onSubmit(values: ReasoningFormValues) {
    if (!session?.user?.id) {
      toast.error("You must be logged in to submit a query.");
      return;
    }

    setIsLoading(true);
    setReasoningResult(null);

    const payload = {
      ...values,
      userId: session.user.id,
    };

    const { data, serverError } = await postReasoningQuery(payload);

    if (serverError) {
      toast.error(serverError);
    } else if (data) {
      setReasoningResult(data);
      toast.success("Reasoning query submitted successfully!");
    }
    setIsLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Submit New Query</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Query</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your query here..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="steps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Steps</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="default" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Query"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {reasoningResult && (
        <Card>
          <CardHeader>
            <CardTitle>Reasoning Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Reasoning ID:</h3>
              <p>{reasoningResult.reasoningId}</p>
            </div>
            <div>
              <h3 className="font-semibold">Final Answer:</h3>
              <p>{reasoningResult.finalAnswer}</p>
            </div>
            <div>
              <h3 className="font-semibold">Chain:</h3>
              <div className="space-y-2 mt-2">
                {reasoningResult.chain.map((step: any, index: number) => (
                  <Card key={index} className="p-3">
                    <p><strong>Step {step.step}:</strong></p>
                    <p><strong>Thought:</strong> {step.thought}</p>
                    <p><strong>Action:</strong> {step.action}</p>
                    <p><strong>Result:</strong> {step.result}</p>
                  </Card>
                ))}
              </div>
            </div>
            {reasoningResult.evalScores && reasoningResult.evalScores.length > 0 && (
              <div>
                <h3 className="font-semibold">Evaluations:</h3>
                <div className="space-y-2 mt-2">
                  {reasoningResult.evalScores.map((evalItem: any, index: number) => (
                    <Card key={index} className="p-3">
                      <p><strong>Metric:</strong> {evalItem.metric}</p>
                      <p><strong>Score:</strong> {evalItem.score.toFixed(2)}</p>
                      {evalItem.explanation && <p><strong>Explanation:</strong> {evalItem.explanation}</p>}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
