import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import getTools from "@/utils/getTools";
import Footer from "@/components/footer";
import Tool from "@/components/tool/tool";
import { Button, Link } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import Bookmarks from "@/components/bookmarks";
import getCategories from "@/utils/getCategories";
import getPricing from "@/utils/getPricing";
import Categories from "@/components/categories";
import FeaturedCategories from "@/components/categories-featured";

const content = {
  name: "Usetuls, discover apps with zero downloads and installs",
  description:
    "Find powerful apps that work directly in your web browser and help you live your best life and work smarter.",
};

export default async function Home() {
  const tools = (await getTools({})) || [];
  const categories = await getCategories({});
  // const pricing = (await getPricing({})) || [];
  // const supabase = createClient();
  // let pinned = [];

  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser();

  // if (user) {
  //   const { id } = user;

  //   const { data: pinnedTools, error } = await supabase
  //     .from("pinned")
  //     .select("pin_id")
  //     .eq("user_id", id);

  //   if (error) {
  //     console.error("Error fetching pinned tools:", error);
  //   } else {
  //     pinned = pinnedTools.map((tool: any) => tool.pin_id);
  //   }
  // }

  return (
    <div className="grid grid-cols-12 gap-4">
      <header className="col-span-12 sticky top-0 z-50 shadow-small bg-gray-100">
        <Header />
        <Categories />
        <Bookmarks />
      </header>
      <main className="col-span-12 md:col-span-8 p-4">
        <div className="max-w-[800px] mx-auto">
          <div className="relative mb-12 p-9 rounded-lg after:content-[''] after:absolute after:w-full after:h-full after:bg-gradient-radial after:transform-matrix after:opacity-10 after:left-0 after:top-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              {content?.name} &#x1F44C;
            </h1>
            <p>{content?.description}</p>
          </div>
          <div className="mb-16">
            <List
              title="Featured"
              data={tools}
              slug="all"
              showSort={true}
              category={[]}
            />
          </div>
          <List
            title="Featured"
            data={tools}
            slug="all"
            showSort={true}
            category={[]}
          />
        </div>
      </main>
      <aside className="col-span-12 md:col-span-4 p-4 md:border-l md:border-cyan">
        <h3 className="mb-4">Featured Categories</h3>
        <FeaturedCategories />
        <ul>
          {categories?.map((category: any) => (
            <li key={category.name} className="mb-4">
              <Button
                as={Link}
                href={`/browse/${category.slug}`}
                variant="flat"
                size="sm"
                className="text-smaller"
              >
                {category.name}
              </Button>
            </li>
          ))}
        </ul>
      </aside>
      <footer className="col-span-12 grid grid-cols-12 items-start gap-4 py-6 mt-8 px-6 text-sm text-slate-500 border-t border-slate-100">
        <Footer />
      </footer>
    </div>
  );
}
