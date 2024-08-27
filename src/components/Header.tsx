import Image from "next/image";
import Link from "next/link";

function Header() {
	return (
		<nav className="h-[5svh] w-full px-2 flex justify-between items-center bg-gradient-to-t from-[#000000] from-90% to-[#7000FF] border-b border-[#ffffffa4] ">
			<div id="left" className="flex justify-center items-center">
				<Link href="/">
					<Image src="/images/logo.svg" alt="Logo" width={70} height={70} />
				</Link>
			</div>
			<div id="right" className="text-slate-50 flex justify-between  ">
				<Link href="/hola-web" className="mx-3">
					Hola Web
				</Link>
				<Link href="/" className="mx-3">
					Contact us
				</Link>
			</div>
		</nav>
	);
}

export default Header;
