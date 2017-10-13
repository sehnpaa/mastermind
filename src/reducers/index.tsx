import * as R from 'ramda';

interface CodePeg {
  kind: string;
  color: string;
}

interface KeyPeg {
  kind: string;
  color: string;
}

interface EmptyCodeSlot {
  kind: string;
  color: string;
}

interface EmptyKeySlot {}

interface Row {
  codeSlots: Array<CodeSlot>;
  keySlots: Array<KeySlot>;
  status: RowStatus;
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

const BlackKeyPeg: KeyPeg = {
  kind: 'Key-peg',
  color: 'Black'
};

const WhiteKeyPeg: KeyPeg = {
  kind: 'Key-peg',
  color: 'White'
};

const KeyHole: EmptyKeySlot = {
  kind: 'Key-hole',
  color: 'Dark-Grey'
};

interface ActiveRow {
  kind: string;
}

interface InactiveRow {
  kind: string;
}

const activeRow: ActiveRow = {
  kind: 'activeRow'
};

const inactiveRow: InactiveRow = {
  kind: 'inactiveRow',
};

interface CompleteGuess {
  kind: string;
}

interface IncompleteGuess {
  kind: string;
}

const CompleteGuess: Guess = {
  kind: 'completeGuess'
};

const IncompleteGuess: Guess = {
  kind: 'incompleteGuess',
};

type CodeSlot = CodePeg | EmptyCodeSlot;
type KeySlot = KeyPeg | EmptyKeySlot;
type RowStatus = ActiveRow | InactiveRow;
type Guess = CompleteGuess | IncompleteGuess;

const initialState: State = {
  board: [
    {
      codeSlots: [
        CodeHole,
        CodeHole,
        CodeHole,
        CodeHole
      ],
      keySlots: [
        KeyHole,
        KeyHole,
        KeyHole,
        KeyHole
      ],
      status: activeRow
    }/*, {
      codeSlots: [
        CodeHole,
        CodeHole,
        CodeHole,
        CodeHole
      ],
      keySlots: [
        KeyHole,
        KeyHole,
        KeyHole,
        KeyHole
      ],
      status: inactiveRow
    }*/
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

const rowLens = (rowIndex: number): State => {
  return R.compose(
    R.lens(R.prop('board'), R.assoc('board')),
    R.lensIndex(rowIndex)
  );
};

const rowStatusLens = (rowIndex: number): State => {
  return R.compose(
    rowLens(rowIndex),
    R.lens(R.prop('status'), R.assoc('status'))
  );
};

const slotLens = (rowIndex: number, slotIndex: number): State => {
  return R.compose(
    rowLens(rowIndex),
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

const getRowStatus = (state, rowIndex): RowStatus => {
  const lens = rowStatusLens(rowIndex);
  return R.view(lens, state);
};

const handleSlotClick = (state, rowIndex, slotIndex): State => {
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

const guessCompleteness = (codeSlots: Array<CodeSlot>): Guess => {
  return (codeSlots.some(x => x.kind === 'Code-hole'))
    ? IncompleteGuess
    : CompleteGuess;
};

const updateKeyPegs = (codeSlots: Array<CodeSlot>): Row => {
  return {
    codeSlots: codeSlots,
    keySlots: [BlackKeyPeg, BlackKeyPeg, BlackKeyPeg, KeyHole],
    status: inactiveRow
  };
};

const handleCalcKeyPegs = (state: State): State => {
  const l = R.lens(R.prop('board'), R.assoc('board'));
  const newBoard = state.board.map(row => {
    switch (guessCompleteness(row.codeSlots)) {
      case CompleteGuess:
        return updateKeyPegs(row.codeSlots);
      case IncompleteGuess:
        return row;
      default:
        return row;
    }
  });
  return R.set(l, newBoard, state);
};

const reducer = (state: State = initialState, action) => {
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
