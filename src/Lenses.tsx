import { assoc, compose, lens, lensIndex, prop } from 'ramda';
import * as T from './Types';

const lastLens = () => {
  return lensIndex(-1);
};

const statusProp = () => {
  return lens(prop('status'), assoc('status'));
};

const codeSlotsProp = () => {
  return lens(prop('codeSlots'), assoc('codeSlots'));
};

const keySlotsProp = () => {
  return lens(prop('keySlots'), assoc('keySlots'));
};

export const boardProp = (): T.State => {
  return lens(prop('board'), assoc('board'));
};

export const rowLens = (rowIndex: number): T.State => {
  return compose(
    boardProp(),
    lensIndex(rowIndex)
  );
};

export const rowStatusLens = (rowIndex: number): T.State => {
  return compose(
    rowLens(rowIndex),
    statusProp()
  );
};

export const slotLens = (rowIndex: number, slotIndex: number): T.State => {
  return compose(
    rowLens(rowIndex),
    codeSlotsProp(),
    lensIndex(slotIndex)
  );
};

export const lastRowLens = () => {
  return compose(
    boardProp(),
    lastLens()
  );
};

export const codeSlotsLens = (rowIndex) => {
  return compose(
    rowLens(rowIndex),
    codeSlotsProp()
  );
};

export const codeSlotOfLastRowLens = () => {
  return compose(
    lastRowLens(),
    codeSlotsProp()
  );
};

export const keySlotOfLastRowLens = () => {
  return compose(
    lastRowLens(),
    keySlotsProp()
  );
};
