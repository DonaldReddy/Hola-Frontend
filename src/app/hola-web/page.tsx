import { Metadata } from 'next';
import Link from 'next/link';

export const generateMetadata = (): Metadata => {
  return { title: 'Hola Web' };
};

function page() {
  return (
    <div className="text-slate-50 min-h-svh flex flex-col justify-center items-center">
      <div className="flex flex-col justify-between items-center  h-[150px] mb-6">
        <h1>Welcome to</h1>
        <img src="/images/logo.svg" className="w-[200px]" />
        <h2>Chat App for New Age</h2>
      </div>
      <div className="">
        <Link
          href="/hola-web/sign-in"
          className="mx-5 border-slate-50 border rounded-md px-3 py-1 hover:bg-[#7000FF] hover:text-slate-50"
        >
          Sign in
        </Link>
        <Link
          href="/hola-web/sign-up"
          className="mx-5 border-slate-50 border rounded-md px-3 py-1 hover:bg-[#7000FF] hover:text-slate-50"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default page;
