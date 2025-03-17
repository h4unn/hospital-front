"use client";

import { useQuery } from "@tanstack/react-query";

import { selectProductService } from "@/api/services";

import SelectProductList from "@/views/SelectProductList";
import Loading from "@/components/Loading";
import Section from "@/components/UI/Section";

export default function SelectProductListPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["selectProduct", "getSelectProducts"],
    queryFn: () => selectProductService.getSelectProducts(),
  });

  console.log(data);

  if (isLoading) return <Loading />;
  if (isError) return <div>{error.message}</div>;

  return (
    <Section title="선택 상품">
      <SelectProductList data={data} />
    </Section>
  );
}
