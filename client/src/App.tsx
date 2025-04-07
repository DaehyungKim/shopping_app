import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/shared";
import { CartPage, HomePage, ProductCreatePage, ProductEditPage, NotFoundPage, ProductPage, PurchasePage } from "./pages";



function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="create" element={<ProductCreatePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="purchase/:productId" element={<PurchasePage />} />
        <Route path="edit/:productId" element={<ProductEditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>  
  );
}

export default App;
