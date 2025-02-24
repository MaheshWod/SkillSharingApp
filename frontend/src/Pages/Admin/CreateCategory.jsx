

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/auth';
import NavFooter from '../../Components/NavFooter';
import AdminMenu from '../../Components/AdminMenu';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import CategoryForm from '../../Components/Form/CategoryForm';
import { message, Modal } from 'antd'
const CreateCategory = () => {
  const [auth] = useAuth(); // Get token from context
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] = useState(null)
  const [UpdatedName,setUpdatedName] = useState("")

  // Handle category submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      Swal.fire({ title: 'Error!',
         text: 'Please enter a category name.', 
         icon: 'error' });
      return;
    }

    setLoading(true);
    const token = auth?.token; // Use token from context

    console.log("Token being sent:", token); // Debugging

    if (!token) {
      Swal.fire({ title: 'Error!', 
        text: 'Authentication failed. Please log in again.', 
        icon: 'error' });
      return;
    }

    try {
      const { data } = await axios.post(
        '/api/v1/category/create-category',
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        Swal.fire({ title: 'Success!',
           text: "Category is created",
            icon: 'success' });
        setName('');
        getAllCategory();
      } else {
        Swal.fire({ title: 'Error', text: data.message || 'Category not created', icon: 'error' });
      }
    } catch (error) {
      console.log('Category Creation Error: ', error);
      Swal.fire({ title: 'Error!', text: 'Category creation failed.', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories
  const getAllCategory = async () => {
    setFetchingCategories(true);
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data.success) setCategories(data.category);
      else Swal.fire({ title: 'Error!', text: data.message || 'Failed to fetch categories.', icon: 'error' });
    } catch (error) {
      console.log('Fetch Category Error: ', error);
      Swal.fire({ title: 'Error!', text: 'Something went wrong.', icon: 'error' });
    } finally {
      setFetchingCategories(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  // update category
  const handlUpdate = async(e)=>{
    e.preventDefault()
    try{

      const {data }= await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:UpdatedName})
      if(data.success){
        Swal.fire({ title: 'Success!',
          text: "Category is updated",
           icon: 'success' });
           setSelected(null)
           setUpdatedName("")
           setVisible(false)
           getAllCategory()
      }
      else{
        Swal.fire({ title: 'Error!',
          text: `${data.message} is error`,
           icon: 'false' });
      }
    }catch(error){
      console.log(error)
    }
  }
  // handle delete
  const handleDelete = async(pid)=>{
    try{

      const {data }= await axios.delete(`/api/v1/category/delete-category/${pid}`)
      if(data.success){
        Swal.fire({ title: 'Success!',
          text: "category is deleted",
           icon: 'success' });
           getAllCategory()
      }
      else{
        Swal.fire({ title: 'Error!',
          text: `${data.message} is error`,
           icon: 'false' });
      }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <NavFooter>
      <div className="grid grid-cols-[15%_85%] my-4 mx-4 shadow-md border">
        <div>
          <AdminMenu />
          <div className="font-semibold border hover:bg-zinc-400 py-1 px-0 text-center hover:text-white">
            <Link to="/dashboard/admin">Back To Admin</Link>
          </div>
        </div>
        <div className="p-2">
          <h1 className='font-semibold'>Manage Category</h1>
          <div className=" w-[500px] my-2">
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          {fetchingCategories ? (
            <div>Loading categories...</div>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className=''>
                  <th className="text-xl font-semibold border border-gray-300 px-4 py-2">Name</th>
                  <th className="text-xl font-semibold border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => (
                  <tr key={category._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                    <td className="border border-gray-300 px-4 py-2 space-x-3">
                      <button onClick={()=>{setVisible(true);setUpdatedName(category.name);
                      setSelected(category)
                      }}

                       className="px-3 py-1 bg-slate-500 text-white rounded hover:bg-zinc-600">Edit</button>


                      <button onClick={()=>{handleDelete(category._id)}}
                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* modal or edit and delete button */}
        <Modal onCancel={()=>setVisible(false)}
         footer = {null}
          visible={visible}>
          <CategoryForm value={UpdatedName} setValue={setUpdatedName}

            handleSubmit={handlUpdate}
          />
          </Modal>
      </div>
    </NavFooter>
  );
};

export default CreateCategory;
