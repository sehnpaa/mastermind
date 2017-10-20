import * as React from 'react';
import { connect } from 'react-redux';
import { calcKeyPegs, slotClick } from '../actions/index';
import * as T from '../Types';

const Slot = ({ kind, color }: any) => {
  const classes = [kind, color].join(' ');
  return (
    <div className={classes} />
  );
};

const CodeSlot = ({ board, dispatch, rowIndex, slotIndex }: any) => {
  return (
    <div onClick={a => { dispatch(slotClick(rowIndex, slotIndex)); }}>
      <Slot kind={board[rowIndex].codeSlots[slotIndex].kind} color={board[rowIndex].codeSlots[slotIndex].color} />
    </div>
  );
};

const KeySlot = ({ board, dispatch, rowIndex, slotIndex}: any) => {
  return (
    <div onClick={a => { dispatch(calcKeyPegs()); }}>
      <Slot kind={board[rowIndex].keySlots[slotIndex].kind} color={board[rowIndex].keySlots[slotIndex].color} />
    </div>
  );
};

const CodeSlots = (state, dispatch, rowIndex) => {
  return state.board[rowIndex].codeSlots.map((_, index) => {
    return (
      <CodeSlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={index} />
    );
  });
};

const KeySlots = (state, dispatch, rowIndex) => {
  return state.board[rowIndex].keySlots.map((_, index) => {
    return (
      <KeySlot board={state.board} dispatch={dispatch} rowIndex={rowIndex} slotIndex={index} />
    );
  });
};

const Rows = (state, dispatch) => {
  return state.board.map((_, index) => {
    return (
      <Row state={state} dispatch={dispatch} rowIndex={index} />
    );
  });
};

const Row = ({ state, dispatch, rowIndex }: any) => {
  return (
    <div id="Row" className="Grey">
      {CodeSlots(state, dispatch, rowIndex)}
      <div className="Keys" onClick={a => { dispatch(calcKeyPegs()); }}>
        {KeySlots(state, dispatch, rowIndex)}
      </div>
    </div>
  );
};

const Mastermind = ({ state, dispatch }: any) => {
  return (
    <div>
      {Rows(state, dispatch)}
    </div>
  );
};

export default connect()(Mastermind);
