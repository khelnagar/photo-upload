import React from 'react';
import { Image } from 'react-native';

import { SERVER_URL } from '../config';



export const Photos = props => {
  const { photos } = props;
  return (
    photos.map(item => 
              <Image 
                key={item.id} 
                source={{ uri: `${SERVER_URL}/assets/uploads/${item.path}` }}
                style={{ width: 100, height: 100 }}
              /> 
    )
  )
}
