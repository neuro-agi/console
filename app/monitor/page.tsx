import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { MonitorDataTable } from "@/components/groups/monitor/monitor-data-table";
import { getReasoningEvents } from "@/lib/data/neuro";

const pageData = {
  name: "Monitor",
  title: "Neuro Monitor",
  description: "Monitor your Neuro reasoning events and evaluations.",
};

export default async function Page() {
  const { data: eventsData, serverError: eventsServerError } = await getReasoningEvents();

  if (eventsServerError) {
    // Handle error, maybe show a message or redirect
    return <p>Error loading monitoring data: {eventsServerError}</p>;
  }

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        {/* Overview Cards - To be implemented */}
        {/* Time-series Charts - To be implemented */}
        <MonitorDataTable data={eventsData || []} />
        {/* Evaluation Heatmap / Anomaly Detection - To be implemented */}
      </PageWrapper>
    </>
  );
}
