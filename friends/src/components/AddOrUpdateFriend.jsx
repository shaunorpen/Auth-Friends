import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFormValues, setFriendsList, initialFormValues } from '../state/redux';
import axiosWithAuth from '../helpers/axiosWithAuth';

export default function AddOrUpdateFriend() {
    const formValues = useSelector(state => state.formValues);
    const dispatch = useDispatch();

    const handleChange = e => {
      dispatch(setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      }));
    }

    const handleCancel = e => {
      dispatch(setFormValues(initialFormValues));
    }
  
    const handleAddOrUpdateFriend = e => {
      if (formValues.id) {
        axiosWithAuth().put(`http://localhost:5000/api/friends/${formValues.id}`, {
          name: formValues.name,
          age: formValues.age,
          email: formValues.email,
        })
          .then(res => {
            dispatch(setFriendsList(res.data));
            dispatch(setFormValues(initialFormValues));
          })
          .catch(err => {
            alert(err.response.data.message);
          })
        } else {
          axiosWithAuth().post('http://localhost:5000/api/friends', formValues)
          .then(res => {
            dispatch(setFriendsList(res.data));
            dispatch(setFormValues(initialFormValues));
          })
          .catch(err => {
            alert(err.response.data.message);
          });
      }
    }
  
    return (
      <div>
        <h2>{formValues.id ? 'Update' : 'Add'} Friend</h2>
        <label htmlFor='name'>Name: </label>
        <input type='text' name='name' value={formValues.name} onChange={handleChange} />
        <label htmlFor='age'>Age: </label>
        <input type='number' name='age' value={formValues.age} onChange={handleChange} />
        <label htmlFor='email'>Email: </label>
        <input type='email' name='email' value={formValues.email} onChange={handleChange} />
        <button onClick={handleAddOrUpdateFriend} >{formValues.id ? 'Update' : 'Add'} Friend</button>
        <button onClick={handleCancel} >Cancel</button>
      </div>
    );
}