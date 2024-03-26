import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import {Button} from "react-native-paper";
import MlkitOcr from "react-native-mlkit-ocr";
import MLKit from "react-native-mlkit-ocr";
import * as ImagePicker from "expo-image-picker";
import DefaultImagePng from "../../../../assets/default.png";
import {ScrollView} from "react-native-gesture-handler";
import ViewPhotoModal from "../../../component/ViewPhotoModal";
import UploadModal from "../../../component/UploadModal";

const WizardScreen2 = ({navigation, route}) => {
  const {
    firstName,
    lastName,
    biodata,
    selectedProvince,
    selectedCity,
    selectedSubDistrict,
    selectedDistrict,
  } = route.params;

  const [photoSelfie, setPhotoSelfie] = useState(null);
  const [photoKTP, setPhotoKTP] = useState(null);
  const [noKTP, setNoKTP] = useState(null);
  const [photoBebas, setPhotoBebas] = useState(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [viewPhotoModalVisible, setViewPhotoModalVisible] = useState(false);
  const [selectedPhotoType, setSelectedPhotoType] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const showUploadModal = () => setUploadModalVisible(true);
  const hideUploadModal = () => setUploadModalVisible(false);
  const showViewPhotoModal = (imageUri) => {
    setSelectedImage(imageUri);
    setViewPhotoModalVisible(true);
  };
  const hideViewPhotoModal = () => setViewPhotoModalVisible(false);

  const uploadImage = async (mode) => {
    try {
      let result = {};
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [6, 4],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [6, 4],
          quality: 1,
        });
      }
      if (!result.cancelled) {
        if (selectedPhotoType === "KTP") {
          setPhotoKTP(result.assets[0].uri);
          extractTextFromImage(result.assets[0].uri);
        } else if (selectedPhotoType === "bebas") {
          setPhotoBebas(result.assets[0].uri);
        } else {
          setPhotoSelfie(result.assets[0].uri);
        }
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
      hideUploadModal();
    }
  };
  const extractTextFromImage = async (imageUri) => {
    try {
      const text = await MlkitOcr.detectFromUri(imageUri);
      console.log("Text from image:", text);
      setNoKTP(text);
    } catch (error) {
      console.log("Error extracting text from image: ", error);
    }
  };

  const onSelectPhotoOption = (mode) => {
    showUploadModal();
    setSelectedPhotoType(mode);
  };

  const onNextPress = () => {
    navigation.navigate("Screen 3", {
      firstName,
      lastName,
      biodata,
      selectedProvince,
      selectedCity,
      selectedSubDistrict,
      selectedDistrict,
      photoSelfie,
      photoKTP,
      noKTP,
      photoBebas,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <TouchableOpacity onPress={() => onSelectPhotoOption("selfie")}>
            <Text style={styles.text}>Select Selfie Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showViewPhotoModal(photoSelfie)}>
            <Image
              source={photoSelfie ? {uri: photoSelfie} : DefaultImagePng}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerImage}>
          <TouchableOpacity onPress={() => onSelectPhotoOption("KTP")}>
            <Text style={styles.text}>Select KTP Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showViewPhotoModal(photoKTP)}>
            <Image
              source={photoKTP ? {uri: photoKTP} : DefaultImagePng}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerImage}>
          <TouchableOpacity onPress={() => onSelectPhotoOption("bebas")}>
            <Text style={styles.text}>Select Free Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showViewPhotoModal(photoBebas)}>
            <Image
              source={photoBebas ? {uri: photoBebas} : DefaultImagePng}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onNextPress}>
          <Button mode="contained" buttonColor="blue" rippleColor="#9bb5d1">
            Next
          </Button>
        </TouchableOpacity>
      </View>
      <UploadModal
        visible={uploadModalVisible}
        hideModal={hideUploadModal}
        onSelectPhoto={uploadImage}
        selectedPhotoType={selectedPhotoType}
      />
      <ViewPhotoModal
        visible={viewPhotoModalVisible}
        hideModal={hideViewPhotoModal}
        imageUri={selectedImage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 30,
  },
  containerImage: {
    gap: 10,
  },
  text: {
    fontSize: 20,
    color: "blue",
  },
  image: {
    width: "100%",
    height: 250,
  },
});

export default WizardScreen2;
