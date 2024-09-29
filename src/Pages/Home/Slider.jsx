import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// images
import bgimg1 from "../../assets/images/carousel1.jpg"
import bgimg2 from "../../assets/images/carousel2.jpg"
import bgimg3 from "../../assets/images/carousel3.jpg"


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SliderContent from '../../Components/SliderContent';

const Slider = () => {
    return (
        <div className='container px-4 mx-auto '>
            <>
                <Swiper
                    spaceBetween={30}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <SliderContent image={bgimg1} text={"Boost Your Business with Expert Digital Marketing Strategies!"} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderContent image={bgimg2} text={"Boost Your Business with Expert Digital Marketing Strategies!"} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderContent image={bgimg3} text={"Unlock the Power of SEO, PPC, and Social Media Marketing"} />
                    </SwiperSlide>


                </Swiper>
            </>
        </div>
    );
};

export default Slider;