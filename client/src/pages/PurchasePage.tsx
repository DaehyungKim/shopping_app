import { useParams } from "react-router-dom";
import { Card, CardContent, Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { PurchaseForm } from "../components/purchase";
import { API_SERVER_DOMAIN } from "../constants";
import { getProduct } from "../utils/api";
import useAsync from "../hooks/useAsync";
import { NotFoundPage } from '.';

type ParamsType = {
  productId: string;
};

const PurchasePage = () => {
  const { productId } = useParams<ParamsType>();
  const { data, loading } = useAsync(()=>getProduct(productId!));

  if(loading) return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '50vh'
    }}>
      <CircularProgress />
    </Box>
  );
  
  if(!data) return <NotFoundPage />
  const product = data.data.product;
  
  return (
    <Container maxWidth="sm" sx={{ mb: 8 }}>
      <Typography variant="h4" sx={{ 
        marginBottom: 4, 
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333'
      }}>
        구매하기
      </Typography>
      <Grid container spacing={2}>
        <Grid sx={{ width: { md: '100%'}}}>
          <Card sx={{ 
            display: "flex", 
            marginBottom: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {product?.thumbnail && (
              <Box sx={{ 
                width: { xs: '100%', sm: 200 }, 
                height: { xs: 200, sm: 200 }, 
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img
                  src={`${API_SERVER_DOMAIN}/${product?.thumbnail}`}
                  alt={product?.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </Box>
            )}
            <CardContent sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 'bold',
                mb: 1
              }}>
                {product?.name}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: 'primary.main',
                fontWeight: '500'
              }}>
                {product?.price?.toLocaleString("ko-KR")}원
              </Typography>
            </CardContent>
          </Card>
          <PurchaseForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PurchasePage;
