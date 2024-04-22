import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import getCategories from "@/utils/getCategories";
import Footer from "@/components/footer";
import Tool from "@/components/tool";

const content = {
  name: "Discover useful digital tools",
  description:
    "Find web tools that help you get things done smarter and quicker",
};

export default async function Home() {
  const categories = await getCategories({ hasTools: true });

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto min-h-screen">
        <div className="[&>*]:!mx-auto">
          <Banner content={content} direction="text-center" />
        </div>
        <List />
      </main>
      <Tool />
      <Footer />
    </>
  );
}
