import React, { useEffect, useState } from "react";
import Home from "../components/main/Home";
import Search from "../components/main/Search";
import Favourite from "../components/main/Favourite";
import Navbar from "../components/main/Navbar";
import app_api from "../config/ApiConfig";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const MainModule = () => {
  const navigate = useNavigate();
  const [productsToCompare, setProductsToCompare] = useState([]);
  const [activeLink, setActiveLink] = useState("home");
  const [search, setSearch] = useState("house products");
  const [data, setData] = useState([]);
  const getData = debounce(async () => {
    const data = await app_api.post("products/search", {
      query: `${search}`,
    });
    setData(
      data.data.combinedProducts.filter(
        (product) => product.title !== "No title found"
      )
    );
  }, 2000);

  useEffect(() => {
    getData();
    return () => {
      getData.cancel();
    };
  }, [search]);

  const activeSection = () => {
    switch (activeLink) {
      case "home":
        return <Home />;
      case "search":
        return (
          <Search
            data={data}
            setSearch={setSearch}
            search={search}
            productsToCompare={productsToCompare}
            setProductsToCompare={setProductsToCompare}
          />
        );
      case "favourite":
        return <Favourite />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="w-full relative h-full flex items-center justify-center">
      <Navbar activeLink={activeLink} setActiveLink={setActiveLink} />
      {activeSection()}
      {productsToCompare.length > 0 && (
        <div className="fixed bottom-7 right-7 bg-white p-2 rounded-lg w-fit h-36 flex items-center justify-center gap-4">
          {productsToCompare.map((product) => (
            <div className="flex flex-col w-48 items-center justify-center">
              <img
                className="h-16 w-16 object-contain rounded-lg"
                src={product.image || "https://source.unsplash.com/random"}
                alt=""
              />
              <div className="px-6 h-12 py-2">
                <div
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    maxHeight: "7rem",
                  }}
                  className="font-bold text-sm mb-2"
                >
                  {product.title}
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              if (productsToCompare.length > 1) {
                navigate("/compare", { state: { productsToCompare } });
              } else {
                toast.error("Select atleast 2 products to compare");
              }
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Compare
          </button>
        </div>
      )}
    </div>
  );
};

export default MainModule;
