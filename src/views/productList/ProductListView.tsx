"use client";
import cn from "classnames/bind";
import styles from "./ProductListView.module.scss";

import Section from "@/components/UI/Section";
import Item from "@/components/Item";
// import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

type ProductListViewProps = {
  products: IProduct[];
};

const ProductListView = (products: ProductListViewProps) => {
  return (
    <Section title={"병원 상품"} className={cx("ProductListWrapper")}>
      <ul className={cx("ProductList")}>
        {products.products.map((product) => (
          <Item
            key={product.id}
            title={product.name}
            description={product.description}
            price={product.price}
            selective={product.selective}
            className={cx("ProductItem")}
            onClick={() => {}}
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
