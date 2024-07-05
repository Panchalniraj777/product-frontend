import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { Box, Toolbar, Typography } from "@mui/material";
import { CustomAppBar, AddProductButton } from "./TopBar.style";

import { ProductContext } from "../../../App";

const TopBar = () => {
  const location = useLocation();
  const { handleAddProductModal } = useContext(ProductContext);
  const [removeAddProduct, setRemoveAddProduct] = useState(false);

  const handleAddProduct = () => {
    handleAddProductModal();
  };

  useEffect(() => {
    if (location?.pathname?.includes("detail")) {
      setRemoveAddProduct(true);
    } else {
      setRemoveAddProduct(false);
    }
  }, [location?.pathname]);

  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Box className="top-bar-wrapper">
          <Typography variant="h6">Products</Typography>
          {!removeAddProduct && (
            <AddProductButton
              variant="contained"
              onClick={() => handleAddProduct()}
            >
              Add Product
            </AddProductButton>
          )}
        </Box>
      </Toolbar>
    </CustomAppBar>
  );
};

export default TopBar;
