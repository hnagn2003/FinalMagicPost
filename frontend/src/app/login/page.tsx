"use client";
import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useContext(AppContext) as AppContextProps;
	const router = useRouter();
	const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
		e.preventDefault();
		const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ email, password }),
		});
		const response = await res.json();
		if (res.status === 200) {
			setUser(response.user);
			router.push("/staff");
			toast.success(response.message);
		} else {
			toast(response.message, {
				type: "error",
			});
		}
	};
	return (
		<div className=" bg-base-200 p-4 hero min-h-screen md:p-12">
			<div className="lg:flex-row lg:gap-6 hero-content flex-col ">
				<div className="text-center lg:text-left ">
					<h1 className="text-5xl justify-center lg:block font-bold flex flex-row ">
						<Image
							width="0"
							height="0"
							src="/logo_horizonn.png"
							alt="MagicPost logo"
							className="w-3/4"
						/>
					</h1>
				</div>
				<div className="card max-w-sm shadow-2xl flex-shrink-0 w-full bg-base-100">
					<form className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								className="input input-bordered"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Mật khẩu</span>
							</label>
							<input
								type="password"
								placeholder="password"
								className="input input-bordered"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<label className="label">
								<a href="#" className="label-text-alt link link-hover">
									Quên mật khẩu
								</a>
							</label>
						</div>
						<div className="form-control mt-6">
							<button className="btn btn-primary" onClick={handleLogin}>
								Đăng nhập
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
