import Image from "next/image";
import Link from "next/link";
export default function Page(): React.ReactNode {
	return (
		<div className="hero min-h-screen  p-4 md:p-12 bg-base-200 max-w-full">
			<div className="hero-content  lg:gap-10 flex-col md:flex-row">
				<picture className=" w-2/3 md:max-w-xs">
					<source media="(max-width: 767px)" srcSet="/logo_horizon_nobg.png" />
					<Image
						src="/logo_nobg.png"
						width="0"
						height="0"
						className="w-full"
						alt="MagicPost logo"
					/>
				</picture>
				<div>
					<h1 className="md:text-4xl font-bold  text-2xl ">
						Your Go-to Shipping Service!
					</h1>
					<div className="flex w-full">
						<div className="w-1/2 flex gap-4 flex-col place-items-center ">
							If you are a customer
							<Link href="/customer">
								<button className="btn  sm:btn-sm md:btn-md btn-active btn-primary btn-xs">
									See your order
								</button>
							</Link>
						</div>
						<div className="divider divider-horizontal">OR</div>
						<div className="w-1/2 place-items-center gap-4 flex flex-col ">
							An employee?
							<Link href="/login">
								<button className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-primary ">
									Sign in
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
