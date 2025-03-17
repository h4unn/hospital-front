import React from "react";

type SelectProductListProps = {
  data: ISelectProduct[] | undefined;
};

const SelectProductList: React.FC<SelectProductListProps> = ({ data }) => {
  if (!data) {
    return <div>상품 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div>
      {data.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default SelectProductList;
