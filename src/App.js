import React, { useContext, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./Components/Pages/Products/List";
import TopBar from "./Components/Common/TopBar";
import Detail from "./Components/Pages/Products/Detail";

export const ProductContext = createContext({
  isOpenAddProductModal: false,
  handleAddProductModal: () => {},
});

function App() {
  const [isOpenAddProductModal, setIsOpenAddProductModal] = useState(false);

  const handleAddProductModal = () => {
    setIsOpenAddProductModal(!isOpenAddProductModal);
  };

  return (
    <>
      <ProductContext.Provider
        value={{ isOpenAddProductModal, handleAddProductModal }}
      >
        <Router>
          <TopBar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/detail/:product_id" element={<Detail />} />
          </Routes>
        </Router>
      </ProductContext.Provider>
    </>
  );
}

export default App;
