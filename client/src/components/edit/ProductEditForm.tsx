import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, CircularProgress } from "@mui/material";
import { ThumbnailUploader } from "../create";
import { getProduct, modifyProduct, modifyThumbnail } from "../../utils/api";
import { API_SERVER_DOMAIN } from "../../constants";

interface ProductEditFormProps {
  productId: string;
  onSuccess: () => void;
}

const ProductEditForm = ({ productId, onSuccess }: ProductEditFormProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setError("상품 ID가 없습니다.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await getProduct(productId);

        if (response && response.data && response.data.product) {
          const product = response.data.product;
          setName(product.name);
          setExplanation(product.explanation);
          setPrice(product.price);

          if (product.thumbnail) {
            setCurrentThumbnailUrl(product.thumbnail);
          }
        } else {
          setError("상품 정보를 불러올 수 없습니다.");
        }
      } catch (err) {
        setError("상품 정보를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleExplanationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExplanation(event.target.value);
  };

  const handleUpdateProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!productId) {
      setError("상품 ID가 없습니다.");
      return;
    }

    try {
      await modifyProduct({
        id: productId,
        name,
        explanation,
        price
      });
      
      if (thumbnail) {
        await modifyThumbnail(productId, thumbnail);
      }

      onSuccess();
    } catch (err) {
      setError("상품 정보 수정 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <CircularProgress />
        <Typography variant="h6">상품 정보를 불러오는 중...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>뒤로 가기</Button>
      </Box>
    );
  }

  return (
    <form onSubmit={handleUpdateProduct}>
      <TextField 
        label="상품 이름" 
        fullWidth 
        value={name}
        onChange={handleNameChange}
        margin="normal" 
        required 
      />
      <TextField 
        label="가격" 
        type="number" 
        fullWidth 
        value={price}
        onChange={handlePriceChange}
        margin="normal" 
        required 
      />
      <TextField 
        label="상품 설명" 
        fullWidth 
        multiline 
        rows={4}
        value={explanation}
        onChange={handleExplanationChange}
        margin="normal" 
        required 
      />
      {currentThumbnailUrl && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="subtitle1">현재 썸네일:</Typography>
          <img 
            src={`${API_SERVER_DOMAIN}/${currentThumbnailUrl}`}
            alt="현재 썸네일" 
            style={{ maxWidth: '100%', maxHeight: 200 }}
          />
        </Box>
      )}
      <ThumbnailUploader 
        value={thumbnail}
        onChange={(file) => setThumbnail(file)}
      />
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate(-1)}
          fullWidth
        >
          취소
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
        >
          수정하기
        </Button>
      </Box>
    </form>
  );
};

export default ProductEditForm;