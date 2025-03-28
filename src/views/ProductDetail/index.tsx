import cn from "classnames/bind";
import styles from "./ProductDetail.module.scss";

const cx = cn.bind(styles);

import Button from "@/component/Button/Button";

type ProductDetailProps = {
  product: IProduct;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className={cx("ProductDetail")}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <div>
        <Button
          label={"돌아가기"}
          onClick={() => window.history.back()}
          backgroundColor={"#FFEA3C"}
          borderColor={"#BFC662"}
          className={cx("ProductDetail__button")}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
