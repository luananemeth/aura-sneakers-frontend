import "./Home.styles.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { createApiSneakers } from "../../services/apiAuraSneakersService";
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from "swiper";
import "swiper/swiper-bundle.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const api = createApiSneakers();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const products = await api.getAllProducts();
      return setProducts(products);
    }
    fetchData();
  }, []);

  const getPriceInstallment = (price) => {
    const priceInstallment = price / 10;

    return Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
      roundingMode: "floor",
    }).format(priceInstallment);
  };

  return (
    <>
      <section>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          effect={"fade"}
        >
          <SwiperSlide>
            <img src="https://artwalk.vteximg.com.br/arquivos/ids/480798/5103" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://artwalk.vteximg.com.br/arquivos/ids/480796/5103" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://artwalk.vteximg.com.br/arquivos/ids/480797/5103" />
          </SwiperSlide>
        </Swiper>
      </section>

      <main>
        <h1 id="page-title">Tênis</h1>
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

export default Home;
