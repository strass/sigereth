/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext, useState, Fragment } from 'react';
import randomColor from 'randomcolor';
import useFirestore from '../../../hooks/useFirestore';
import { DocumentSnapshotExpanded } from '../../../types/Firestore';
import Roll from '../../../types/Roll';
import User from '../../../types/User';
import TooltipContext from '../../context/TooltipContext';
import Tooltip from '../../atoms/Tooltip';
import Modal from '../../atoms/Modal';
import useHover from '../../../hooks/useHover';
import usePopper from '../../../hooks/usePopper';
import { noMarginPadding } from '../../../styling/normalize';
import { horizontalList, unstyleList } from '../../../styling/list';

const RollResults: FunctionComponent<{ result: Roll['result'] }> = ({ result }) => {
  switch (true) {
    case result.isBotch:
      return <span>Botch</span>;
    default:
      return <span>{result.successes} successes</span>;
  }
};

const DiceRollMolecule: FunctionComponent<{ roll: DocumentSnapshotExpanded<Roll> }> = ({
  roll,
}) => {
  const [owner] = useFirestore<User>(roll.data.owner);
  const hasOwner = roll.data.owner && owner;
  const { tooltipMount } = useContext(TooltipContext);
  const { hovering, hoverStart, hoverEnd } = useHover(500);
  const [referenceNode, setReferenceNode] = useState<HTMLElement | null>(null);
  const [popperNode, setPopperNode] = useState<HTMLElement | null>(null);
  const { styles } = usePopper({
    referenceNode: referenceNode || undefined,
    popperNode: popperNode || undefined,
    placement: 'top',
  });
  return (
    <li
      onMouseEnter={hoverStart}
      onMouseLeave={hoverEnd}
      ref={setReferenceNode}
      css={{ display: 'flex' }}
    >
      {hasOwner && (
        <div
          css={{
            display: 'inline-flex',
            alignContent: 'center',
            justifyContent: 'center',
            height: '1em',
            width: '1em',
            borderRadius: '50%',
            marginRight: 4,
            background:
              hasOwner && owner.data.color
                ? owner.data.color
                : randomColor({ seed: roll.data.owner.id }),
          }}
          title={owner.data.username}
        />
      )}{' '}
      <RollResults result={roll.data.result} />
      <Modal mount={hovering} domNode={tooltipMount}>
        <Tooltip isOpen={hovering} ref={setPopperNode} css={styles}>
          <ol css={[unstyleList, horizontalList, noMarginPadding]}>
            {roll.data.result.roll
              .sort((a, b) => {
                if (a === b) return 0;
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
              })
              .map((r, i, arr) => (
                <li css={[{ display: 'inline-flex' }]} key={i}>
                  <span
                    css={[
                      r >= (roll.data.config.targetNumber || Infinity) && { fontWeight: 'bold' },
                      r >= roll.data.config.targetNumber &&
                        roll.data.config.double.includes(r) && { color: 'orange' },
                      r >= roll.data.config.targetNumber &&
                        !roll.data.config.double.includes(r) && { color: 'gold' },
                      !(r >= roll.data.config.targetNumber) && { color: 'grey' },
                    ]}
                  >
                    {r}
                  </span>
                  {i + 1 !== arr.length ? <Fragment>,&nbsp;</Fragment> : ''}
                </li>
              ))}
          </ol>
        </Tooltip>
      </Modal>
    </li>
  );
};

export default DiceRollMolecule;
