import React from 'react';
import Banner from '../../components/home/Banner';
import Services from '../../components/home/Services';
import Review from '../../components/home/Review';
import PopulerMeals from '../../components/home/PopulerMeals';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>

            <PopulerMeals></PopulerMeals>
            <Services></Services>
            <Review></Review>

        </div>
    );
};

export default Home;