import firestore from '@react-native-firebase/app';

// export const addProduct = () => {

// }

export async function getProducts(foodRetrived) {
  var foodList = [];
  const ref = await firestore().collection('Products');

  try {
    // var snapShot = await firestore().collection('Products').get();
    ref.onSnapshot(querySnapshot => {
      const list = [];
      console.log(querySnapshot);
    });

    // console.log(snapShot);
    // console.log(foodList);
    // foodRetrived(foodList);
  } catch (error) {
    console.log(error);
  }
}
