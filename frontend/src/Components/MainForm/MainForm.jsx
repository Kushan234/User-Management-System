import React, { useEffect, useState } from 'react'
import { FaUserPlus } from "react-icons/fa";

const MainForm = () => {
      const [form, setFrom] = useState({firstName: "", lastName: "", age: "", email: ""})
      const [users, setUsers]= useState([]);
      const [editId, setEditId] = useState(null);
      

      useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (storedUsers.length === 0) {
          fetch('https://dummyjson.com/users')
            .then(res => res.json())
            .then(data => {
              setUsers(data.users);
              localStorage.setItem('users', JSON.stringify(data.users));
            });
        } else {
          setUsers(storedUsers);
        }
      
        const editUserId = localStorage.getItem('editUserId');
        if (editUserId) {
          const userToEdit = storedUsers.find(u => u.id === parseInt(editUserId));
          if (userToEdit) {
            setFrom({
              firstName: userToEdit.firstName,
              lastName: userToEdit.lastName,
              age: userToEdit.age,
              email: userToEdit.email
            });
            setEditId(userToEdit.id);
          }
          localStorage.removeItem('editUserId');
        }
      }, []);

      const handleInputChange = (e) =>{
        setFrom({ ...form, [e.target.name]: e.target.value});
      }
 
    const handleUsers=()=>{
      let updateUsers;

      if (editId !== null) {
        updateUsers = users.map(user => user.id === editId ? {...user, ...form} : user);
        setEditId(null)
      }else{
        const newUser = {id: Date.now(), ...form};
        updateUsers = [newUser, ...users];
      }
      
      setUsers(updateUsers);
      localStorage.setItem('users', JSON.stringify(updateUsers));
      setFrom({firstName: '', lastName:'', age:'', email:'' })
    }
      
      const handleClear = ()=>{
        setFrom({firstName:'', lastName:'', age:'', email:''})
        setEditId(null);
      }

    
  return (
    <div className="mt-10 bg-lime-100">
        <div className="p-10 ">
    
       
        <div className="p-10 mt-4 rounded-md shadow-lg h-[30rem] bg-cyan-700 px-80">
        <FaUserPlus className='w-16 h-16'/>
            <h2 className='py-5 text-2xl font-semibold text-white'> {editId ? "Update User Details" : "Add User Details" }</h2>
       
        <div className="flex gap-10 mt-10 mb-10">
            
            <input className='h-12 px-2 border-none rounded-md outline-none w-96'
             type="text" name='firstName' placeholder='First Name'
              value={form.firstName} onChange={handleInputChange}/>
              
            <input  className='h-12 px-2 border-none rounded-md outline-none w-96'
             type="text" name='lastName' placeholder='Last Name'
              value={form.lastName} onChange={handleInputChange}/>
            </div>

            <div className="flex gap-10 mt-5 mb-14">
           
            <input  className='h-12 px-2 border-none rounded-md outline-none w-96'
             type="text" name='age' placeholder='Age'
              value={form.age} onChange={handleInputChange}/>
              
            <input  className='h-12 px-2 border-none rounded-md outline-none w-96'
             type="text" name='email' placeholder='Email' 
             value={form.email} onChange={handleInputChange}/>
           
            <button onClick={handleUsers}
             className='absolute h-10 text-white bg-gray-800 mt-28 w-60 hover:bg-slate-600'>
                {editId ? "Update user" : "Add user" }
             </button>
             <button onClick={handleClear}
              className='absolute h-10 ml-64 text-white bg-gray-800 mt-28 w-60 hover:bg-slate-600'>Clear</button>
       
        </div>
     
        </div>


        

     
        </div>
    </div>
  )
}

export default MainForm