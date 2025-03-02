"use client";

import cn from "classnames/bind";
import styles from "./ProductRegister.module.scss";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Input from "@/components/Input";
import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

type addProductType = {
  name: string;
  description: string;
  price: number;
};
type propsType = {
  productFn: (data: productRequestType) => void;
};

const schema = yup.object().shape({
  name: yup.string().required("상품 이름을 입력해주세요"),
  description: yup.string().required("상품 설명을 입력해주세요"),
  price: yup.number().required("상품 가격을 입력해주세요"),
});

const ProductRegister = (props: propsType) => {
  const { productFn } = props;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<addProductType>({
    resolver: yupResolver(schema),
  });

  return (
    <div className={cx("productRegisterWrapper")}>
      <section className={cx("productRegisterSection")}>
        <h1 className={cx("productRegisterTitle")}>건강 검진 상품 등록</h1>
        <form
          className={cx("productRegisterContainer")}
          onSubmit={handleSubmit(productFn)}
        >
          <div className={cx("productRegisterInput")}>
            <Input
              label="상품 이름"
              {...register("name")}
              error={errors ? errors.name : undefined}
            />
          </div>
          <div className={cx("productRegisterInput")}>
            <Input
              label="상품 설명"
              {...register("description")}
              error={errors ? errors.description : undefined}
            />
          </div>
          <div className={cx("productRegisterInput")}>
            <Input
              label="상품 가격"
              type="number"
              {...register("price")}
              error={errors ? errors.price : undefined}
            />
          </div>
          {/* <div className={cx("productSelectContainer")}>
            <p className={cx("productSelectTitle")}>선택 검사</p>
            <div className={cx("productSelect")}>
              {selectOptions.map((option, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={option}
                    {...register("selective", {
                      required: "항목을 선택해주세요",
                    })}
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.selective && (
              <span className={cx("errorMessage")}>
                {errors.selective?.message}
              </span>
            )}
          </div> */}
          <div className={cx("registerBtn")}>
            <Button
              label="등록하기"
              backgroundColor="#FFEA3C"
              borderColor="#BFC662"
              disabled={isSubmitting}
              type="submit"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProductRegister;
