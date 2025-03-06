import { useMutation } from "@tanstack/react-query";

import { selectProductService } from "@/api/services";

import SelectProduct from "@/views/SelectProduct";
import Section from "@/components/UI/Section";

export default function SelectProductPage() {
  const { mutate } = useMutation<ISelectProduct, Error, productResponseType>({
    mutationFn: (data) => selectProductService.createSelectProduct(data),
  });

  return (
    <Section title="선택 상품">
      <SelectProduct mutation={mutate} />
    </Section>
  );
}
