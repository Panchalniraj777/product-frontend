import styled from "styled-components";
import { AppBar, Button } from "@mui/material";

export const CustomAppBar = styled(AppBar)`
  background-color: #2196f3;

  .top-bar-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

export const AddProductButton = styled(Button)`
  margin-left: auto;
  background-color: #ff9800 !important;
  color: white;

  &:hover {
    background-color: #f57c00 !important;
  }
`;
