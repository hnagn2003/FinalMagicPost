export default function Content({ children }: { children: React.ReactNode }) {
	return (
		<main className="pt-16 flex flex-col bg-[#E8EEF2] text-[#363635] text-justify ">
			{children}
		</main>
	);
}
