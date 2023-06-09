import Home from "./pages/home/Home";
import "./app.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../src/styles/color.scss";
import Permission from "./pages/permission/Permission";
import PermissionAdd from "./pages/addpermission/Modal";
import Login from "./pages/login/Login";
import Advance from "./pages/advance/Advance";
import Expense from "./pages/expense/Expense";
import Forgot from "./pages/forgot/Forgot";
import Profile from "./pages/profile/Profile";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="profile">
            {/* <Route path="profile">

              <Route index element={<Profile />} />
            </Route>
          </Route>
          <Route path="permission">
            <Route index element={<Permission />} />
            <Route path="add">
              <Route index element={<PermissionAdd />} />

            </Route>
            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="settings">
                <Route index element={<Settings />} />
              </Route>
            </Route>
            <Route path="permission">
              <Route index element={<Permission />} />
              <Route path="add">
                <Route index element={<PermissionAdd />} />
              </Route>
            </Route>
            <Route path="expense">
              <Route index element={<Expense />} />
              <Route path="add">
                <Route index element={<PermissionAdd />} />
              </Route>
            </Route>
            <Route path="advance">
              <Route index element={<Advance />} />
              <Route path="add">
                <Route index element={<PermissionAdd />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </div>
  );
}

export default App;
