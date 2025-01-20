import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { getReasoningLogs, getReasoningLogsSummary } from "@/lib/data/monitor";
import { notFound } from "next/navigation";
import { DataTable } from "@/components/groups/monitor/data-table";
import { columns } from "@/components/groups/monitor/columns";
import { MonitorChart } from "@/components/groups/monitor/chart";

const pageData = {
  name: "Monitor",
  title: "Monitor",
  description: "Monitor your reasoning API usage and performance.",
};

export default async function Page() {
  const logs = await getReasoningLogs();
  const summary = await getReasoningLogsSummary();

  const logsData = logs?.data;
  const summaryData = summary;

  if (!logsData || !summaryData) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <MonitorChart data={summaryData} />
        <div className="mt-8">
          <DataTable columns={columns} data={logsData} filterColumn="query" />
        </div>
      </PageWrapper>
    </>
  );
}