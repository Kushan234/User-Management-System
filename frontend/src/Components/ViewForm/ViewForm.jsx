import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUsersRectangle } from "react-icons/fa6";

const ViewForm = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    setUsers(storedUsers);
    
  }, []);

  const handleDelete = (id) => {
    const updated = users.filter(user => user.id !== id)
    setUsers( updated)
    localStorage.setItem('users', JSON.stringify(updated))
  }

  const filteredUsers = users.filter( user =>
    `${user.firstName} ${user.lastName}`.toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
   <div className="mt-10 bg-lime-100">
    <div className="p-10">

    <div className="h-auto p-10 mt-4 rounded-md shadow-lg bg-cyan-700 px-80">
        <FaUsersRectangle className='w-16 h-16'/>
      <h2 className="py-5 text-2xl font-semibold text-white">View User Details</h2>
   
     <input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-10 rounded-md h-14"
      />
 
      <div className="grid gap-4 ">
        {filteredUsers.map(user => (
          <div key={user.id} className="p-5 bg-white rounded-md shadow-md">
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <div className="flex gap-4 mt-2">
              
              <button onClick={() =>{ localStorage.setItem('editUserId', user.id);
                navigate('/');
                }}
                 className="px-4 py-2 text-white bg-gray-700 rounded">Edit</button>
                 
              <button onClick={() => handleDelete(user.id)} className="px-4 py-2 text-white bg-red-600 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
   </div>
  )
}

export default ViewForm
