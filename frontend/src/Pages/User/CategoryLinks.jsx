import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const CategoryLinks = () => {
    const [categories, setCategories] = useState([]);

    // Fetch all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch categories',
                icon: 'error',
            });
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {categories.length > 0 ? (
                categories.map((category) => (
                    <Link
                        to={`/category/${category.slug}`} // Corrected the 'to' attribute
                        state={{ product: category }} // Pass state with 'state' prop
                        key={category._id}
                        className="p-2 text-black rounded-md shadow-sm"
                    >
                        <span className="bg-slate-300">
                            {category.name}
                        </span>
                    </Link>
                ))
            ) : (
                <p>No categories available.</p>
            )}
        </div>
    );
};

export default CategoryLinks;
