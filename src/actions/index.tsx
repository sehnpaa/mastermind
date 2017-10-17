import { CalcKeyPegsAction, SlotClickAction } from '../Types';

export const slotClick = (rowIndex: number, slotIndex: number): SlotClickAction => {
  return {
    type: 'SlotClick',
    rowIndex: rowIndex,
    slotIndex: slotIndex
  };
};

export const calcKeyPegs = (): CalcKeyPegsAction => {
  return {
    type: 'CalcKeyPegs',
  };
};
