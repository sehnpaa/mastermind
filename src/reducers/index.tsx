import * as R from 'ramda';

interface CodePeg {
  kind: string;
  color: string;
}

interface KeyPeg {
  kind: string;
}

interface EmptyCodeSlot {
  kind: string;
  color: string;
}

interface EmptyKeySlot {}

interface Row {
  codeSlots: Array<CodeSlot>;
  keySlots: Array<KeySlot>;
}

interface State {
  board: Array<Row>;
}

const RedCodePeg: CodePeg = {
  kind: 'Code-peg',
  color: 'Red'
};

const GreenCodePeg: CodePeg = {
  kind: 'Code-peg',
  color: 'Green'
};

const CodeHole: EmptyCodeSlot = {
  kind: 'Code-hole',
  color: 'Dark-Grey'
};

type CodeSlot = CodePeg | EmptyCodeSlot;
type KeySlot = KeyPeg | EmptyKeySlot;

const initialState: State = {
  board: [
    {
      codeSlots: [
        CodeHole,
        CodeHole,
        CodeHole,
        CodeHole
      ],
      keySlots: [] as any
    }, {
      codeSlots: [
        RedCodePeg,
        GreenCodePeg,
        RedCodePeg,
        RedCodePeg
      ],
      keySlots: [] as any
    }
  ]
};

const nextCodeSlot = (codeSlot: CodeSlot): CodeSlot => {
  switch (codeSlot.kind) {
    case 'Code-peg': {
      return {
        kind: 'Code-peg',
        color: nextColor(codeSlot.color)
      };
    }
    case 'Code-hole': return RedCodePeg;
    default:
      return RedCodePeg;
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

const slotLens = (rowIndex: number, slotIndex: number): State => {
  return R.compose(
    R.lens(R.prop('board'), R.assoc('board')),
    R.lensIndex(rowIndex),
    R.lens(R.prop('codeSlots'), R.assoc('codeSlots')),
    R.lensIndex(slotIndex)
  );
};

const updateSlot = (
    state: State,
    rowIndex: number,
    slotIndex: number,
    newPeg: CodePeg): State => {
  const lens = slotLens(rowIndex, slotIndex);
  return R.set(lens, newPeg, state);
};

const getSlot = (
    state: State,
    rowIndex: number,
    slotIndex: number): CodeSlot => {
  const lens = slotLens(rowIndex, slotIndex);
  return R.view(lens, state);
};

const putCodePeg = (
    state: State,
    rowIndex: number,
    slotIndex: number): State => {
  const slot = getSlot(state, rowIndex, slotIndex);
  const newPeg = nextCodeSlot(slot);
  return updateSlot(state, rowIndex, slotIndex, newPeg);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SlotClick':
      return putCodePeg(state, action.rowIndex, action.slotIndex);
    default:
      return state;
  }
};

export default reducer;
