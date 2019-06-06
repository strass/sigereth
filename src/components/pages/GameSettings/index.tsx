/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext, useState, useMemo } from 'react';
import { GameContext } from '../../context/GameContext';
import { firestore } from 'firebase';
import useDebounce from 'react-use/lib/useDebounce';
import { DocumentReference } from '@strass/firestation/dist/types';

const GameSettingsPage = () => {
  const game = useContext(GameContext);
  console.log(game && game.data);
  const [newPlayerId, setNewPlayerId] = useState('');
  const newPlayerRef = useMemo(
    () =>
      newPlayerId
        ? firestore()
            .collection('users')
            .doc(newPlayerId)
        : firestore()
            .collection('users')
            .doc(),
    [newPlayerId]
  );
  const [newPlayerExists, setNewPlayerExists] = useState<boolean | undefined>(undefined);

  // Debounced callback to check whether the user id exists
  useDebounce(
    async () => {
      if (!newPlayerId) return;
      const newPlayer = await newPlayerRef.get();
      if (newPlayer.exists) {
        setNewPlayerExists(true);
      } else {
        setNewPlayerExists(false);
      }
    },
    1000,
    [newPlayerId]
  );
  return (
    <div>
      <h1>Game Owner: {game.data.owner.id}</h1>
      <h2>Players</h2>
      <ul>
        {game.data.players.map(p => (
          <li>{p.id}</li>
        ))}
        <li>
          Add player:{' '}
          <input
            value={newPlayerId}
            onChange={e => {
              setNewPlayerExists(undefined);
              setNewPlayerId(e.target.value);
            }}
            css={[newPlayerExists === false && { background: 'red' }]}
          />
          <button
            type="button"
            onClick={async () => {
              // Unfortunately I think we have to do another get here to make sure that the
              // account exists before we try to add because the previous result could have
              // been debounced.
              const newPlayer = await newPlayerRef.get();
              if (newPlayer.exists) {
                game.ref.update({
                  players: (firestore.FieldValue.arrayUnion(
                    newPlayerRef
                  ) as unknown) as DocumentReference[],
                });
                setNewPlayerId('');
              } else {
                setNewPlayerExists(false);
              }
            }}
          >
            Add new player
          </button>
        </li>
      </ul>
    </div>
  );
};

export default GameSettingsPage;
