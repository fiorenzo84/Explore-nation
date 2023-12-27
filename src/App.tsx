import {BrowserRouter as Router} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";
import {Header} from "./layouts/Header";
import {Footer} from "./layouts/Footer";

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default App;
