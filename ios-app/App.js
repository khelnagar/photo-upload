import React, {useState, useEffect} from 'react';
import { View, Image, Button, Text, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Photos } from './_components';
import { createFormData } from './common';

import { SERVER_URL } from './config';



const App = () => {
  const [photo, setPhoto] = useState(null);
  const [photosList, setPhotosList] = useState([]);

  useEffect(() => {
    fetchPhotos(`${SERVER_URL}/api/photos/all`);
  }, []);
  
  const fetchPhotos = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
      setPhotosList(res.photos);
    })
    .catch(err => console.log(err))
  };

  const handleChoosePhoto = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      
      if (!res.cancelled) {
        // ImagePicker does not provide image name so we get the cached name with this hack
        let path = res.uri;
        path = path.substring(path.indexOf("/ImagePicker"));
        res.fileName = path.split("/").pop();

        setPhoto(res);
      }
    } catch (err) {
      setPhoto(null);
    }
  };

  const handleUploadPhoto = () => {
    // upload button not shown when no photo in state, but just in case
    if (!photo) {
      alert('Choose photo first!');
      return;
    }

    const formData = [
      {
        name: 'photo', 
        value: {
          name: photo.fileName,
          type: photo.type,
          uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri
        }
      }
    ]

    fetch(`${SERVER_URL}/api/photos/add`, {
      method: 'POST',
      body: createFormData(formData),
    })
    .then((res) => res.json())
    .then((res) => {
      console.log('res', res);
      
      setPhoto(null);
      setPhotosList(oldList => [...oldList, res.photo])
    })
    .catch((err) => console.log(err));
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {photo && (
          <>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 100, height: 100 }}
            />
            <Button title="Upload Photo" onPress={handleUploadPhoto} />
          </>
        )}
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      </View>
      <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center'  }}>
        {photosList.length == 0 
          ? <Text>No photos</Text>
          : <Photos photos={photosList} />
        }
      </View>
    </>
  );
};

export default App;