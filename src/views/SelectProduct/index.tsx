"use client";

import cn from "classnames/bind";
import styles from "./SelectProduct.module.scss";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

type selectProductType = {
  name: string;
  description: string;
  price: number;
};

type selectProductProps = {
  mutation: (data: selectProductType) => void;
};

const schema = yup.object().shape({
  name: yup.string().required("상품 이름을 입력해주세요"),
  price: yup.number().required("상품 가격을 입력해주세요"),
  description: yup.string().required("상품 설명을 입력해주세요"),
});

const SelectProduct = ({ mutation }: selectProductProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<selectProductType>({
    resolver: yupResolver(schema),
  });

  return (
    <div className={cx("SelectProduct")}>
      <form
        className={cx("SelectProductForm")}
        onSubmit={handleSubmit(mutation)}
      >
        <Input
          label="상품 이름"
          {...register("name")}
          error={errors ? errors.name : undefined}
        />
        <Input
          label="상품 설명"
          {...register("description")}
          error={errors ? errors.description : undefined}
        />
        <Input
          label="상품 가격"
          {...register("price")}
          error={errors ? errors.price : undefined}
        />
        <Button
          label="등록하기"
          backgroundColor="#FFEA3C"
          borderColor="#BFC662"
          disabled={isSubmitting}
          type="submit"
        />
      </form>
    </div>
  );
};
export default SelectProduct;
