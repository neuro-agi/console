import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";

const pageData = {
  name: "Dashboard",
  title: "Dashboard",
  description: "Welcome to your dashboard.",
};

export default async function Page() {
  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <div className="p-4 rounded-lg border bg-background">
          <p>Your simplified dashboard is ready.</p>
        </div>
      </PageWrapper>
    </>
  );
}