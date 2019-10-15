import React from 'react';

import axiosWithAuth from '../helpers/axiosWithAuth';

export default function AddOrUpdateFriend({ setFriendList, formValues, setFormValues, initialFormValues }) {
    const handleChange = e => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  
    const handleAddOrUpdateFriend = e => {
      if (formValues.id) {
        axiosWithAuth().put(`http://localhost:5000/api/friends/${formValues.id}`, {
          name: formValues.name,
          age: formValues.age,
          email: formValues.email,
        })
          .then(res => {
            setFriendList(res.data);
            setFormValues(initialFormValues);
          })
          .catch(err => {
            alert(err.response.data.message);
          })
      } else {
        axiosWithAuth().post('http://localhost:5000/api/friends', formValues)
          .then(res => {
            setFriendList(res.data);
            setFormValues(initialFormValues);
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
      </div>
    );
}