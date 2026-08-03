export interface DialogMessage {
  id: string;
  text: string;
  delayBefore?: number;
  typingSpeed?: number;
}

export type DialogSequence = DialogMessage[];
