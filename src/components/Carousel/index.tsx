import React from 'react';
import { Carousel } from 'antd';
import './styles.scss';

const contentStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '260px',
  textAlign: 'center',
  background: '#364d79',
  height: '400px'
};

function CarouselSilder(): JSX.Element {
  return (
    <div>
      <Carousel autoplay>
      <div>
        <div style={contentStyle}>1</div>
      </div>
      <div>
        <div style={contentStyle}>2</div>
      </div>
      <div>
        <div style={contentStyle}>3</div>
      </div>
      <div>
        <div style={contentStyle}>4</div>
      </div>
    </Carousel>
    </div>
  );
}

export default CarouselSilder;
