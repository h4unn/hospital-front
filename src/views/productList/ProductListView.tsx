"use client";
import cn from "classnames/bind";
import styles from "./ProductListView.module.scss";
import { useRouter } from "next/navigation";
import Section from "@/components/UI/Section";
import Item from "@/components/Item";
// import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

type ProductListViewProps = {
  products: IProduct[];
};
const ProductListView: React.FC<ProductListViewProps> = ({ products }) => {
  const router = useRouter();

  function handleClick(id: string) {
    router.push(`product/${id}`);
  }

  return (
    <Section title={"병원 상품"} className={cx("ProductListWrapper")}>
      <ul className={cx("ProductList")}>
        {products.map((product) => (
          <Item
            key={product.id}
            id={product._id}
            title={product.name}
            description={product.description}
            price={product.price}
            selective={product.selective}
            className={cx("ProductItem")}
            onClick={handleClick}
          />
        ))}
      </ul>
    </Section>
  );
};

export default ProductListView;

// const handleMapClick = (address: string) => {
//   const encodedAddress = encodeURIComponent(address);
//   const naverMapUrl = `https://map.naver.com/v5/search/${encodedAddress}`;
//   window.open(naverMapUrl, "_blank");
// };
