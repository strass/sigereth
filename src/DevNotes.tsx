/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useState } from 'react';
import { Collapse } from 'react-collapse';

const DevNotes = () => {
  const [notesOpen, setNotesOpen] = useState(false);
  return (
    <Fragment>
      <hr css={{ height: '1px', width: '100%' }} />
      <button onClick={() => setNotesOpen(!notesOpen)}>
        {notesOpen ? 'v' : '^'}
      </button>
      <Collapse isOpened={notesOpen}>
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
          <li>continue adding usePermissions for combatant sections</li>
          <li>combatantitem refactor into molecules</li>
          <li>configure combatant</li>
          <li>real webpack setup</li>
          <li>convert to dotenv setup (firebase) https://www.npmjs.com/package/dotenv-webpack</li>
          <li>sentry</li>
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
      </Collapse>
    </Fragment>
  );
};

export default DevNotes;
