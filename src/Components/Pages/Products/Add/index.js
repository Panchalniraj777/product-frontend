import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import httpService from "../../../../Helper/httpService";
import styled from "styled-components";

const UploadButton = styled(Button)`
  && {
    margin-top: 16px;
  }
`;

const validationSchema = yup.object({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Product description is required"),
  main_price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .integer("Price must be an integer"),
  discounted_price: yup
    .number()
    .required("Discounted Price is required")
    .positive("Discounted Price must be positive")
    .integer("Discounted Price must be an integer")
    .test(
      "is-less-than-main-price",
      "Discounted Price must be less than Main Price",
      function (value) {
        const mainPrice = this.parent.main_price;
        return value < mainPrice;
      }
    ),
  image: yup.mixed().required("Image is required"),
  combo_price: yup
    .number()
    .required("Combo Price is required")
    .positive("Combo Price must be positive")
    .integer("Combo Price must be an integer")
    .test(
      "is-less-than-main-price",
      "Combo Price must be less than Main Price",
      function (value) {
        const mainPrice = this.parent.main_price;
        return value < mainPrice;
      }
    )
    .test(
      "is-less-than-discounted-price",
      "Combo Price must be less than Discounted Price",
      function (value) {
        const discountedPrice = this.parent.discounted_price;
        return value < discountedPrice;
      }
    ),
});

const AddProductModal = ({ open, onClose }) => {
  const [submitting, setSubmitting] = useState(false);
  const [comboProductOption, setComboProductOption] = useState([]);

  const handleSelectedProduct = (value) => {
    formik.setFieldValue("combo_products", value);
  };
  const handleImageChange = (e) => {
    formik.setFieldValue("image", e.target.files[0]);
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);

    let {
      name,
      description,
      main_price,
      discounted_price,
      image,
      combo_price,
      combo_products,
    } = values;

    combo_products = combo_products?.map?.((element) => ({
      product: element?._id,
    }));

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("main_price", main_price);
    formData.append("discounted_price", discounted_price);
    formData.append("combo_price", combo_price);
    formData.append("image", image);
    formData.append("combo_products", JSON.stringify(combo_products));

    try {
      await httpService.post("", formData);
      setSubmitting(false);
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      main_price: "",
      discounted_price: "",
      combo_price: "",
      combo_products: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const fetchProducts = async () => {
    try {
      const response = await httpService.get("");
      const { data } = response.data;
      setComboProductOption(data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();

    return () => {
      formik.resetForm({});
      setComboProductOption([]);
    };
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-product-modal-title"
      aria-describedby="add-product-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="add-product-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Add Product
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Product Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Product Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
          />
          <TextField
            fullWidth
            id="main_price"
            name="main_price"
            label="Price"
            type="number"
            value={formik.values.main_price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.main_price && Boolean(formik.errors.main_price)
            }
            helperText={formik.touched.main_price && formik.errors.main_price}
            margin="normal"
          />
          <TextField
            fullWidth
            id="discounted_price"
            name="discounted_price"
            label="Discounted Price"
            type="number"
            value={formik.values.discounted_price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.discounted_price &&
              Boolean(formik.errors.discounted_price)
            }
            helperText={
              formik.touched.discounted_price && formik.errors.discounted_price
            }
            margin="normal"
          />
          <TextField
            fullWidth
            id="combo_price"
            name="combo_price"
            label="Combo Price"
            type="number"
            value={formik.values.combo_price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.combo_price && Boolean(formik.errors.combo_price)
            }
            helperText={formik.touched.combo_price && formik.errors.combo_price}
            margin="normal"
          />

          <Autocomplete
            multiple
            id="combo_products"
            options={comboProductOption || []}
            getOptionLabel={(option) => option?.name}
            onChange={(e, value) => handleSelectedProduct(value)}
            value={formik.values.combo_products}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Combo Products"
                placeholder="Products"
              />
            )}
            fullWidth
          />
          <input
            accept="image/*"
            id="image"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <UploadButton variant="contained" color="primary" component="span">
              Upload Image
            </UploadButton>
          </label>
          {formik.errors.image && (
            <FormHelperText error>{formik.errors.image}</FormHelperText>
          )}
          {formik.values.image && (
            <Typography>{formik.values.image.name}</Typography>
          )}
          <FormHelperText error={true}>{formik.errors.general}</FormHelperText>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={onClose} color="secondary" sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Product"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
