import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const JobUpdate = () => {
    const jobsdata = useLoaderData();
    const { user } = useContext(AuthContext);
    const {
        _id,
        jobTitle,
        description,
        minimumPrice,
        maximumPrice,
        category,
        deadline,
        buyer,
    } = jobsdata || {}

    const handlesubmit = async (e) => {
        e.preventDefault()

        const form = e.target;
        const minimumPrice = parseFloat(form.min_price.value);
        const maximumPrice = parseFloat(form.max_price.value);
        const category = form.category.value
        const description = form.description.value;
        const deadline = form.deadline.value;

        const jobsData = {
            jobTitle,
            minimumPrice,
            maximumPrice,
            deadline,
            description,
            category,
            buyer: {
                buyeremail: buyer?.buyeremail,
                name: user?.displayName,
                photo: user?.photoURL,
            },
        };
        console.log(jobsData);

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/jobs/${_id}`, jobsData);
            console.log(data);
            toast.success('Job Data Updated Successfully!')

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
            <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md '>
                <h2 className='text-lg font-semibold text-gray-700 capitalize '>
                    Update a Job
                </h2>

                <form onSubmit={handlesubmit}>
                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                        <div>
                            <label className='text-gray-700 ' htmlFor='job_title'>
                                Job Title
                            </label>
                            <input
                                id='job_title'
                                name='job_title'
                                type='text'
                                defaultValue={jobTitle}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div>
                            <label className='text-gray-700 ' htmlFor='emailAddress'>
                                Email Address
                            </label>
                            <input
                                id='emailAddress'
                                type='email'
                                name='email'
                                disabled
                                defaultValue={buyer.buyeremail}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700' htmlFor="deadline">Deadline</label>
                            <input defaultValue={deadline} type="date" id="deadline" name="deadline" />
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700 ' htmlFor='category'>
                                Category
                            </label>
                            <select
                                name='category'
                                id='category'
                                defaultValue={category}
                                className='border p-2 rounded-md'
                            >
                                <option value='Web Development'>Web Development</option>
                                <option value='Graphics Design'>Graphics Design</option>
                                <option value='Digital Marketing'>Digital Marketing</option>
                            </select>
                        </div>
                        <div>
                            <label className='text-gray-700 ' htmlFor='min_price'>
                                Minimum Price
                            </label>
                            <input
                                id='min_price'
                                name='min_price'
                                type='number'
                                defaultValue={minimumPrice}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 ' htmlFor='max_price'>
                                Maximum Price
                            </label>
                            <input
                                id='max_price'
                                name='max_price'
                                type='number'
                                defaultValue={maximumPrice}
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='text-gray-700 ' htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            name='description'
                            id='description'
                            defaultValue={description}
                            cols='30'
                        ></textarea>
                    </div>
                    <div className='flex justify-end mt-6'>
                        <button className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default JobUpdate;