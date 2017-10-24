import { BlackKeyPeg,
  WhiteKeyPeg,
  KeyHole,
  RedCodePeg,
  BlueCodePeg,
  GreenCodePeg,
  YellowCodePeg
} from '../Types';

import { calcKeyPegs } from './calcKeyPegs';

describe('calcKeyPegs', () => {
  it('no key pegs', () => {
    const guess = [YellowCodePeg, YellowCodePeg, YellowCodePeg, YellowCodePeg]
    const solution = [RedCodePeg, BlueCodePeg, GreenCodePeg, RedCodePeg]
    const expected = [KeyHole, KeyHole, KeyHole, KeyHole]
    const actual = calcKeyPegs(guess, solution);
    expect(actual).toEqual(expected);
  });
  it('all black key pegs', () => {
    const guess = [RedCodePeg, BlueCodePeg, GreenCodePeg, RedCodePeg]
    const solution = [RedCodePeg, BlueCodePeg, GreenCodePeg, RedCodePeg]
    const expected = [BlackKeyPeg, BlackKeyPeg, BlackKeyPeg, BlackKeyPeg]
    const actual = calcKeyPegs(guess, solution);
    expect(actual).toEqual(expected);
  });
  it('all white key pegs', () => {
    const guess = [RedCodePeg, BlueCodePeg, GreenCodePeg, YellowCodePeg]
    const solution = [BlueCodePeg, GreenCodePeg, YellowCodePeg, RedCodePeg]
    const expected = [WhiteKeyPeg, WhiteKeyPeg, WhiteKeyPeg, WhiteKeyPeg]
    const actual = calcKeyPegs(guess, solution);
    expect(actual).toEqual(expected);
  });
  it('various pegs #1', () => {
    const guess = [RedCodePeg, BlueCodePeg, GreenCodePeg, YellowCodePeg]
    const solution = [RedCodePeg, BlueCodePeg, BlueCodePeg, RedCodePeg]
    const expected = [BlackKeyPeg, BlackKeyPeg, KeyHole, KeyHole]
    const actual = calcKeyPegs(guess, solution);
    expect(actual).toEqual(expected);
  });
  it('various pegs #2', () => {
    const guess = [RedCodePeg, BlueCodePeg, BlueCodePeg, RedCodePeg]
    const solution = [RedCodePeg, BlueCodePeg, GreenCodePeg, BlueCodePeg]
    const expected = [BlackKeyPeg, BlackKeyPeg, WhiteKeyPeg, KeyHole]
    const actual = calcKeyPegs(guess, solution);
    expect(actual).toEqual(expected);
  });
  it('various pegs #3', () => {
    const guess = [RedCodePeg, RedCodePeg, BlueCodePeg, GreenCodePeg]
    const solution = [RedCodePeg, BlueCodePeg, RedCodePeg, BlueCodePeg]
    const expected = [BlackKeyPeg, WhiteKeyPeg, WhiteKeyPeg, KeyHole]
    const actual = calcKeyPegs(guess, solution);
    expect(actual).toEqual(expected);
  });
});
