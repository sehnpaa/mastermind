export const slotClick = (rowIndex, slotIndex) => {
  return {
    type: 'SlotClick',
    rowIndex: rowIndex,
    slotIndex: slotIndex
  };
};
