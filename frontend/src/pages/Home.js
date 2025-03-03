import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footers from '../components/Footers'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner />
      <Footers />
    </div>
  )
}

export default Home