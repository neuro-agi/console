import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pageData = {
  name: "Evaluation",
  title: "Neuro Evaluation",
  description: "View detailed evaluation results for Neuro reasoning events.",
};

export default async function Page() {
  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Evaluation details will be displayed here, often linked from the Monitoring Dashboard.</p>
            <p>This page can also be used for manual re-evaluation or custom metric analysis.</p>
          </CardContent>
        </Card>
      </PageWrapper>
    </>
  );
}
