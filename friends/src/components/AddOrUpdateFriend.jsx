import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFormValues, initialFormValues, addFriend, updateFriend } from '../state/redux';

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
      formValues.id ? dispatch(updateFriend(formValues)) : dispatch(addFriend(formValues));
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