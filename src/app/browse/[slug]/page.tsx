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

const content = {
  name: "Discover useful web apps",
  description:
    "Find web tools that help you get things done smarter and quicker",
};

export default async function Home(props: any) {
  const { slug } = props.params;
  const category = await getCategories({ slug });
  const categories = await getCategories({});

  const { name, description } = category[0] as any;

  const tools = await getTools({ category: name });

  const supabase = createClient();
  let flattenedPinnedTools = [];

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    const { id } = user;

    const { data: pinnedTools, error } = await supabase
      .from("pinned")
      .select("pin_id")
      .eq("user_id", id);

    if (error) {
      console.error("Error fetching pinned tools:", error);
    } else {
      flattenedPinnedTools = pinnedTools.map((tool: any) => tool.pin_id);
      // console.log("Pinned tools:", flattenedPinnedTools);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <header className="col-span-12 sticky top-0 z-50 shadow-small bg-gray-100">
        <Header user={user} />
      </header>
      <main className="col-span-12 md:col-span-8 p-4">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-8">
            <h1 className="text-xl font-bold">{name}</h1>
            <p>{description}</p>
          </div>
          <List
            data={tools}
            pinned={flattenedPinnedTools}
            showSort={true}
            category={category[0]}
          />
        </div>
        <Bookmarks />
      </main>
      <aside className="col-span-12 md:col-span-4 p-4 md:border-l md:border-cyan">
        <h3 className="mb-4">Featured Categories</h3>
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
    </div>
  );
}
