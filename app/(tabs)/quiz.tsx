import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { Button, Appbar, ProgressBar } from "react-native-paper";
import LottieView from "lottie-react-native";
import questionsData from "../../components/quizData.json";
import imageMap from "../../assets/imageMap"; // Importe o mapa de imagens

interface Question {
  question: string;
  options: string[];
  correct: number;
  image?: string;
}

const QuizScreen: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [score, setScore] = useState(0);

  const shuffleAndSelectQuestions = (questionsArray: Question[]) => {
    const shuffledQuestions = questionsArray.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, 10);
  };

  useEffect(() => {
    const selectedQuestions = shuffleAndSelectQuestions(questionsData);
    setQuestions(selectedQuestions);
  }, []);

  const handleOptionPress = (index: number) => {
    setSelectedOptionIndex(index);
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    setSelectedOptionIndex(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptionIndex(null);
    }
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    const selectedQuestions = shuffleAndSelectQuestions(questionsData);
    setQuestions(selectedQuestions);
  };

  const handleSubmitQuiz = () => {
    if (selectedOptionIndex === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(questions.length);
  };

  const getImageSource = (image: string | undefined) => {
    if (!image) return null;

    // Verifica se a imagem é uma URL externa
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return { uri: image };
    }

    // Caso contrário, tenta carregar como imagem local usando o mapa de imagens
    return imageMap[image] || null;
  };

  return (
    <ScrollView style={styles.container}>
      {currentQuestionIndex < questions.length ? (
        <View>
          <Appbar.Header>
            {currentQuestionIndex > 0 && (
              <Appbar.BackAction onPress={handlePreviousQuestion} />
            )}
            <Appbar.Content
              title={`Questão ${currentQuestionIndex + 1} de ${
                questions.length
              }`}
            />
            <ProgressBar
              progress={(currentQuestionIndex + 1) / questions.length}
              color="#6200ee"
            />
          </Appbar.Header>

          {questions[currentQuestionIndex].image && (
            <Image
              source={getImageSource(questions[currentQuestionIndex].image)}
              style={styles.questionImage}
              resizeMode="contain"
            />
          )}
          <Text style={styles.questionText}>
            {questions[currentQuestionIndex].question}
          </Text>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <Button
                mode={selectedOptionIndex === index ? "contained" : "outlined"}
                onPress={() => handleOptionPress(index)}
                style={[
                  styles.optionButton,
                  selectedOptionIndex === index && styles.selectedOptionButton,
                ]}
                labelStyle={styles.optionButtonText}
              >
                {String.fromCharCode(65 + index)}
              </Button>
              <Text style={styles.optionText}>{option}</Text>
            </View>
          ))}

          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              mode="contained"
              onPress={handleSubmitQuiz}
              disabled={selectedOptionIndex === null}
              style={styles.submitButton}
            >
              Enviar para correção
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={handleNextQuestion}
              disabled={selectedOptionIndex === null}
              style={styles.nextButton}
            >
              Próxima
            </Button>
          )}
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.scoreText}>
            Sua pontuação: {score} de {questions.length}
          </Text>
          {score > 4 ? (
            <LottieView
              source={require("../../assets/animacao/acertos.json")}
              autoPlay
              loop={false}
              style={styles.animation}
            />
          ) : score < 5 ? (
            <LottieView
              source={require("../../assets/animacao/erros.json")}
              autoPlay
              loop={false}
              style={styles.animation}
            />
          ) : null}
          <Button
            mode="contained"
            onPress={handleRestartQuiz}
            style={styles.restartButton}
          >
            Novo Quiz
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 18,
    textAlign: "justify",
    color: "#000",
  },
  questionImage: {
    width: "100%",
    height: 180,
    marginBottom: 0,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  optionButton: {
    width: 40,
    height: 40,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedOptionButton: {
    backgroundColor: "#9370DB",
  },
  optionButtonText: {
    fontSize: 15,
    color: "#000",
  },
  optionText: {
    fontSize: 18,
    color: "#000",
    flexShrink: 1,
  },
  nextButton: {
    marginTop: 12,
    marginVertical: 32,
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: "#4B0082",
    marginVertical: 32,
  },
  resultContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  animation: {
    width: 300,
    height: 300,
  },
  restartButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    width: "100%",
  },
});

export default QuizScreen;
