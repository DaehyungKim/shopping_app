import { useState } from "react";
import { ProductType } from "../../types";
import { ThumbnailUploader} from ".";
import { Button, Container,   
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const ProductCreateForm = () => {
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [createdProductId, setCreatedProductId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();



  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };
  
  const handleExplanationChange = (event: React.ChangeEvent<HTMLTextAreaElement> ) => {
    setExplanation(event.target.value);
  };

  const uploadThumbnailRequest = (productId: String, thumbnail: File) => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    return fetch(`/product/thumbnail/${productId}`, {
      method: "PATCH",
      body: formData,
    });
  };

  const createProductRequest = (newProduct: Omit<ProductType, "id">) => {
    return fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  };

  const handleCreateProduct = async(event: React.FormEvent) => {
    event.preventDefault();
    const response = await createProductRequest({
      name,
      explanation,
      price,
    });
    const data = await response.json();
    console.log(data.message);
    if(thumbnail){
      const thumbnailResponse = await uploadThumbnailRequest(data.product.id, thumbnail);
      const thumbnailData = await thumbnailResponse.json();
      console.log(thumbnailData.message);
    };
    setCreatedProductId(data.product.id);
    setIsModalOpen(true);

  };
  const handlePushProductPage = () => {
    setIsModalOpen(false);
    navigate(`/product/${createdProductId}`);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          상품 생성
        </Typography>
        <form onSubmit={handleCreateProduct}>
          <TextField
            label="상품 이름"
            fullWidth
            value={name}
            onChange={handleNameChange}
            margin="normal"
          />
          <TextField
            label="가격"
            type="number"
            fullWidth
            value={price}
            onChange={handlePriceChange}
            margin="normal"
            />
          <TextField
            label="상품 설명"
            fullWidth
            multiline
            rows={4}
            value={explanation}
            onChange={handleExplanationChange}
            margin="normal"
          />
          <ThumbnailUploader value={thumbnail} onChange={(file) => setThumbnail(file)} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "16px" }}
            >생성</Button>  
          </form>
      </Container>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          상품을 성공적으로 추가했습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            확인을 누르면 상품상세 페이지로 이동합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePushProductPage} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
};

export default ProductCreateForm;
