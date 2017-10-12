import * as React from 'react';
import { connect } from 'react-redux';
import { calcKeyPegs, slotClick } from '../actions/index';

const Slot = ({ kind, color }) => {
  const classes = [kind, color].join(' ');
  return (
    <div className={classes} />
  );
};

const CodeSlot = ({ board, dispatch, rowIndex, slotIndex }) => {
  return (
    <div onClick={a => { dispatch(slotClick(rowIndex, slotIndex)); }}>
      <Slot kind={board[rowIndex].codeSlots[slotIndex].kind} color={board[rowIndex].codeSlots[slotIndex].color} />
    </div>
  );
};

const KeySlot = ({ board, dispatch, rowIndex, slotIndex}) => {
  return (
    <div onClick={a => { dispatch(calcKeyPegs()); }}>
      <Slot kind={board[rowIndex].keySlots[slotIndex].kind} color={board[rowIndex].keySlots[slotIndex].color} />
    </div>
  );
};

const Row = ({ state, dispatch, rowIndex }) => {
  return (
    <div id="Row" className="Grey">
      <CodeSlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={0} />
      <CodeSlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={1} />
      <CodeSlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={2} />
      <CodeSlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={3} />

      <div className="Keys" onClick={a => { dispatch(calcKeyPegs()); }}>
        <KeySlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={0} />
        <KeySlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={1} />
        <KeySlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={2} />
        <KeySlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={3} />
      </div>
    </div>
  );
};

const Mastermind = ({ state, dispatch }) => {
  return (
    <div>
      <Row state={state} dispatch={dispatch} rowIndex={0}/>
      <Row state={state} dispatch={dispatch} rowIndex={1}/>
    </div>
  );
};

export default connect()(Mastermind);
