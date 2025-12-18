import React from 'react';
import Banner from '../../components/home/Banner';
import Services from '../../components/home/Services';
import Review from '../../components/home/Review';
import PopulerMeals from '../../components/home/PopulerMeals';
import Review2 from '../../components/home/Review2';
import InternationalFood from '../../components/home/InternationalFood';
import PopularCollection from '../../components/home/DashiFood';
import MenusSpecial from '../../components/home/MenusSpecial';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>

            <PopulerMeals></PopulerMeals>
            <InternationalFood></InternationalFood>
            <MenusSpecial></MenusSpecial>
            <Services></Services>
            {/* <Review></Review> */}
            <PopularCollection></PopularCollection>
            <Review2></Review2>

        </div>
    );
};

export default Home;