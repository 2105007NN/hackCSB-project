import { createBrowserRouter } from "react-router-dom";


import Home from "../pages/Home/Home";
import Main from "../components/layout/Main";
import Articles from "../pages/Articles/Articles";
import LoginLayout from "../components/layout/LoginLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Forum from "../pages/Forum/Forum";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Support from "../pages/Support/Support";
import ClientDashboard from "../pages/dashboard/ClientDashboard";
import ClientProfile from "../pages/Profile/ClientProfile";
import CreateTest from "../pages/Tests/CreateTest";
import Tools from "../pages/Tools/Tools";
import Resources from "../pages/Resources/Resources";
import TakeTest from "../pages/Tests/TakeTest";
import TestsMain from "../pages/Tests/TestsMain";
import { Result } from "postcss";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/tests",
        element: <TestsMain></TestsMain>,
      },
      {
        path: "/articles",
        element: <Articles></Articles>,
      },
      {
        path: "/forum",
        element: <Forum></Forum>,
      },
      {
        path: "/support",
        element: <Support></Support>,
      },
      {
        path: "/client/dashboard",
        element: <ClientDashboard></ClientDashboard>,
      },
      {
        path: "/client/profile/:id",
        element: <ClientProfile></ClientProfile>,
      },
      {
        path: "/support",
        element: <Support></Support>,
      },
      {
        path: "/create-quiz",
        element: <CreateTest></CreateTest>,
      },
      {
        path: "/tools",
        element : <Tools />
      },
      {
        path: "/resources",
        element : <Resources />
      },
      {
        path: "/result/:testId/:userId",
        element : <Result />
      },
      {
        path: "/take-test/:id",
        element: <TakeTest></TakeTest>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/tests/get-test/${params.id}`),
      },
    ],
  },
  {
    //layout for login and authentication
    path: "/auth",
    element: <LoginLayout></LoginLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      // {
      //     path:'/teacherlogin',
      //     element:<TeacherLogin></TeacherLogin>
      // }
    ],
  },

  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
