import AddTools from "./components/add-tools";
import List from "./components/list";

export default async function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <AddTools />
      <hr />
      <div>
        <List />
      </div>
    </div>
  );
}
