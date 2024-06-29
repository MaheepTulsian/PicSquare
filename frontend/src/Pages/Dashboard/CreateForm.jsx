import React, {useState} from "react";
import { useFormik } from "formik";
import { RiAiGenerate } from "react-icons/ri";
import { Link } from "react-router-dom";
import useImageStore from './../../store/store.js';
import { toast } from "react-toastify";

const Form = () => {
    //set defaullt image as DummyImage
    const { displayImage, setDisplayImage } = useImageStore(
        (state) => ({ 
            displayImage: state.displayImage, 
            setDisplayImage: state.setDisplayImage 
        })
    );

    function handleChange(e) {
        console.log(e.target.files);
        setDisplayImage(URL.createObjectURL(e.target.files[0]));
        uploadImageToCloudinary(e.target.files[0]);
    }

    async function uploadImageToCloudinary(img) {
        try {
            const formData = new FormData();
            formData.append('image', img);

            const res = await fetch('https://pic-square-backend-6k6ybz7b5-maheeps-projects.vercel.app//api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to upload image to Cloudinary');
            }

            const data = await res.json();
            console.log(data.data.url);
            setDisplayImage(data.data.url);
            console.log(displayImage);
            return data.url;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            image_url: "",
            is_premium: 0,
            ticket_price: 0,
        },
        onSubmit: async (values) => {
            // Handle form submission here
            try {
                const res = await fetch('https://pic-square-backend-6k6ybz7b5-maheeps-projects.vercel.app//api/art', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        title: values.title,
                        description: values.description,
                        image_url: displayImage,
                        is_premium: values.is_premium,
                        price: values.premium_price,
                    }),
                });

                if (!res.ok) {
                    toast.error('Failed to upload image to Cloudinary');
                    throw new Error('Failed to upload image to Cloudinary');
                }

                toast.success('Art uploaded successfully');
                console.log('Art uploaded successfully');
            } catch (error) {
                console.error(error);
            }
            console.log(values);
        },
    });

    return (
        <div className="container p-6 relative">
            <div className="w-full mx-auto">
                <div className="mt-2  rounded-b">
                    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
                        {/* Art image */}
                        <div className="w-full flex justify-center items-end mb-4">
                            <div className="w-full flex">
                                <div className="w-1/3 flex-center">
                                    <img
                                        // src="https://via.placeholder.com/300"
                                        src={displayImage}
                                        alt="dummyimage"
                                        className="mx-auto rounded-md"
                                    />
                                </div>

                                <div className="w-2/3 flex flex-col items-center justify-center">
                                    <div className="w-3/4">
                                        <label htmlFor="image_url" className="block text-sm font-semibold text-white">Image</label>
                                        <input
                                            type="file"
                                            id="image_url"
                                            name="image_url"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="mt-1 p-3 w-full border border-gray-300 rounded-md bg-[#212121] text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className='w-3/4 flex items-center'>
                                        <div className='flex-grow border-t border-gray-400'></div>
                                        <span className='mx-2 text-gray-400'>or</span>
                                        <div className='flex-grow border-t border-gray-400'></div>
                                    </div>
                                    <Link to="./AI" className="w-3/4 py-2 border rounded-md bg-[#212121] text-white text-xl flex items-center justify-center gap-3">
                                        <RiAiGenerate />
                                        Use AI
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Art Title */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-semibold text-white">Art Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-md bg-[#212121] text-white focus:outline-none focus:border-blue-500"
                                placeholder="Enter the title of your art"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-semibold text-white">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                rows="4"
                                className="mt-1 p-3 w-full border border-gray-300 rounded-md bg-[#212121] text-white focus:outline-none focus:border-blue-500"
                                placeholder="Describe your art"
                            ></textarea>
                        </div>

                        {/* Tickets Premium */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <span className="block text-sm font-semibold text-white">Is the Art Premium?</span>
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            id="is_premium"
                                            name="is_premium"
                                            value="1"
                                            onChange={formik.handleChange}
                                            checked={formik.values.is_premium === '1'}
                                            className="form-radio text-blue-500"
                                        />
                                        <span className="ml-2 text-white">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input
                                            type="radio"
                                            id="is_premium"
                                            name="is_premium"
                                            value="0"
                                            onChange={formik.handleChange}
                                            checked={formik.values.is_premium === '0'}
                                            className="form-radio text-blue-500"
                                        />
                                        <span className="ml-2 text-white">No</span>
                                    </label>
                                </div>
                            </div>
                            {formik.values.is_premium === '1' && (
                                <div>
                                    <label htmlFor="premium_price" className="block text-sm font-semibold text-white">Price of Premium Art</label>
                                    <input
                                        type="number"
                                        id="premium_price"
                                        name="premium_price"
                                        onChange={formik.handleChange}
                                        value={formik.values.premium_price}
                                        className="mt-1 p-3 w-full border border-gray-300 rounded-md bg-[#212121] text-white focus:outline-none focus:border-blue-500"
                                        placeholder="Enter the premium amount"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit button */}
                        <div >
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
