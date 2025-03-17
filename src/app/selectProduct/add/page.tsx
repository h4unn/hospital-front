"use client";

import { useMutation } from "@tanstack/react-query";

import { selectProductService } from "@/api/services";

import SelectProduct from "@/views/SelectProduct";
import Section from "@/components/UI/Section";

export default function SelectProductPage() {
  const { mutate } = useMutation({
    mutationFn: (data: { name: string; description: string; price: number }) =>
      selectProductService.createSelectProduct(data),
  });

  return (
    <Section title="선택 상품">
      <SelectProduct mutation={mutate} />
    </Section>
  );
}
