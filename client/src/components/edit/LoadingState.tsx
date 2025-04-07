import { CircularProgress, Typography, Box } from "@mui/material";

const LoadingState = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <CircularProgress />
      <Typography variant="h6">상품 정보를 불러오는 중...</Typography>
    </Box>
  );
};

export default LoadingState;