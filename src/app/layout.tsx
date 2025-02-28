"use client";
import { RecoilRoot } from "recoil";
import RootLayout from "@/layouts/Root.layout";

const HospitalRootLayout = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <RootLayout>
      <RecoilRoot>{children}</RecoilRoot>
    </RootLayout>
  );
};

export default HospitalRootLayout;
