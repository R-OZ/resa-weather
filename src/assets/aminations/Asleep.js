import React, {useRef} from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import sleeping from './data/sleeping.json'

const Asleep = () => {
  const myRef = useRef();
    
    return (
      <div>
        <Player
          autoplay={true}
          loop={true}
          controls={false}
          src={sleeping}
          // background='#000000'
          style={{ height: '300px', width: '300px', margin:'auto' }}
        >

        </Player>
      </div>
    );
}

export default Asleep
