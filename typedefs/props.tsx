import React from "react";

export type ModalProps = {
  openBtn: React.ReactNode;
  title: React.ReactNode | string;
  body: React.ReactNode;
};

export type SelectProps = {
  items: SelectItem[];
  default?: string;
  title?: string;
  setSelected?: React.Dispatch<string>;
  selected?: string;
};

export type SelectItem = {
  name: string;
  value: string;
};
