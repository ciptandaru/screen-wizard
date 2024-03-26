import React from "react";
import {View, Text} from "react-native";

const WizardScreen3 = ({route}) => {
  const {
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
  } = route.params;

  const jsonData = {
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
  };

  return (
    <View>
      <Text>Data JSON yang siap dikirim ke API:</Text>
      <Text>{JSON.stringify(jsonData)}</Text>
    </View>
  );
};

export default WizardScreen3;
