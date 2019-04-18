import { useContext, useMemo } from "react";
import { GameContext } from "../components/context/GameContext";
import UserContext from "../components/context/UserContext";
import { some } from 'lodash';
import { firestore, auth } from "firebase";
import { DocumentSnapshotExpanded } from "../types/Firestore";

export default (resource?: DocumentSnapshotExpanded<{ owner: firestore.DocumentReference }>) => {
    const user = useContext(UserContext);
    const { game } = useContext(GameContext);
    const value = useMemo(() => {
        const currentUser = auth().currentUser;
        if (!currentUser || currentUser.isAnonymous) {
            console.warn('Tried to get permissions for anonymous or unauthenticated user');
            return {
                isGameOwner: false,
                isGamePlayer: false,
                isResourceOwner: false,
                isResourceOwnerOrGameOwner: false,
            }
        }
        const isGameOwner = game && user && user.ref.isEqual(game.data.owner);
        const isResourceOwner = resource && user && user.ref.isEqual(resource.data.owner);
        return ({
            isGameOwner,
            isGamePlayer: game && user && some(game.data.players, p => user.ref.isEqual(p)),
            isResourceOwner,
            isResourceOwnerOrGameOwner: isResourceOwner || isGameOwner,
        })
    }, [game, user, resource])
    return value;
}