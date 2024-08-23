'use client';
import useScreenWidth from '@/customHooks/useScreenWidth';
import Link from 'next/link';

function Header() {
  const screenWidth = useScreenWidth();

  return (
    <nav className="flex justify-between bg-gradient-to-t from-[#000000] from-90% to-[#7000FF] border-b border-[#ffffffa4] py-2 px-3 w-full">
      <div id="left" className="flex justify-center items-center">
        <Link href="/">
          <img src="/images/logo.svg" alt="Logo" width="70px" />
        </Link>
      </div>
      <div id="right" className="text-slate-50 flex justify-between  ">
        <Link href="/hola-web" className="mx-3">
          Hola Web
        </Link>
        <Link href="/" className="mx-3">
          Contact us
        </Link>
        {screenWidth == null ? 'null' : screenWidth}
      </div>
    </nav>
  );
}

export default Header;
