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

const nextColor = (color): string => {
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

const getRowStatus = (state, rowIndex): T.RowStatus => {
  const l = L.codeSlotsLens(rowIndex);
  const codeSlots = R.view(l, state);
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
  const l = R.lens(R.prop('board'), R.assoc('board'));
  return R.over(
    l,
    (n) => {
      return n.concat(emptyRow());
    },
    state
  );
};

const handleSlotClick = (state, rowIndex, slotIndex): T.State => {
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
  const l = R.compose(
    L.lastRowLens(),
    R.lens(R.prop('codeSlots'), R.assoc('codeSlots'))
  );
  const l2 = R.compose(
    L.lastRowLens(),
    R.lens(R.prop('keySlots'), R.assoc('keySlots'))
  );
  const l3 = R.compose(
    R.lens(R.prop('board'), R.assoc('board'))
  );

  switch (guessCompleteness(R.view(l, state))) {
    case T.CompleteGuess:
      const keyPegs = [T.BlackKeyPeg, T.BlackKeyPeg, T.BlackKeyPeg, T.KeyHole];
      const a = R.set(l2, keyPegs, state);
      const b = R.over(
        l3,
        (n) => {
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

const reducer = (state: T.State = initialState, action) => {
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
