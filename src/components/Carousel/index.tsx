import React, { useState } from 'react';
import { Carousel, Image } from 'antd';
import './styles.scss';
import Bg1 from '../../assets/images/01.jpg';
import Bg2 from '../../assets/images/02.jpg';
import Bg3 from '../../assets/images/03.jpg';
import Bg4 from '../../assets/images/04.jpg';

const contentStyle: React.CSSProperties = {
  color: '#fff',
  textAlign: 'center',
  backgroundImage: 'none',
  backgroundSize: 'cover',
  lineHeight: '260px',
  height: '300px',
  objectFit: 'cover',
};

const contentAfterStyle: React.CSSProperties = {
  content: '',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  backgroundImage: 'none',
  backgroundSize: 'cover',
  objectFit: 'cover',
  filter: 'blur(8px)'
};

function CarouselSilder(): JSX.Element {
  const [backgroundImage, setBackgroundImage] = useState('');
  const arrBackground = [Bg1, Bg2, Bg3, Bg4];
  
  const handleBackgroundChange = (current : number) => {
    const index = current + 1 === arrBackground.length ? 0 : current + 1;
    const src = arrBackground[index];
    if (src) {
      setBackgroundImage(`url(${src})`);
    }
  };
  return (
    <div>
      <Carousel autoplay beforeChange={handleBackgroundChange}>
        {arrBackground.map((bg, index) => {
          return (
            <div key={index}>
              <div style={contentStyle}>
                <div style={{ ...contentAfterStyle, backgroundImage }} />
                <Image className="object-cover h-[300px]" src={bg} />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselSilder;
