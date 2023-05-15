import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../src/styles/color.scss";
import Permission from "./pages/permission/Permission";
import PermissionAdd from "./pages/addpermission/Modal";
import Login from "./pages/login/Login";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="profile">
              <Route index element={<Profile />} />
            </Route> */}
          </Route>
          <Route path="permission">
            <Route index element={<Permission />} />
            <Route path="add">
              <Route index element={<PermissionAdd />} />
            </Route>
            {/* <Route path="login" element={<Login />} /> */}
            {/* <Route path="profile">
              <Route index element={<Profile />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
