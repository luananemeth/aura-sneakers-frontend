import "./Header.styles.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location = `/catalog/?q=${searchInput}`;
  };

  return (
    <header>
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
        </div>
      </div>
    </header>
  );
}

export default Header;
