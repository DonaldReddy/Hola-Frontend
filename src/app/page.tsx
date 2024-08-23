'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useScreenWidth from '@/customHooks/useScreenWidth';

export default function Home() {
  const screenWidth = useScreenWidth();

  return (
    <div className=" bg-black min-h-svh flex flex-col justify-between items-center text-slate-50">
      <span className="loader"></span>
      <Header />
      <div className=" min-h-svh flex justify-center items-center bg-[url('/images/background.svg')] bg-no-repeat bg-center bg-cover w-full">
        <img src="/images/logo.svg" className=" absolute" />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
