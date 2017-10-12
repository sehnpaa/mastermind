export const slotClick = (rowIndex, slotIndex) => {
  return {
    type: 'SlotClick',
    rowIndex: rowIndex,
    slotIndex: slotIndex
  };
};

export const calcKeyPegs = () => {
  return {
    type: 'CalcKeyPegs',
  };
};
