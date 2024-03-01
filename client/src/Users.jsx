import React, { useState, useEffect } from 'react';

const Users = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
    });

    const [users, setUsers] = useState([]);

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
                fetchUsers();
            })
            .catch(error => console.error('Error creating user:', error));
    };

    const fetchUsers = () => {
        fetch('http://localhost:3002/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Users retrieved:', data);
                setUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <section>
            <div className='flex h-[50px] bg-slate-400 justify-center'>
                <h1 className='text-4xl text-white'>Users Information:</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {users.map(user => (
                    <div key={user._id} className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p>Age: {user.age} years old</p>
                        <p>Email: {user.email}</p>
                        <button type='delete'>Delete</button>
                    </div>
                    
                ))}
            </div>
            <div className='flex h-[200px] bg-slate-500 p-4'>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                    <label className='mb-2'>
                        FullName:
                        <input type='text' name='name' value={formData.name} onChange={handleChange} className='border p-2 w-full' />
                    </label>
                    <label className='mb-2'>
                        Age:
                        <input type='number' name='age' value={formData.age} onChange={handleChange} className='border p-2 w-full' />
                    </label>
                    <label className='mb-2'>
                        Email:
                        <input type="email" name='email' value={formData.email} onChange={handleChange} className='border p-2 w-full' />
                    </label>
                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-md cursor-pointer'>Add new user</button>
                </form>
            </div>
        </section>
    );
}

export default Users;
