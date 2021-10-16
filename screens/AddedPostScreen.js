import React, {useState} from 'react';
import {
  Alert,
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
import Colors from '../constants/Colors';
import {Input} from 'react-native-elements';

const AddedPostScreen = () => {
  const [editable, setEditable] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [creadtedBy, setCreadtedBy] = useState('');
  const [imagePath, setImagePath] = useState(
    'https://www.pinclipart.com/picdir/middle/126-1266771_post-page-to-add-pictures-comments-add-post.png',
  );
  const [titleError, setTiltleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [contactNoError, setContactNoError] = useState('');
  const [creadtedByError, setCreadtedByError] = useState('');

  function _uploadByCam() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image.path);
        setImagePath(image.path);
      })
      .catch(error => {
        console.log(error);
        setImagePath(
          'https://www.pinclipart.com/picdir/middle/126-1266771_post-page-to-add-pictures-comments-add-post.png',
        );
      });
  }

  function _uploadByGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImagePath(image.path);
        if (image) {
          // _uploadImage(image.path);
          // _getUrl('004.png');
        }
      })
      .catch(error => {
        console.log(error);
        setImagePath(
          'https://www.pinclipart.com/picdir/middle/126-1266771_post-page-to-add-pictures-comments-add-post.png',
        );
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

  const _uploadImage = async path => {
    var today = new Date();
    console.log('url pathaaa:', path);
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
        contactNo: contactNo,
        createdBy: creadtedBy,
        description: description,
        imageUrl: url,
        price: price,
        title: title,
      })
      .then(() => {
        console.log('Post added!');
        Alert.alert('Adding Post', 'SuccessFully added to system', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        setCreadtedBy('');
        setPrice('');
        setContactNo('');
        setTitle('');
        setDescription('');
        setImagePath(
          'https://www.pinclipart.com/picdir/middle/126-1266771_post-page-to-add-pictures-comments-add-post.png',
        );
      })
      .catch(error => {
        Alert.alert('Adding Post', 'Error on Adding', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        console.log(error);
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

  function validateTitle() {
    if (title === '') {
      setTiltleError('*Title must be added');
    } else {
      setTiltleError('No error');
    }
  }

  function validateDescription() {
    if (description === '') {
      setDescriptionError('*Description must be added');
    } else {
      setDescriptionError('No error');
    }
  }

  function validatePrice() {
    if (price === '') {
      setPriceError('*Price cannot be empty');
    } else {
      setPriceError('No error');
    }
  }

  function validateContactNo() {
    const regex =
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
    const valid = regex.test(contactNo);
    if (contactNo === '') {
      setContactNoError('*Contact no cannot be empty');
    } else if (!valid) {
      setContactNoError('*Contact number is not valid');
    } else {
      setContactNoError('No error');
    }
  }

  function validateCreatedBy() {
    if (creadtedBy === '') {
      setCreadtedByError('*Created by cannot be empty');
    } else {
      setCreadtedByError('No error');
    }
  }

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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.buttonAreaContain}>
              <Button
                title={'Using Camera'}
                onPress={() => _uploadByCam()}
                color={Colors.secondry}
              />
            </View>
            <View style={styles.buttonAreaContain}>
              <Button
                title={'Using Gallery'}
                onPress={() => _uploadByGallery()}
                color={Colors.secondry}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.formContain}>
        <View style={styles.formContainer}>
          <Input
            label={'Title'}
            onChangeText={v => setTitle(v)}
            value={title}
            errorMessage={titleError !== 'No error' ? titleError : null}
            onEndEditing={() => validateTitle()}
          />
          <Input
            label={'Description'}
            onChangeText={v => setDescription(v)}
            value={description}
            onEndEditing={() => validateDescription()}
            errorMessage={
              descriptionError !== 'No error' ? descriptionError : null
            }
          />
          <Input
            label={'Price'}
            onChangeText={v => setPrice(v)}
            value={price}
            keyboardType={'numeric'}
            onEndEditing={() => validatePrice()}
            errorMessage={priceError !== 'No error' ? priceError : null}
          />
          <Input
            label={'contact Number'}
            onChangeText={v => setContactNo(v)}
            value={contactNo}
            onEndEditing={() => validateContactNo()}
            errorMessage={contactNoError !== 'No error' ? contactNoError : null}
          />
          <Input
            label={'Created By'}
            onChangeText={v => setCreadtedBy(v)}
            value={creadtedBy}
            onEndEditing={() => validateCreatedBy()}
            errorMessage={
              creadtedByError !== 'No error' ? creadtedByError : null
            }
          />
          <View style={styles.buttonAreaContain}>
            <Button
              disabled={
                titleError !== 'No error' ||
                descriptionError !== 'No error' ||
                priceError !== 'No error' ||
                contactNoError !== 'No error' ||
                creadtedByError !== 'No error'
              }
              title={'Submit'}
              onPress={() => _uploadImage(imagePath)}
              color={Colors.secondry}
            />
          </View>
        </View>
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
    height: '80%',
  },
  imageContainer: {
    width: '65%',
    height: '80%',
  },
  // formContain: {backgroundColor: 'red'},
  imageSection: {
    paddingTop: 10,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAreaContain: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  formContainer: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
  },
});
