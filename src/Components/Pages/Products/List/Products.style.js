import styled from 'styled-components';
import { Paper, Button } from '@mui/material';


export const ProductCard = styled(Paper)`
    padding: 20px;
    margin: 10px;
    text-align: center;
    min-height: 200px;
`;

export const ProductListImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

export const ActionButton = styled(Button)`
  margin-left: auto;
  background-color: #ff9800 !important;
  color: white;

  &:hover {
    background-color: #f57c00 !important;
  }
`;