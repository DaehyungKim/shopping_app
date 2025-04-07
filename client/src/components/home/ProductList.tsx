import { ProductItem } from ".";
import { CircularProgress, Grid } from "@mui/material";
import { getProducts } from "../../utils/api";
import useAsync from "../../hooks/useAsync";
import { NotFoundPage } from "../../pages";






const ProductList = () => {
  const { loading, data } = useAsync(getProducts);

  if (loading) return <CircularProgress />;
  if (!data) return <NotFoundPage />;

  return (

    
      <Grid container spacing={3}>
      {data.data.products.map((product) => (
        <ProductItem 
          key={product.id}
          product={product}

        />     
      ))}
      </Grid>
    
  );
};

export default ProductList;
