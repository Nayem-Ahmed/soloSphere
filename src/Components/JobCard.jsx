
import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {
    const {
        _id,
        jobTitle,
        description,
        minimumPrice,
        maximumPrice,
        email,
        category,
        deadline,
        bid_count,
    } = job || {}
    return (
        <Link
            to={`/job/${_id}`}
            className='w-full px-4 py-3 rounded-md shadow-md  '
        >
            <div className='flex items-center justify-between'>
                <span className='text-xs font-light text-gray-800 '>
                    Deadline: {new Date(deadline).toLocaleDateString()}
                </span>
                <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
                    {category}
                </span>
            </div>

            <div>
                <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
                    {jobTitle}
                </h1>

                <p title={description} className='mt-2 text-sm text-gray-600 '>
                    {description.substring(0, 70)}...
                </p>
                <p className='mt-2 text-sm font-bold text-gray-600 '>
                    Range: ${minimumPrice} - ${maximumPrice}
                </p>
                <p className='mt-2 text-sm font-bold text-gray-600 '>
                    Bid Count: {bid_count}
                </p>
            </div>
        </Link>
    )
}

export default JobCard