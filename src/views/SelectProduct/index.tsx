import cn from "classnames/bind";
import styles from "./SelectProduct.module.scss";

const cx = cn.bind(styles);

type selectProductProps = {
  mutation: (data: ISelectProduct) => void;
};

const SelectProduct = ({ mutation }: selectProductProps) => {
  return (
    <div
      className={cx("SelectProduct")}
      onClick={() =>
        mutation({ name: "상품", price: 10000, description: "설명" })
      }
    >
      <h3>상품을 선택해주세요.</h3>
    </div>
  );
};
export default SelectProduct;
