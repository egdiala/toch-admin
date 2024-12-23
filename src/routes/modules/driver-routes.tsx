import { Routes, Route } from "react-router";
import { DriversPage } from "@/pages/drivers";

const DriverRoutes = () => {
  return (
    <Routes>
      <Route index element={<DriversPage />} />
    </Routes>
  );
};

export default DriverRoutes;