import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Dimensions, Alert } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Provider,
  Button as PaperButton,
  Modal,
  Portal,
} from "react-native-paper";
import { WebView } from "react-native-webview";

const videoData = [
  {
    id: "1",
    title: "Aula 1: Sistema de Equação do 1º Grau",
    description:
      "Resolução de situações-problemas pelo método da Substituição.",
    videoId: "ss7IYqhLiN0", // Exemplo de ID do YouTube
  },
  {
    id: "2",
    title: "Aula 2: Equações do 2º Grau",
    description: "Método resolutivo de Bhaskara",
    videoId: "t0NReXt0NfU", // Exemplo de ID do YouTube
  },
  {
    id: "3",
    title: "Aula 3: Proporcionalidade  ",
    description:
      "Resolução de situações-problemnas de congruência de triângulos.",
    videoId: "oRqZyDvzavU", // Exemplo de ID do YouTube
  },

  // Adicione mais vídeos conforme necessário
];

export default function VideoList() {
  const [visible, setVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpar temporizador quando o componente é desmontado ou quando o timeoutId muda
    return () => {
      if (timeoutId) {
        console.log("Limpando temporizador no desmontar ou troca de timeoutId");
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const showModal = (videoId: string) => {
    setCurrentVideoId(videoId);
    setVisible(true);
    console.log("Modal aberto para vídeo:", videoId);

    // Limpar temporizador anterior se houver
    if (timeoutId) {
      console.log("Limpando temporizador anterior");
      clearTimeout(timeoutId);
      setTimeoutId(null); // Certifique-se de que o temporizador foi realmente limpo
    }

    // Temporizador para simular que o vídeo foi assistido
    const id = setTimeout(() => {
      if (videoId) {
        // Usar videoId diretamente
        console.log("Marcando vídeo como assistido:", videoId);
        setWatchedVideos((prev) => {
          const updated = new Set(prev);
          updated.add(videoId);
          return updated;
        });
        Alert.alert("Vídeo está sendo assistido", "Parabéns! Você é incrível.");
      }
    }, 780000); // Ajuste conforme necessário

    setTimeoutId(id);
  };

  const hideModal = () => {
    console.log("Modal fechado");
    setVisible(false);
    setCurrentVideoId(null);
    setTimeoutId(null);
  };

  const isWatched = (videoId: string) => {
    return watchedVideos.has(videoId);
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        {videoData.map((video) => (
          <Card
            key={video.id}
            style={[
              styles.card,
              isWatched(video.videoId) && styles.cardWatched,
            ]}
          >
            <Card.Content>
              <Title>{video.title}</Title>
              <Paragraph>{video.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <PaperButton
                textColor="#fff"
                mode="contained"
                buttonColor={isWatched(video.videoId) ? "green" : undefined}
                onPress={() => showModal(video.videoId)}
              >
                {isWatched(video.videoId) ? "Assistido" : "Assistir"}
              </PaperButton>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          {currentVideoId && (
            <View style={styles.videoContainer}>
              <WebView
                source={{
                  uri: `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&playsinline=1`,
                }}
                style={styles.videoPlayer}
                javaScriptEnabled
                domStorageEnabled
                allowsFullscreenVideo
              />
            </View>
          )}
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginTop: 32,
  },
  card: {
    marginVertical: 15,
  },
  cardWatched: {
    backgroundColor: "#e0f7fa", // Cor de fundo para vídeos assistidos
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    height: Dimensions.get("window").width * 0.75, // Ajuste conforme necessário
  },
  videoContainer: {
    flex: 1,
  },
  videoPlayer: {
    width: "100%",
    height: "100%",
  },
});
