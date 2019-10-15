import React, { useState, useEffect } from 'react';

import Friend from './Friend';
import AddOrUpdateFriend from './AddOrUpdateFriend';

import axiosWithAuth from '../helpers/axiosWithAuth';

export default function Friends() {
    const [friendList, setFriendList] = useState([]);
    const initialFormValues = {
        name: '',
        age: '',
        email: '',
    }
    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
        axiosWithAuth().get('http://localhost:5000/api/friends')
        .then(res => {
        setFriendList(res.data);
        })
        .catch(err => {
        alert(err.response.data.error);
        });
    }, []);

    return (
        <div>
        <h2>Friend List</h2>
        <ul>
            {friendList.map(friend => <Friend friend={friend} 
                                            setFriendList={setFriendList}
                                            setFormValues={setFormValues}
                                            key={friend.id} />)}
        </ul>
        <AddOrUpdateFriend 
            setFriendList={setFriendList}
            formValues={formValues}
            setFormValues={setFormValues}
            initialFormValues={initialFormValues} />
        </div>
    );
}