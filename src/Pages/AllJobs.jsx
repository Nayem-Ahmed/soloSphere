import React, { useEffect, useState } from 'react';
import JobCard from '../Components/JobCard';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(''); // Filter by category
    const [sortOrder, setSortOrder] = useState(''); // Sorting order
    const [searchTerm, setSearchTerm] = useState('');// Search by job title
    console.log(searchTerm);


    // Fetch jobs based on current page and items per page
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/all-jobs?page=${currentPage}&limit=${itemsPerPage}&category=${category}&sort=${sortOrder}&search=${searchTerm}`);
                const data = await response.json(); // Convert response to JSON
                setJobs(data); // Set the actual data to the state
            } catch (error) {
                console.error('Error fetching the jobs:', error);
            }
        };

        getData();
    }, [currentPage, itemsPerPage, category, sortOrder, searchTerm]); // Fetch jobs when currentPage or itemsPerPage changes
    // Fetch total count of jobs
    useEffect(() => {
        const getCount = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs-count?category=${category}&search=${searchTerm}`);
                const data = await response.json(); // Convert response to JSON
                setCount(data.count); // Set the actual data to the state
            } catch (error) {
                console.error('Error fetching the jobs:', error);
            }
        };

        getCount();
    }, [category, searchTerm]);

    const pageNumbers = [...Array(Math.ceil(count / itemsPerPage)).keys()].map(pageIndex => pageIndex + 1);

    // Handle pagination buttons
    const handlePaginationButton = (pageNum) => {
        setCurrentPage(pageNum)
    }


    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.search.value);
        setCurrentPage(1);  // Reset to first page after search
    };

    // Reset filters
    const handleReset = () => {
        setCategory('');
        setSortOrder('');
        setSearchTerm('');
        setCurrentPage(1);
    };
    return (
        <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
            <div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
                    {/* Category Filter */}
                    <div>
                        <select
                            onChange={(e) => {
                                setCategory(e.target.value)
                                setCurrentPage(1)

                            }} // Set the selected category
                            name='category'
                            id='category'
                            value={category}

                            className='border p-4 rounded-lg'
                        >
                            <option value=''>Filter By Category</option>
                            <option value='Web Development'>Web Development</option>
                            <option value='Graphics Design'>Graphics Design</option>
                            <option value='Digital Marketing'>Digital Marketing</option>
                        </select>
                    </div>
                    {/* Search by Job Title */}
                    <form onSubmit={handleSearch}>
                        <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                            <input
                                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                name='search'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder='Enter Job Title'
                                aria-label='Enter Job Title'
                            />

                            <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                                Search
                            </button>
                        </div>
                    </form>
                    {/* Sort by Deadline */}
                    <div>
                        <select
                            name='sort'
                            id='sort'
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}  // Make sure to update the sortOrder when changedde
                            className='border p-4 rounded-md'
                        >
                            <option value=''>Sort By Deadline</option>
                            <option value='dsc'>Descending Order</option>
                            <option value='asc'>Ascending Order</option>
                        </select>
                    </div>
                    {/* Reset Filters */}
                    <button onClick={handleReset} className='btn'>Reset</button>
                </div>
                <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {jobs.map(job => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            </div>

            <div className='flex justify-center mt-12'>
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>

                {pageNumbers.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? "bg-blue-500 text-white" : ""} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}

                <button onClick={handleNextPage} disabled={currentPage === pageNumbers.length} className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    )
};

export default AllJobs;
