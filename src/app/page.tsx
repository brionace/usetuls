import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import getTools from "@/utils/getTools";
import Footer from "@/components/footer";
import Tool from "@/components/tool/tool";
import { Button, Link } from "@nextui-org/react";

const content = {
  name: "Discover useful digital tools",
  description:
    "Find web tools that help you get things done smarter and quicker",
};

export default async function Home() {
  const tools = await getTools({ limit: 20 });

  const categories = [
    {
      name: "Category 1",
      slug: "category-1",
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4">
      <header className="col-span-12 sticky top-0 z-50 shadow-small bg-gray-100">
        <Header />
      </header>
      <main className="col-span-12 md:col-span-8 p-4">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-8">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              {content?.name}
            </h1>
            <p>{content?.description}</p>
          </div>
          <List data={tools} />
        </div>
      </main>
      <aside className="col-span-12 md:col-span-4 p-4 md:border-l md:border-cyan">
        <h3 className="mb-4">Browse by categories</h3>
        <ul>
          {[]?.map((category: any) => (
            <li key={category.name} className="mb-4">
              <Button
                as={Link}
                href={`/c/${category.slug}`}
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
    </div>
  );
}
