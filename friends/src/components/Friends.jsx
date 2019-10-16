import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFriends } from '../state/redux';
import Friend from './Friend';
import AddOrUpdateFriend from './AddOrUpdateFriend';

export default function Friends() {
    const friendList = useSelector(state => state.friendList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);

    return (
        <div>
        <h2>Friend List</h2>
        <ul>
            {friendList.map(friend => <Friend friend={friend} key={friend.id} />)}
        </ul>
        <AddOrUpdateFriend />
        </div>
    );
}