import React, {useRef} from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import sleeping from './data/sleeping.json'
import sleepingDark from './data/sleeping2.json'
import { styles } from '../../utilities/Styling';

const Asleep = ({theme}) => {
  const myRef = useRef();
    
    return (
      <div>
        <Player
          autoplay={true}
          loop={true}
          controls={false}
          src={theme===styles.day? sleeping: sleepingDark}
          // background='#000000'
          style={{ height: '300px', width: '300px', margin:'auto' }}
        >

        </Player>
      </div>
    );
}

export default Asleep
