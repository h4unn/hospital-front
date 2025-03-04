"use client";
import { RecoilRoot } from "recoil";
import RootLayout from "@/layouts/Root.layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const HospitalRootLayout = (props: React.PropsWithChildren) => {
  const { children } = props;

  const queryClient = new QueryClient();

  return (
    <RootLayout>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </RecoilRoot>
    </RootLayout>
  );
};

export default HospitalRootLayout;
