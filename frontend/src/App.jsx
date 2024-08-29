import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <>
      <h1 className="">
        <RouterProvider router={routes}></RouterProvider>
      </h1>
    </>
  );
}

export default App;
