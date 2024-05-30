import AddTools from "./components/add-tools";
import List from "./components/list";

export default async function Admin() {
  return (
    <div>
      <nav className="flex justify-between gap-3">
        <h1>
          <a href="/admin">Admin</a>
        </h1>
        <div className="flex justify-between gap-3">
          <a href="/admin/all">All</a>
          <a href="/">Frontpage</a>
        </div>
      </nav>
      <AddTools />
      <hr />
      <div>
        <List isPublished={false} />
      </div>
    </div>
  );
}
