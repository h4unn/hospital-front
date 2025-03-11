"use client";
import RootLayout from "@/layouts/Root.layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const HospitalRootLayout = (props: React.PropsWithChildren) => {
  const { children } = props;

  const queryClient = new QueryClient();

  return (
    <RootLayout>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RootLayout>
  );
};

export default HospitalRootLayout;
