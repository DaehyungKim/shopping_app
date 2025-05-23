import { useNavigate } from "react-router-dom";
import { ProductType } from "../../types";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { API_SERVER_DOMAIN } from "../../constants";

interface ProductItemProps {
  product: ProductType;
}

function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate();
  const hnadlePushProductPage = () => {navigate(`/product/${product.id}`);};
  const handlePushPurchasePage = () => navigate(`/purchase/${product.id}`);

  return (
    <Grid sx={{ width: { md: '30%'},padding: 1.5}}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
        onClick={hnadlePushProductPage}>
        {product.thumbnail && (
          <CardMedia
            component="img"
            height="100%"
            image={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
            title={product.name}
          />
        )}
        <CardContent sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "'Roboto', 'Noto Sans KR', sans-serif",
              letterSpacing: '-0.5px'
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 30,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.explanation}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2, marginRight: "20px" }}>
          <Button
            size="small"
            onClick={handlePushPurchasePage}
            variant="contained"
          >
            구매하기
          </Button>
        </Box>
      </Card>
    </Grid>

  );
}

export default ProductItem;