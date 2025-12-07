import React from 'react';
import Banner from '../../components/home/Banner';
import Services from '../../components/home/Services';
import Review from '../../components/home/Review';
import PopulerMeals from '../../components/home/PopulerMeals';
import Review2 from '../../components/home/Review2';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>

            <PopulerMeals></PopulerMeals>
            <Services></Services>
            {/* <Review></Review> */}
            <Review2></Review2>

        </div>
    );
};

export default Home;