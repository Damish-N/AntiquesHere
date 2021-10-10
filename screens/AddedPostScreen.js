import React, {useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

const AddedPostScreen = () => {
  const [editable, setEditable] = useState(false);
  const [url, setUrl] = useState('');
  const [imagePath, setImagePath] = useState(
    'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar',
  );

  function _uploadByCam() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setImagePath(image.path);
    });
  }

  function _uploadByGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImagePath(image.path);
      if (image) {
        _uploadImage(image.path);
        // _getUrl('004.png');
      }
    });
  }
  const _getUrl = async image => {
    const url = await storage()
      .ref('/' + image)
      .getDownloadURL();
    _createPost(url);
    console.log('url is' + url);
    // setUrl(url.toString);
  };

  const _uploadImage = async (path) => {
    var today = new Date();

    var time =
      today.getHours().toString() +
      today.getMinutes().toString() +
      today.getSeconds().toString();
    const uId = uuid.v4();
    console.log(uId);
    const reference = storage().ref(uId + '.png');
    // const path = imagePath.toString();
    // const path =
    //   'file:///storage/sdcard/Android/data/com.antiqueshere/files/Pictures/48f817c7-f63e-4cbf-bc79-51b9bd4b29e1.jpg';
    await reference.putFile(path);

    const task = reference.putFile(path);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
      _getUrl(uId + '.png');
    });
    // _getUrl('001.png');
  };

  const _createPost = async url => {
    firestore()
      .collection('Products')
      .add({
        contactNo: '0776560119',
        createdBy: 'Damish',
        description: 'jsldjsdsljdsjdsj',
        imageUrl: url,
        price: 150.0,
        title: 'Phone',
      })
      .then(() => {
        console.log('Post added!');
      });
  };

  const _handleUpload = image => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'antiques');
    data.append('cloud_name', 'damish1997');

    console.log(data);
    try {
      fetch('https://api.cloudinary.com/v1_1/damish1997/image/upload', {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={styles.containerScreen}>
      <View style={styles.imageSection}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imagePath,
            }}
            style={styles.image}
          />
          <Button title={'Using Camera'} onPress={() => _uploadByCam()} />
          <Button title={'Using Gallery'} onPress={() => _uploadByGallery()} />
        </View>
      </View>

      <View style={styles.formContain}>
        <Text>{url ? url.toString() : 'no url'}</Text>
      </View>
    </ScrollView>
  );
};

export default AddedPostScreen;

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '65%',
    height: '80%',
  },
  formContain: {height: 500, backgroundColor: 'red'},
  imageSection: {
    paddingTop: 10,
    height: 400,
    backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
