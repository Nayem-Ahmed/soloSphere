import useAxiosSecure from '../Hooks/useAxiosSecure'
import useAuth from '../Hooks/useAuth';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const BidRequests = () => {
    const queryClient = useQueryClient(); // Ensure you use this hook to get the query client instance
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    // const [bidsrequests, setBidsrequests] = useState([]);

    const { isPending, error, refetch, data: bidsrequests } = useQuery({
        queryKey: ['bids', user?.email],
        queryFn: () => getData()
    })

    const getData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bids-requests/${user?.email}`);
            const data = await response.json(); // Convert response to JSON
            return data;
        } catch (error) {
            console.error('Error fetching the jobs:', error);
        }
    };


    const { mutateAsync } = useMutation({
        mutationFn: async ({ id, status }) => {
            const { data } = await axiosSecure.patch(`/bids/${id}`, { status });
            console.log(data);
            return data;
        },
        onSuccess: () => {
            console.log('Wow, data updated');
            toast.success('Updated');
            // refetch();
            // kothin
            queryClient.invalidateQueries({ queryKey: ['bids'] }); // Refetch data
        },
    });

    // handleStatus
    const handlestatus = async (id, prevStatus, status) => {
        console.log(id, prevStatus, status);
        if (prevStatus === status) return console.log('Sry vai.. hobena');
        await mutateAsync({ id, status });
    };




    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await fetch(`${import.meta.env.VITE_API_URL}/bids-requests/${user?.email}`);
    //             const data = await response.json(); // Convert response to JSON
    //             setBidsrequests(data); // Set the actual data to the state
    //         } catch (error) {
    //             console.error('Error fetching the jobs:', error);
    //         }
    //     };

    //     getData();
    // }, [user?.email]);


    // handlestatus
    // const handlestatus = async (id, prevStatus, status) => {
    //     if (prevStatus === status) return console.log('Sry vai.. hobena')
    //     try {
    //         const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/bids/${id}`, { status });
    //         console.log(data);

    //     } catch (error) {
    //         console.log(error);


    //     }

    // }


    return (
        <section className='container px-4 mx-auto pt-12'>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium text-gray-800 '>Bid Requests</h2>

                <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                    {bidsrequests?.length} Requests
                </span>
            </div>

            <div className='flex flex-col mt-6'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Title</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Email</span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <span>Deadline</span>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <button className='flex items-center gap-x-2'>
                                                <span>Price</span>
                                            </button>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Category
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Status
                                        </th>

                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 '>
                                    {bidsrequests?.map(bidrequ => (
                                        <tr key={bidrequ?._id}>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {bidrequ?.jobTitle}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {bidrequ?.email}
                                            </td>

                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {bidrequ?.deadline}
                                            </td>

                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                $ {bidrequ?.price}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-2'>
                                                    <p
                                                        className='px-3 py-1 rounded-full text-blue-500 bg-blue-100/60 text-xs'
                                                    >
                                                        {bidrequ?.category}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                                                <div className='inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500'>
                                                    <span className='h-1.5 w-1.5 rounded-full bg-yellow-500'></span>
                                                    <h2 className='text-sm font-normal '>{bidrequ?.status}</h2>
                                                </div>
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-6'>
                                                    {/* Accept Button: In Progress */}
                                                    <button onClick={() => handlestatus(bidrequ?._id, bidrequ?.status, 'In Progress')} disabled={bidrequ?.status === 'Complete'} className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            strokeWidth='1.5'
                                                            stroke='currentColor'
                                                            className='w-5 h-5'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                d='m4.5 12.75 6 6 9-13.5'
                                                            />
                                                        </svg>
                                                    </button>
                                                    {/* Reject Button */}
                                                    <button onClick={() => handlestatus(bidrequ?._id, bidrequ?.status, 'Rejected')} disabled={bidrequ?.status === 'Complete'} className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            strokeWidth='1.5'
                                                            stroke='currentColor'
                                                            className='w-5 h-5'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BidRequests;