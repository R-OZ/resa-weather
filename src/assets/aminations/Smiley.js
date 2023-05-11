import React, {useRef} from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import smiley from './data/smiley.json'

const Smiley = () => {
  const myRef = useRef();
    
    return (
      <div>
        <Player
          autoplay={true}
          loop={false}
          controls={false}
          src={smiley}
        //   background='#000000'
          style={{ height: '300px', width: '300px', margin:'auto' }}
        >

        </Player>
      </div>
    );
}

export default Smiley
