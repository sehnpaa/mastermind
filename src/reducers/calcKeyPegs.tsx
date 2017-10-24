import * as T from '../Types';

const numberOfKeyPegs = 4;

export const calcKeyPegs = (guess, solution) => {
  const blackKeyPegs = guess
        .filter((x, i) => solution[i] === x)
        .map(() => T.BlackKeyPeg);
  const solutionWithoutBlackMatches = solution.filter((x, i) => guess[i] !== x);
  const guessWithoutBlackMatches = guess.filter((x, i) => solution[i] !== x);
  const whiteKeyPegs = guessWithoutBlackMatches
        .filter(x => solutionWithoutBlackMatches.indexOf(x) !== -1)
        .map(() => T.WhiteKeyPeg);
  const keyHoles = [T.KeyHole, T.KeyHole, T.KeyHole, T.KeyHole];
  return blackKeyPegs
    .concat(whiteKeyPegs)
    .concat(keyHoles)
    .filter((_, index) => index < numberOfKeyPegs);
};
