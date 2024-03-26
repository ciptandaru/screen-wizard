import React from "react";
import {Image, StyleSheet} from "react-native";
import {Modal, Portal} from "react-native-paper";
import DefaultImagePng from "../../../assets/default.png";

const ViewPhotoModal = ({visible, hideModal, imageUri}) => {
  return (
    <Portal style={styles.container}>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.viewPhotoModalContainer}
      >
        <Image
          source={imageUri ? {uri: imageUri} : DefaultImagePng}
          style={styles.modalImage}
        />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPhotoModalContainer: {
    backgroundColor: "white",
    padding: 1,
  },
  modalImage: {
    width: "100%",
    height: 250,
  },
});
export default ViewPhotoModal;
