export enum Sender {
  USER = "USER",
  AI = "AI",
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isError?: boolean;
}

export enum ViewMode {
  DESKTOP = "DESKTOP",
  TABLET = "TABLET",
  MOBILE = "MOBILE",
}

export type Theme = "light" | "dark";

export interface GeneratedContent {
  code: string;
  explanation: string;
}

export type ModalSize = "sm" | "md" | "lg" | "xl" | "x2";
