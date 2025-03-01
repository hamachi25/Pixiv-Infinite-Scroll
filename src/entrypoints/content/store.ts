import { create } from "zustand";
import type { Work } from "@/types/works";
import type { ProfilePopupType } from "@content/type";
import React from "react";

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

type MuteState = {
	muteContent: Work | undefined;
};

type MuteAction = {
	muteDialog: React.RefObject<HTMLDialogElement | null>;
	setMuteContent: (muteContent: Work) => void;
};

export const muteStore = create<MuteState & MuteAction>((set) => ({
	muteDialog: React.createRef<HTMLDialogElement>(),
	muteContent: undefined,
	setMuteContent: (muteContent) => set({ muteContent }),
}));
