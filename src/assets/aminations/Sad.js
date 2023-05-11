import React, {useRef} from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import sadFace from './data/sad.json'

const Sad = () => {
  const myRef = useRef();
    
    return (
      <div>
        <Player
          autoplay={true}
          loop={true}
          controls={false}
          src={sadFace}
          // background='#000000'
          style={{ height: '300px', width: '300px', margin:'auto' }}
        >

        </Player>
      </div>
    );
}

export default Sad
