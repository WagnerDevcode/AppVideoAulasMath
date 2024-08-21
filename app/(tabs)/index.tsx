import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card, Modal, Portal, Provider } from "react-native-paper";
import { Video } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const video = useRef<Video>(null);

  const handleOpenVideo = () => {
    setIsModalVisible(true);
    if (video.current) {
      video.current.playAsync();
    }
  };

  const handleCloseVideo = () => {
    setIsModalVisible(false);
    if (video.current) {
      video.current.pauseAsync(); // Pausa o vídeo quando o modal é fechado
    }
  };

  // Fechar modal e pausar vídeo quando a tela perder o foco
  useFocusEffect(
    useCallback(() => {
      return () => {
        handleCloseVideo();
      };
    }, [])
  );

  return (
    <Provider>
      <View style={styles.container}>
        {/* Cabeçalho fixo */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AppVideoAulas de Matemática</Text>
          <Text style={styles.headerSubtitle}>
            Aprenda matemática com nossos vídeos e quizzes!
          </Text>
        </View>

        {/* Card para abrir o modal do vídeo */}
        <Card style={styles.card} onPress={handleOpenVideo}>
          <Card.Title title="Assista ao vídeo" />
          <Card.Content>
            <Text>Toque aqui para assistir ao vídeo de instrução.</Text>
          </Card.Content>
        </Card>

        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={handleCloseVideo}
            contentContainerStyle={styles.modalContent}
          >
            <Video
              ref={video}
              source={require("../../assets/videoapresentação.mp4")} // Caminho relativo ao vídeo local
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              shouldPlay={true}
              onError={(error) =>
                console.log("Erro ao reproduzir vídeo:", error)
              }
            />
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#6200ee",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  card: {
    width: width * 0.9,
    marginVertical: 20,
    alignSelf: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  video: {
    width: width * 0.9,
    height: height * 0.7,
  },
});

export default HomeScreen;
