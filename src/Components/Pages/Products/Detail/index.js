import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  Checkbox,
  Box,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  ProductImage,
  MainImageContainer,
  ProductTitle,
  ProductDescription,
} from "./Detail.style";
import { ProductListImage } from "../List/Products.style";

import {
  calculateDiscountPercentage,
  getSaveUpto,
} from "../../../../Helper/Helper";

const Detail = () => {
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [productCombo, setProductCombo] = useState([]);
  const [saveUpto, setSaveUpto] = useState(0);
  const [total, setTotal] = useState(0);

  const getImageUrl = (image) => {
    if (!image) return;
    return `${process.env.REACT_APP_IMAGE_BASE_URL}/uploads/${image}`;
  };
  const handleCheckboxChange = (event, index) => {
    const copyProductCombo = [...productCombo];
    copyProductCombo[index].product.is_checked = event.target.checked;
    setProductCombo(copyProductCombo);

    let totalSaveUpto = 0,
      total = 0;

    copyProductCombo.forEach((element) => {
      const { is_checked, main_price, combo_price } = element?.product;
      if (is_checked) {
        totalSaveUpto += getSaveUpto(main_price, combo_price);
        total += combo_price;
      }
    });

    setSaveUpto(totalSaveUpto);
    setTotal(total);
  };

  useEffect(() => {
    let { product } = location?.state;

    if (product?.combo_products?.length > 0) {
      const data = [
        {
          product: {
            combo_price: product.combo_price,
            description: product.description,
            discounted_price: product.discounted_price,
            image: product.image,
            main_price: product.main_price,
            name: product.name,
            _id: product._id,
          },
        },
      ];
      let comboProduct = [],
        totalSaveUpto = 0,
        total = 0;

      [...data, ...product?.combo_products]?.forEach((element) => {
        const { main_price, combo_price } = element?.product;

        totalSaveUpto += getSaveUpto(main_price, combo_price);
        total += combo_price;

        comboProduct.push({
          product: {
            ...element.product,
            is_checked: true,
          },
        });
      });
      setProductCombo(comboProduct);
      setSaveUpto(totalSaveUpto);
      setTotal(total);
    }

    setProduct(product);
  }, [location?.state?.product?._id]);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MainImageContainer>
            <ProductImage
              src={getImageUrl(product?.image)}
              alt={product?.name}
            />
          </MainImageContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <ProductTitle variant="h4" component="h1">
              {product?.name}
            </ProductTitle>
            <Divider sx={{ my: 2 }} />
            <ProductDescription variant="body1">
              {product?.description}
            </ProductDescription>
            <Typography variant="h6" gutterBottom>
              Discount Price: ₹{product?.discounted_price} (
              {calculateDiscountPercentage(
                product?.main_price,
                product?.discounted_price
              )}
              %)
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price (M.R.P): ₹{product?.main_price}
            </Typography>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {productCombo?.length > 0 && (
        <Grid sx={{ mt: 4 }}>
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Typography>
              Special Combo For You And Save Upto : ₹ {saveUpto}
            </Typography>
            <Typography>Total: ₹ {total}</Typography>
          </Card>
        </Grid>
      )}

      <Grid sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table aria-label="product table">
            {productCombo?.length ? (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell>Selected</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Main Price</TableCell>
                    <TableCell>Combo Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productCombo?.map((product, index) => (
                    <TableRow key={product?.product?._id}>
                      <TableCell>
                        <Checkbox
                          checked={product?.product?.is_checked}
                          onChange={(e) => handleCheckboxChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <ProductListImage
                          src={getImageUrl(product?.product?.image)}
                          alt={product?.product?.name}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {product?.product?.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {product?.product?.main_price && (
                          <Typography variant="body1">
                            ₹{product?.product?.main_price}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {product?.product?.combo_price && (
                          <Typography variant="body1" color="error">
                            ₹{product?.product?.combo_price}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            ) : (
              <TableHead>
                <TableRow>
                  <TableCell>No Combo offer available</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
            )}
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
};

export default Detail;
