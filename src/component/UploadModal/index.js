import React from "react";
import {StyleSheet} from "react-native";
import {Button, Modal, Portal} from "react-native-paper";

const UploadModal = ({
  visible,
  hideModal,
  onSelectPhoto,
  selectedPhotoType,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <Button
          onPress={() => {
            onSelectPhoto(selectedPhotoType);
            hideModal();
          }}
        >
          Open Camera
        </Button>
        <Button
          onPress={() => {
            onSelectPhoto("gallery");
            hideModal();
          }}
        >
          Choose from Library
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  modalContainer: {
    backgroundColor: "white",
    padding: 30,
    margin: 50,
  },
});
export default UploadModal;
