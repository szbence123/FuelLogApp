import React, { CSSProperties, SetStateAction } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TextStyle } from "tamagui";

export type ModalProps = {
	openBtn: React.ReactNode;
	title: React.ReactNode | string;
	body: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<SetStateAction<boolean>>;
};

export type SelectProps = {
	style?: any;
	items: SelectItem[];
	default?: string;
	title?: string;
	setSelected?: React.Dispatch<any>;
	selected?: string;
};

export type SelectItem = {
	name: string;
	value: string;
	icon?: React.ReactNode;
};
