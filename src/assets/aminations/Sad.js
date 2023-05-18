import React, {useRef} from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import sadFace from './data/sad.json'
import sadFace2 from './data/sad3.json'
import { styles } from '../../utilities/Styling';

const Sad = ({theme}) => {
  const myRef = useRef();
    
    return (
      <div>
        <Player
          autoplay={true}
          loop={true}
          controls={false}
          src={theme===styles.day? sadFace : sadFace2}
          // background='#000000'
          style={{ height: '300px', width: '300px', margin:'auto' }}
        >

        </Player>
      </div>
    );
}

export default Sad
