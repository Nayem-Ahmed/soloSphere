import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../../Components/JobCard';
import { useEffect, useState } from 'react';

const TabsCategories = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs`);
                const data = await response.json(); // Convert response to JSON
                setJobs(data); // Set the actual data to the state
            } catch (error) {
                console.error('Error fetching the jobs:', error);
            }
        };

        getData();
    }, []);

    return (
        <div>
            <Tabs>
                <div className=' container px-6 py-10 mx-auto'>
                    <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
                        Browse Jobs By Categories
                    </h1>

                    <p className='max-w-2xl mx-auto my-6 text-center text-gray-500 '>
                        Three categories available for the time being. They are Web
                        Development, Graphics Design and Digital Marketing. Browse them by
                        clicking on the tabs below.
                    </p>
                    <div className='flex items-center justify-center'>
                        <TabList>
                            <Tab>Web Development</Tab>
                            <Tab>Graphics</Tab>
                            <Tab>Digital Marketing</Tab>
                        </TabList>
                    </div>

                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.category === "Development").map(job => (
                                    <JobCard key={job._id} job={job} />
                                ))
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.category === "Design").map(job => (
                                    <JobCard key={job._id} job={job} />
                                ))
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.category === "Marketing").map(job => (
                                    <JobCard key={job._id} job={job} />
                                ))
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default TabsCategories;