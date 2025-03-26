"use client";
import RootLayout from "@/layouts/Root.layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const HospitalRootLayout = (props: React.PropsWithChildren) => {
  const { children } = props;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>{children}</RootLayout>
    </QueryClientProvider>
  );
};

export default HospitalRootLayout;
