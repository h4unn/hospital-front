type ProductDetailProps = {
  product: IProduct;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
};

export default ProductDetail;
