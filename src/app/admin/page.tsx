import AddTools from "./components/add-tools";
import List from "./components/list";

export default function Admin() {
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
