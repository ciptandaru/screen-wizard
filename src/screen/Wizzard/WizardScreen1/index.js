import React, {useState, useEffect} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {TextInput, Button} from "react-native-paper";
import {Picker} from "@react-native-picker/picker";
import axios from "axios";

const WizardScreen1 = ({navigation}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biodata, setBiodata] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [subDistricts, setSubDistricts] = useState([]);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://api.binderbyte.com/wilayah/provinsi?api_key=94a89e1fb377fd5d89bb1723ab352b5f4ce06e40b55a5dbb58634acd1a130a90"
      );
      setProvinces(response.data.value);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(
        `https://api.binderbyte.com/wilayah/kabupaten?api_key=94a89e1fb377fd5d89bb1723ab352b5f4ce06e40b55a5dbb58634acd1a130a90&id_provinsi=${provinceId}`
      );
      setCities(response.data.value);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchSubDistricts = async (cityId) => {
    try {
      const response = await axios.get(
        `https://api.binderbyte.com/wilayah/kecamatan?api_key=94a89e1fb377fd5d89bb1723ab352b5f4ce06e40b55a5dbb58634acd1a130a90&id_kabupaten=${cityId}`
      );
      setSubDistricts(response.data.value);
    } catch (error) {
      console.error("Error fetching sub-districts:", error);
    }
  };

  const fetchDistricts = async (subDistrictId) => {
    try {
      const response = await axios.get(
        `https://api.binderbyte.com/wilayah/kelurahan?api_key=94a89e1fb377fd5d89bb1723ab352b5f4ce06e40b55a5dbb58634acd1a130a90&id_kecamatan=${subDistrictId}`
      );
      setDistricts(response.data.value);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };
  console.log(
    firstName,
    lastName,
    biodata,
    selectedProvince,
    selectedCity,
    selectedSubDistrict,
    selectedDistrict
  );
  const onNextPress = () => {
    navigation.navigate("Screen 2", {
      firstName,
      lastName,
      biodata,
      selectedProvince,
      selectedCity,
      selectedSubDistrict,
      selectedDistrict,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={styles.textInput}
        activeUnderlineColor="blue"
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={styles.textInput}
        activeUnderlineColor="blue"
      />
      <TextInput
        placeholder="Biodata"
        multiline
        numberOfLines={4}
        value={biodata}
        onChangeText={(text) => setBiodata(text)}
        style={styles.textInput}
        activeUnderlineColor="blue"
      />
      <Picker
        selectedValue={selectedProvince}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedProvince(itemValue);
          setSelectedProvinceId(provinces[itemIndex - 1].id);
          fetchCities(provinces[itemIndex - 1].id);
        }}
      >
        <Picker.Item label="Select Province" value="" />
        {provinces.map((province) => (
          <Picker.Item
            key={province.id}
            label={province.name}
            value={province.id}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(itemValue) => {
          setSelectedCity(itemValue);
          fetchSubDistricts(itemValue);
        }}
      >
        <Picker.Item label="Select City" value="" />
        {cities.map((city) => (
          <Picker.Item key={city.id} label={city.name} value={city.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedSubDistrict}
        onValueChange={(itemValue) => {
          setSelectedSubDistrict(itemValue);
          fetchDistricts(itemValue);
        }}
      >
        <Picker.Item label="Select Sub-District" value="" />
        {subDistricts.map((subDistrict) => (
          <Picker.Item
            key={subDistrict.id}
            label={subDistrict.name}
            value={subDistrict.id}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedDistrict}
        onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
      >
        <Picker.Item label="Select District" value="" />
        {districts.map((district) => (
          <Picker.Item
            key={district.id}
            label={district.name}
            value={district.id}
          />
        ))}
      </Picker>
      <TouchableOpacity onPress={onNextPress}>
        <Button mode="contained" buttonColor="blue" rippleColor="#9bb5d1">
          Next
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 5,
  },
  textInput: {
    backgroundColor: "#fff",
  },
});

export default WizardScreen1;
