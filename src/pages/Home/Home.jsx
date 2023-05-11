import React from 'react'
import './home.css'
import Info from '../../components/Info/Info'
import List from '../../components/List/List'
import Featured from '../../components/Featured/Featured'
import explore from '../../assets/icons/explore.png'
import favorite from '../../assets/icons/love.png'
import Asleep from '../../assets/aminations/Asleep'

const Home = ({}) => {
  const num1=[1,2,3,4]
  const num2=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  var value = num1.length + num2.length
  // value = 0
  return (
    <div className='home'>
      
      {
        value >0?
          <Featured/>
        :
          <Asleep />
      }

      <div className="home-body">

      {
        value >0?
        <>
          <List id="favorites" num={num1} />
          <List id="explore" num={num2} />
        </>
        :
          <Info />
      }
        

        
      
      </div>

    </div>
  )
}

export default Home