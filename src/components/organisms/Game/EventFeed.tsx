/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext, useCallback, useEffect, useRef } from 'react';
import { map, forEach } from 'lodash';
import useFirestore from '../../../hooks/useFirestore';
import { GameContext } from '../../context/GameContext';
import Roll from '../../../types/Roll';
import useFirestoreReducer from '../../../hooks/useFirestoreReducer';
import User from '../../../types/User';
import DiceRollMolecule from '../../molecules/DiceRoll';
import { unstyleList } from '../../../styling/list';

const EventFeedOrganism: FunctionComponent = () => {
  const game = useContext(GameContext);
  const [rolls] = useFirestore<Roll>(game.ref.collection('rolls'), {
    query: useCallback(ref => ref.orderBy('createdAt', 'desc').limit(20), []),
  });
  const [users, dispatch] = useFirestoreReducer<User>();
  const { current: subscribedUsers } = useRef<string[]>([]);
  useEffect(() => {
    if (rolls && rolls.docs) {
      forEach(rolls.docs, r => {
        if (
          r.data.owner &&
          !subscribedUsers.includes(r.data.owner.id) &&
          !Object.keys(users).includes(r.data.owner.id)
        ) {
          console.log('subscribing to ', r.data.owner.id);
          dispatch({ type: 'SUBSCRIBE', ref: r.data.owner });
          subscribedUsers.push(r.data.owner.id);
        }
      });
    }
  }, [dispatch, rolls, subscribedUsers, users]);
  if (!rolls) {
    return <div>loading</div>;
  }
  console.log(users);
  return (
    <div css={{ padding: 12 }}>
      <ol css={[unstyleList, { display: 'flex', flexDirection: 'column-reverse' }]}>
        {map(rolls.docs, r => (
          <DiceRollMolecule key={r.id} roll={r} />
        ))}
      </ol>
    </div>
  );
};

export default EventFeedOrganism;
