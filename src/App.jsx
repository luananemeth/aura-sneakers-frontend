import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Header from "./components/Header/Header";
import Catalog from "./pages/Catalog/Catalog";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact Component={Home}></Route>
          <Route path="/product/:id" exact Component={Product}></Route>
          <Route path="/catalog" Component={Catalog}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
