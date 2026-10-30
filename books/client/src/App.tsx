import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./components/books";
import "./App.css";
import Add from "./components/add";
import Update from "./components/update";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Books />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/update",
      element: <Update />,
    },
  ]);
  return (
    <div className="App">
      <h1>Asru's Bookshop</h1>
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
