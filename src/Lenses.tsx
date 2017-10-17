import * as R from 'ramda';
import * as T from './Types';

export const rowLens = (rowIndex: number): T.State => {
  return R.compose(
    R.lens(R.prop('board'), R.assoc('board')),
    R.lensIndex(rowIndex)
  );
};

export const rowStatusLens = (rowIndex: number): T.State => {
  return R.compose(
    rowLens(rowIndex),
    R.lens(R.prop('status'), R.assoc('status'))
  );
};

export const slotLens = (rowIndex: number, slotIndex: number): T.State => {
  return R.compose(
    rowLens(rowIndex),
    R.lens(R.prop('codeSlots'), R.assoc('codeSlots')),
    R.lensIndex(slotIndex)
  );
};

export const lastRowLens = () => {
  return R.compose(
    R.lens(R.prop('board'), R.assoc('board')),
    R.lensIndex(-1)
  );
};

export const codeSlotsLens = (rowIndex) => {
  return R.compose(
    rowLens(rowIndex),
    R.lens(R.prop('codeSlots'), R.assoc('codeSlots'))
  );
};
