import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper";

import { IMAGE_API } from "../Api";

const PromoSlider = ({results}) => {

    return(
        <>
            <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            }}
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">
                {results && results.map((item) => {
                    return (
                    <SwiperSlide key={item.id} style={{backgroundImage:`url(${IMAGE_API}/w1280${item.backdrop_path})`}}>
                        
                        <div className="info">
                            <h2><Link className="slider-title" to={"/movie/" + item.id +"/"}> {item.title} </Link></h2>
                            <p className="release-date">Release Date: {item.release_date}</p>
                        </div>
                        
                    </SwiperSlide>)
                })}
            </Swiper>
        </>
    )
}
export default PromoSlider