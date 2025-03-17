"use client";
import ReservationView from "@/views/reservation/ReservationView";
const Home = () => {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  return (
    <>
      <ReservationView />
    </>
  );
};

export default Home;
