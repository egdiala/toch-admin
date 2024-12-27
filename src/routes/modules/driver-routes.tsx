import { Routes, Route } from "react-router";
import { DriverPage, DriverProfilePage, DriversPage } from "@/pages/drivers";

const DriverRoutes = () => {
  return (
    <Routes>
      <Route index element={<DriversPage />} />
      <Route path=":id" element={<DriverPage />} >
        <Route path="profile" element={<DriverProfilePage />} />
      </Route>
    </Routes>
  );
};

export default DriverRoutes;