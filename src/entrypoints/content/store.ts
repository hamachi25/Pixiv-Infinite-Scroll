import { create } from "zustand";
import type { ProfilePopupType } from "./type";

type State = {
	hoverTimeout: NodeJS.Timeout | undefined;
	profilePopupData: ProfilePopupType | undefined;
};

type Action = {
	setHoverTimeout: (hoverTimeout: NodeJS.Timeout | undefined) => void;
	setProfilePopupData: (profilePopupData: ProfilePopupType | undefined) => void;
};

export const useStore = create<State & Action>((set) => ({
	hoverTimeout: undefined,
	profilePopupData: undefined,
	setHoverTimeout: (hoverTimeout) => set({ hoverTimeout }),
	setProfilePopupData: (profilePopupData) => set({ profilePopupData }),
}));
