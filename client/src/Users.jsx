import React, { useState } from 'react';

const Users = () => {
    const [formData, setFormData] = useState({
       name: "",
       age: "",
       email: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        fetch('http://localhost:3002/api/users', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('User created:', data);
            setFormData({
              name: '',
              age: '',
              email: '',
            });
          })
          .catch(error => console.error('Error creating user:', error));
      };
    
    return (
        <section>
            <div>
                <h1>Students</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        FullName:
                        <input type='text' name='name' value={formData.name} onChange={handleChange}/>
                    </label>
                    <label>
                        Age:
                        <input type='number' name='age' value={formData.age} onChange={handleChange}/>
                    </label>
                    <label>
                        Email:
                        <input type="email" name='email' value={formData.email} onChange={handleChange}/>
                    </label>
                    <button type='submit'> Add new user</button>
                </form>
            </div>
        </section>
    );
}

export default Users;
