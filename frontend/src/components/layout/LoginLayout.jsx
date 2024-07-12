import { Outlet } from "react-router-dom";
import Header from "../../shared/Header/Header";

const LoginLayout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default LoginLayout;
