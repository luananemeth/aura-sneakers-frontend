import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Header from "./components/Header/Header";
import Catalog from "./pages/Catalog/Catalog";
import Identity from "./pages/Identity/Identity";
import UserProvider from "./services/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact Component={Home}></Route>
            <Route path="/product/:id" exact Component={Product}></Route>
            <Route path="/identity" exact Component={Identity}></Route>
            <Route path="/catalog" Component={Catalog}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
