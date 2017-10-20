import * as R from 'ramda';
import * as T from '../Types';
import * as L from '../Lenses';

const emptyRow = (): T.Row => {
  return {
    codeSlots: [
      T.CodeHole,
      T.CodeHole,
      T.CodeHole,
      T.CodeHole
    ],
    keySlots: [
      T.KeyHole,
      T.KeyHole,
      T.KeyHole,
      T.KeyHole
    ]
  };
};

const initialState: T.State = {
  board: [
      emptyRow()
  ],
  solution: [T.RedCodePeg, T.GreenCodePeg, T.GreenCodePeg, T.BlueCodePeg]
};

const nextCodeSlot = (codeSlot: T.CodeSlot): T.CodeSlot => {
  switch (codeSlot.kind) {
    case 'Code-peg': {
      return {
        kind: 'Code-peg',
        color: nextColor(codeSlot.color)
      };
    }
    case 'Code-hole': return T.RedCodePeg;
    default:
      return T.RedCodePeg;
  }
};

const nextColor = (color: string): string => {
  switch (color) {
    case 'Red':
      return 'Blue';
    case 'Blue':
      return 'Green';
    case 'Green':
      return 'Yellow';
    case 'Yellow':
      return 'Red';
    default:
      return color;
  }
};

const updateSlot = (
    state: T.State,
    rowIndex: number,
    slotIndex: number,
    newPeg: T.CodePeg): T.State => {
  const lens = L.slotLens(rowIndex, slotIndex);
  return R.set(lens, newPeg, state);
};

const getSlot = (
    state: T.State,
    rowIndex: number,
    slotIndex: number): T.CodeSlot => {
  const lens = L.slotLens(rowIndex, slotIndex);
  return R.view(lens, state);
};

const putCodePeg = (
    state: T.State,
    rowIndex: number,
    slotIndex: number): T.State => {
  const slot = getSlot(state, rowIndex, slotIndex);
  const newPeg = nextCodeSlot(slot);
  return updateSlot(state, rowIndex, slotIndex, newPeg);
};

const getCodeSlots = (
    state: T.State,
    rowIndex: number): Array<T.CodeSlot> => {
  const l = L.codeSlotsLens(rowIndex);
  return R.view(l, state);
};

const getRowStatus = (state: T.State, rowIndex: number): T.RowStatus => {
  const codeSlots = getCodeSlots(state, rowIndex);
  const guessStatus = guessCompleteness(codeSlots);
  switch (guessStatus.kind) {
    case 'incompleteGuess':
      return T.activeRow;
    case 'completeGuess':
      return T.inactiveRow;
    default:
      return T.inactiveRow;
  }
};

const addNewRow = (state: T.State): T.State => {
  const l = L.boardProp();
  return R.over(
    l,
    (n: Array<T.Row>) => {
      return n.concat(emptyRow());
    },
    state
  );
};

const handleSlotClick = (state: T.State, rowIndex: number, slotIndex: number): T.State => {
  const status = getRowStatus(state, rowIndex);
  switch (status.kind) {
    case 'activeRow':
      return putCodePeg(state, rowIndex, slotIndex);
    case 'inactiveRow':
      return state;
    default:
      return state;
  }
};

const guessCompleteness = (codeSlots: Array<T.CodeSlot>): T.Guess => {
  return (codeSlots.some(x => x.kind === 'Code-hole'))
    ? T.IncompleteGuess
    : T.CompleteGuess;
};

const handleCalcKeyPegs = (state: T.State): T.State => {
  const l = L.codeSlotOfLastRowLens();
  const l2 = L.keySlotOfLastRowLens();
  const l3 = L.boardProp();
  switch (guessCompleteness(R.view(l, state))) {
    case T.CompleteGuess:
      const keyPegs = [T.BlackKeyPeg, T.BlackKeyPeg, T.BlackKeyPeg, T.KeyHole];
      const a = R.set(l2, keyPegs, state);
      const b = R.over(
        l3,
        (n: Array<T.Row>) => {
         return n.concat(emptyRow());
        },
        a
      );
      return b;
    case T.IncompleteGuess:
      return state;
    default:
      return state;
  }
};

const reducer = (state: T.State = initialState, action: any) => {
  switch (action.type) {
    case 'SlotClick':
      return handleSlotClick(state, action.rowIndex, action.slotIndex);
    case 'CalcKeyPegs':
      return handleCalcKeyPegs(state);
    default:
      return state;
  }
};

export default reducer;
