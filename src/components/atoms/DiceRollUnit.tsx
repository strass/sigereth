/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment } from 'react';

const DiceRollUnitAtom: FunctionComponent<{
  unit: 'SUCCESSES' | 'DICE';
}> = ({ unit }) => {
  // eslint-disable-next-line default-case
  switch (unit) {
    case 'SUCCESSES':
      return <Fragment>successes</Fragment>;
    case 'DICE':
      return <Fragment>dice</Fragment>;
  }
  return null;
};

export default DiceRollUnitAtom;
