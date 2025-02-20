import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { getUnevaluatedLogs, getEvaluations, getEvaluationsSummary } from "@/lib/data/eval";
import { notFound } from "next/navigation";
import { DataTable } from "@/components/groups/eval/data-table";
import { unevaluatedColumns, evaluatedColumns } from "@/components/groups/eval/columns";
import { EvalChart } from "@/components/groups/eval/chart";

const pageData = {
  name: "Evaluate",
  title: "Evaluate",
  description: "Evaluate the responses of your reasoning API.",
};

export default async function Page() {
  const unevaluatedLogs = await getUnevaluatedLogs();
  const evaluations = await getEvaluations();
  const summary = await getEvaluationsSummary();

  const unevaluatedLogsData = unevaluatedLogs?.data;
  const evaluationsData = evaluations?.data;
  const summaryData = summary?.data;

  if (!unevaluatedLogsData || !evaluationsData || !summaryData) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <EvalChart data={summaryData} />
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Unevaluated Logs</h2>
          <DataTable columns={unevaluatedColumns} data={unevaluatedLogsData || []} filterColumn="query" />
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Evaluated Logs</h2>
          <DataTable columns={evaluatedColumns} data={evaluationsData || []} filterColumn="query" />
        </div>
      </PageWrapper>
    </>
  );
}