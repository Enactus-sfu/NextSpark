import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VariantIndex from "./pages/variants";
import Editorial from "./pages/variants/Editorial";
import Teardown from "./pages/variants/Teardown";
import Spec from "./pages/variants/Spec";

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<Index />} />
      {/* Landing page directions, for review */}
      <Route path="/v" element={<VariantIndex />} />
      <Route path="/v/editorial" element={<Editorial />} />
      <Route path="/v/teardown" element={<Teardown />} />
      <Route path="/v/spec" element={<Spec />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
