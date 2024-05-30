import List from "../components/list";

export default async function Admin() {
  return (
    <div>
      <nav className="flex justify-between gap-3">
        <a href="/admin">Admin</a>
        <div className="flex justify-between gap-3">
          <a href="/admin/all">All</a>
          <a href="/">Frontpage</a>
        </div>
      </nav>
      <div>
        <List />
      </div>
    </div>
  );
}
