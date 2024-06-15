import { toast } from "react-toastify";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../services/UserProvider";
import { useLocation } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import { createApiSneakers } from "../../services/apiAuraSneakersService";
import SlideDrawer from "../../components/slideDrawer/SlideDrawer";
import Backdrop from "../../components/backDrop/BackDrop";

import "react-toastify/dist/ReactToastify.css";
import "./Product.styles.css";
import "../../App.css";

function Product() {
  const location = useLocation();
  const api = createApiSneakers();

  const [product, setProduct] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setProduct(location.state);
  }, []);

  const buy = async () => {
    if (!user.id) {
      toast.warn(
        "Faça o login ou cadastre-se para adicionar um produto no carrinho",
        {
          position: "top-right",
          autoClose: 1500,
        }
      );
      return;
    }

    const data = {
      customerId: user.id,
      productId: product.id,
    };

    try {
      await api.addProductCart(data);
      toast.success("Produto adicionado no carrinho :)", {
        position: "top-right",
        autoClose: 400,
      });
      handleOpenDrawerButton();
    } catch (error) {
      toast.error(
        "Aconteceu algum problema ao adicionar o produto no carrinho. Tente novamente mais tarde.",
        {
          position: "top-right",
          autoClose: 1500,
        }
      );
    }
  };

  const handleOpenDrawerButton = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleBackdropClick = () => {
    setDrawerOpen(false);
  };

  return (
    <main className="container-detail-product row">
      <SlideDrawer
        show={drawerOpen}
        closeSlideDrawer={handleOpenDrawerButton}
        closeBackdrop={handleBackdropClick}
      />
      {drawerOpen && <Backdrop closeDrawer={handleBackdropClick} />}

      <section className="column-image">
        <img src={product.image} width="450" height="450" />
      </section>
      <section className="column-info">
        <div class="wrapper-info">
          <div>
            <h1>{product.brand ? product.brand : "MARCA NÃO REGISTRADA"}</h1>
            <h3>{product.name}</h3>

            <div class="product-prices">
              <div class="product-price-value">
                <del></del>
                {formatPrice(product.price)}
              </div>
              <div class="product-price-instalments">
                <span>EM ATÉ</span>
                <b>10x</b> DE{" "}
                <b>{formatPrice(Number(location.state.price) / 10)}</b>
              </div>
            </div>
          </div>

          <div>
            <button type="button" className="buy-button" onClick={buy}>
              Comprar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Product;
