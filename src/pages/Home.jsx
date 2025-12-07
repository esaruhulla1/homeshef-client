import React from 'react';
import Banner from '../components/home/Banner';
import Services from '../components/home/Services';
import Review from '../components/home/Review';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <Services></Services>
            <Review></Review>
            
        </div>
    );
};

export default Home;