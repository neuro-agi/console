import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { ReasoningForm } from "@/components/groups/reasoning/reasoning-form";

const pageData = {
  name: "Reasoning",
  title: "Neuro Reasoning Console",
  description: "Submit queries and observe the Neuro reasoning process.",
};

export default async function Page() {
  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <ReasoningForm />
      </PageWrapper>
    </>
  );
}
