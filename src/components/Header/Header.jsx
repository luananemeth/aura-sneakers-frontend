import "./Header.styles.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignIn,
  faSignOut,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../services/UserProvider";
import { useContext } from "react";
import SlideDrawer from "../slideDrawer/SlideDrawer";
import Backdrop from "../backDrop/BackDrop";
import { createApiSneakers } from "../../services/apiAuraSneakersService";

function Header() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const api = createApiSneakers();

  const { user, onChange } = useContext(UserContext);

  async function fetchData() {
    const response = await api.getProductsCart(user.id);
    setCart(response);
  }

  if (user.id) {
    fetchData();
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location = `/catalog/?q=${searchInput}`;
  };

  const logout = () => {
    window.sessionStorage.removeItem("AURA_SNEAKERS_USER");
    onChange("id", undefined);
    onChange("name", undefined);
    onChange("email", undefined);
    onChange("password", undefined);
    navigate("/");
    return;
  };

  const handleOpenDrawerButton = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleBackdropClick = () => {
    setDrawerOpen(false);
  };

  return (
    <header>
      <SlideDrawer
        show={drawerOpen}
        closeSlideDrawer={handleOpenDrawerButton}
        closeBackdrop={handleBackdropClick}
      />
      {drawerOpen && <Backdrop closeDrawer={handleBackdropClick} />}

      <div className="header-row row">
        <a href="/">
          <h3 id="logo">Aura Sneakers</h3>
        </a>

        <div className="wrap">
          <form onSubmit={handleSubmit}>
            <div className="search">
              <input
                type="text"
                className="searchTerm"
                value={searchInput}
                onChange={handleChange}
                placeholder="O que você esta procurando?"
              />
              <button type="submit" className="searchButton">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>

          <nav>
            {user.name && <span className="user-name">Olá, {user.name}</span>}
            {user.id && cart.length > 0 && (
              <button
                type="button"
                style={{ marginRight: 20 }}
                onClick={handleOpenDrawerButton}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: "#fff" }}
                />
              </button>
            )}

            {!user.id && (
              <button
                type="button"
                onClick={() => {
                  navigate("/identity");
                }}
              >
                Entrar
                <FontAwesomeIcon icon={faSignIn} style={{ color: "#fff" }} />
              </button>
            )}

            {user.id && (
              <button type="button" onClick={logout}>
                Sair
                <FontAwesomeIcon icon={faSignOut} style={{ color: "#fff" }} />
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
