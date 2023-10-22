import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import HierarchyTable from "./components/HierarchyTable/HierarchyTable";

function App() {
  return (
    <Provider store={store}>
      <HierarchyTable />
    </Provider>
  );
}

export default App;
