import { RxCross2 } from "react-icons/rx";
import { muteStore } from "@content/store";

export const MuteDialogContainer = () => {
	const { muteDialog, muteContent } = muteStore();

	return (
		<dialog className="modal" ref={muteDialog}>
			<div className="modal-box max-w-md">
				<button
					className="absolute right-[20px] top-[20px]"
					onClick={() => muteDialog.current?.close()}
				>
					<RxCross2 size={24} />
				</button>
				<div className="pb-[12px]">
					<h3 className="mx-auto flex justify-center text-[16px] font-bold">
						ミュート設定
					</h3>
				</div>
				<section className="min-h-[400px]">
					<p className="text-[14px]">
						特定のクリエイターの作品や、タグのついた作品を非表示にすることができます。
					</p>
					<div className="mt-[20px] overflow-y-auto">
						<div className="form-control h-[40px] hover:bg-[var(--charcoal-transparent-hover)]">
							<label className="label h-full cursor-pointer">
								<img
									className="h-[20px] w-[20px] rounded-full"
									src={muteContent?.profileImageUrl}
								/>
								<span className="ml-[4px] mr-auto text-[14px]">
									{muteContent?.userName}
								</span>
								<input type="checkbox" className="toggle toggle-sm" />
							</label>
						</div>
						{muteContent?.tags?.map((tag) => (
							<div
								className="form-control h-[40px] hover:bg-[var(--charcoal-transparent-hover)]"
								key={tag}
							>
								<label className="label h-full cursor-pointer">
									<span className="text-[14px] before:content-['#']">{tag}</span>
									<input type="checkbox" className="toggle toggle-sm" />
								</label>
							</div>
						))}
					</div>
				</section>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
};
