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
          <li>effects + expenditures</li>
          <li>real webpack setup</li>
          <li>convert to dotenv setup (firebase) https://www.npmjs.com/package/dotenv-webpack</li>
          <li>sentry</li>
          <li>continue building out the character sheet viewer</li>
          <li>iterate on draggablewindow</li>
          <li>refactor context providers into splitting dispatch and store value</li>
          <li>refactor dice roller and hook into inline roller</li>
          <li>add excellency support to dice roller</li>
          <li>move dice roller into some sort of tabbed view</li>
          <li>consolidate events</li>
          <li>think about using tippy.js for tooltips?</li>
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
