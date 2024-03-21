import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
      <section>
        <img src={product.image} width="350" height="350" />
      </section>
      <section>
        <h3>{product.name}</h3>
        <h4>
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
            roundingMode: "floor",
          }).format(product.price)}
        </h4>
        <h5>
          10x{" "}
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
            roundingMode: "floor",
          }).format(product.price / 10)}
        </h5>
        <button type="button">Comprar</button>
      </section>
    </main>
  );
}

export default Product;
