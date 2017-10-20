export interface CodePeg {
  kind: string;
  color: string;
}

export interface KeyPeg {
  kind: string;
  color: string;
}

export interface EmptyCodeSlot {
  kind: string;
  color: string;
}

export interface EmptyKeySlot {}

export interface Row {
  codeSlots: Array<CodeSlot>;
  keySlots: Array<KeySlot>;
}

export interface State {
  board: Array<Row>;
  solution: Array<CodeSlot>;
}

export const RedCodePeg: CodePeg = {
  kind: 'Code-peg',
  color: 'Red'
};

export const GreenCodePeg: CodePeg = {
  kind: 'Code-peg',
  color: 'Green'
};

export const BlueCodePeg: CodePeg = {
  kind: 'Code-peg',
  color: 'Blue'
};

export const YellowCodePeg: CodePeg = {
  kind: 'Code-peg',
  color: 'Yellow'
};

export const CodeHole: EmptyCodeSlot = {
  kind: 'Code-hole',
  color: 'Dark-Grey'
};

export const BlackKeyPeg: KeyPeg = {
  kind: 'Key-peg',
  color: 'Black'
};

export const WhiteKeyPeg: KeyPeg = {
  kind: 'Key-peg',
  color: 'White'
};

export const KeyHole: EmptyKeySlot = {
  kind: 'Key-hole',
  color: 'Dark-Grey'
};

export interface ActiveRow {
  kind: string;
}

export interface InactiveRow {
  kind: string;
}

export const activeRow: ActiveRow = {
  kind: 'activeRow'
};

export const inactiveRow: InactiveRow = {
  kind: 'inactiveRow',
};

export interface CompleteGuess {
  kind: string;
}

export interface IncompleteGuess {
  kind: string;
}

export const CompleteGuess: Guess = {
  kind: 'completeGuess'
};

export const IncompleteGuess: Guess = {
  kind: 'incompleteGuess',
};

export type CodeSlot = CodePeg | EmptyCodeSlot;
export type KeySlot = KeyPeg | EmptyKeySlot;
export type RowStatus = ActiveRow | InactiveRow;
export type Guess = CompleteGuess | IncompleteGuess;

export interface SlotClickAction {
  type: string;
  rowIndex: number;
  slotIndex: number;
}

export interface CalcKeyPegsAction {
  type: string;
}
