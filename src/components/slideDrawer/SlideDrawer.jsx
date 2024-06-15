import React, { useEffect, useState, useContext } from "react";
import "./SlideDrawer.css";
import { createApiSneakers } from "../../services/apiAuraSneakersService";
import { UserContext } from "../../services/UserProvider";
import formatPrice from "../../utils/formatPrice";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SlideDrawer = ({ show, closeBackdrop, closeSlideDrawer }) => {
  let drawerClasses = show ? "side-drawer open" : "side-drawer";
  const [cart, setCart] = useState([]);
  const { user } = useContext(UserContext);
  const api = createApiSneakers();

  async function fetchData() {
    const response = await api.getProductsCart(user.id);
    setCart(response);
  }

  if (user.id && cart.length === 0) {
    fetchData();
  }

  const closeDrawer = () => {
    closeBackdrop();
    closeSlideDrawer();
  };

  return (
    <div className={drawerClasses}>
      <div
        style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}
        onClick={closeDrawer}
      >
        <FontAwesomeIcon icon={faClose} style={{ color: "#000" }} />
      </div>
      <h2 style={{ textAlign: "left" }}>Seu carrinho de compras!</h2>

      <br />

      <div style={{ height: "500px", overflow: "scroll", overflowX: "hidden" }}>
        {cart &&
          cart.map((item) => {
            return (
              <div className="product-cart">
                <img width="120" height="120" src={item.image} />
                <div>
                  <b>{item.name}</b>
                  <div className="product-cart-price">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SlideDrawer;
