/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';

const DevNotes = () => (
  <Fragment>
    <hr />
    <h2>todo</h2>
    <ul>
      <li>style combatant</li>
      <li>evaluate viability of controlling via scrolling</li>
      <li>move more updators into useCombatantAction</li>
      <li>loading control + Suspense</li>
      <li>react-flip-toolkit</li>
      <li>
        user management
        <ul>
          <li>ownership + visibility</li>
        </ul>
      </li>
      <li>events + event log</li>
      <li>rolling system</li>
      <li>effects + expenditures</li>
    </ul>
    <h2>bugs</h2>
    <ul>
      <li>
        input caret position bounces around (see{' '}
        <a href="https://github.com/facebook/react/issues/955#issuecomment-447440342">
          issue
        </a>
        )
      </li>
    </ul>
  </Fragment>
);

export default DevNotes;
