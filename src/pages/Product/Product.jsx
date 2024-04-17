import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import "./Product.styles.css";
import "../../App.css";

function Product() {
  const location = useLocation();
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(location.state);
  }, []);

  return (
    <main className="container-detail-product row">
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
                <del></del>R$ 1.199,99
              </div>
              <div class="product-price-instalments">
                <span>EM ATÉ</span>
                <b>10x</b> DE <b>R$ 119,99</b>
              </div>
            </div>
          </div>

          <div>
            <button type="button" className="buy-button">
              Comprar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Product;
