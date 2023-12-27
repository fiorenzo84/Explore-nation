
import {Routes, Route} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import {CountryPage} from "../pages/CountryPage";
import {NotFoundPage} from "../pages/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/country/:countryName" element={<CountryPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

