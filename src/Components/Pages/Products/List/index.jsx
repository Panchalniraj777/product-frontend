import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductListImage, ActionButton } from "./Products.style";
import AddProductModal from "../Add";
import { ProductContext } from "../../../../App";
import httpService from "../../../../Helper/httpService";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const Products = () => {
  const { isOpenAddProductModal, handleAddProductModal } =
    useContext(ProductContext);

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  
  const getImageUrl = (image) => {
    if (!image) return;
    return `${process.env.REACT_APP_IMAGE_BASE_URL}/uploads/${image}`;
  };
  
  const handleProductDetailView = (product) => {
    navigate(`/detail/${product._id}`, {
      state: {
        product: product,
      },
    });
  };

  const fetchProducts = async () => {
    try {
      const response = await httpService.get("");
      const { data } = response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isOpenAddProductModal]);

  return (
    <>
      {products?.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Main Price</TableCell>
                <TableCell>Discounted Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <ProductListImage
                      src={getImageUrl(product?.image)}
                      alt={product?.name}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{product?.name}</Typography>
                  </TableCell>
                  <TableCell>
                    {product?.main_price && (
                      <Typography variant="body1">
                        ₹{product?.main_price}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {product?.discounted_price && (
                      <Typography variant="body1" color="error">
                        ₹{product?.discounted_price}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {product?.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display={"flex"} gap={2}>
                      <Typography variant="body2">
                        <ActionButton
                          variant="contained"
                          onClick={() => handleProductDetailView(product)}
                        >
                          View
                        </ActionButton>
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box display='flex' justifyContent='center' margin='50px'>
          <Typography variant="h2">Please add product</Typography>
        </Box>
      )}
      <AddProductModal
        open={isOpenAddProductModal}
        onClose={handleAddProductModal}
      />
    </>
  );
};

export default Products;
