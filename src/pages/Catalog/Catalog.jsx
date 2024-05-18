import "./Catalog.styles.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createApiSneakers } from "../../services/apiAuraSneakersService";
import { useNavigate } from "react-router-dom";

function Catalog() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const api = createApiSneakers();
  const [products, setProducts] = useState([]);

  const getPriceInstallment = (price) => {
    const priceInstallment = price / 10;

    return Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
      roundingMode: "floor",
    }).format(priceInstallment);
  };

  useEffect(() => {
    async function fetchData() {
      const products = await api.getAllProductsByName(q);
      return setProducts(products);
    }
    fetchData();
  }, []);

  return (
    <>
      <main>
        <h2 id="page-catalog-title">
          {q} ({products.length})
        </h2>
        <section>
          <div className="products-container row">
            {products &&
              products.map((product) => {
                return (
                  <div
                    className="product-item-container"
                    key={product.id}
                    onClick={() =>
                      navigate(`/product/${product.id}`, { state: product })
                    }
                  >
                    <img src={product.image} width="250" height="250" />
                    <div className="product-title">{product.name}</div>
                    <div className="product-item-amount">
                      {Intl.NumberFormat("pt-br", {
                        style: "currency",
                        currency: "BRL",
                        roundingMode: "floor",
                      }).format(product.price)}
                    </div>
                    <div className="product-item-installments">
                      10x {getPriceInstallment(product.price)}
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
}

export default Catalog;
