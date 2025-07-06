import type { Work } from "@/types/works";

interface Props {
	work: Work;
}

export const OpenMuteModalButton = ({ work }: Props) => {
	return (
		<>
			<button
				className="absolute bottom-0 left-0 flex h-[32px] w-[32px] cursor-pointer justify-end"
				type="button"
				popoverTarget={`modal${work.id}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="white"
					stroke="black"
				>
					<path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
					<path d="M15 3v4a2 2 0 0 0 2 2h4" />
				</svg>
			</button>

			<dialog
				id={`modal${work.id}`}
				className="m-auto w-[360px] rounded-3xl p-6 backdrop:bg-(--charcoal-surface4)"
				popover="auto"
			>
				<div className="relative mb-6 text-center font-bold">
					<h1>ミュート設定</h1>
					<button
						className="absolute top-0 right-0 cursor-pointer"
						popoverTarget={`modal${work.id}`}
						popoverTargetAction="hide"
					>
						<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
							<path d="M14.8284 12L19.4142 16.5858C20.1953 17.3668 20.1953 18.6332 19.4142 19.4142 C18.6332 20.1953 17.3668 20.1953 16.5858 19.4142L12 14.8284L7.41421 19.4142 C6.63317 20.1953 5.36684 20.1953 4.58579 19.4142C3.80474 18.6332 3.80474 17.3668 4.58579 16.5858L9.17157 12 L4.58579 7.41421C3.80474 6.63317 3.80474 5.36684 4.58579 4.58579 C5.36684 3.80474 6.63317 3.80474 7.41421 4.58579L12 9.17157L16.5858 4.58579 C17.3668 3.80474 18.6332 3.80474 19.4142 4.58579C20.1953 5.36684 20.1953 6.63317 19.4142 7.41421L14.8284 12Z"></path>
						</svg>
					</button>
				</div>

				<div>
					<p>
						特定のクリエイターの作品や、タグのついた作品を非表示にすることができます。
					</p>
					<div className="mt-6">
						<div className="p-2.5">
							<p>候補</p>
						</div>
						<div className="[&>*]:px-2.5">
							{work.tags?.map((tag) => (
								<div
									key={tag}
									className="flex h-[40px] items-center justify-between"
								>
									<span className="ml-1.5 before:content-['#']">{tag}</span>
									<input type="checkbox" className="toggle" />
								</div>
							))}
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
};
