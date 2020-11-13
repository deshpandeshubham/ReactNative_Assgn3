import React, { useState } from 'react';
import {StyleSheet,View,AsyncStorage} from 'react-native';
import {FAB,RadioButton,Text } from 'react-native-paper';

let score = 0;
const quizData = require('../quiz.json');

const QuizScreen = ({navigation}) => {        
  const [questionIndex,setquestionIndex] = useState(0);
  const [ansIndex,setAnsIndex] = useState(quizData[0].submittedAnswerOption);
  const [buttonLabel,setButtonLabel] = useState('Next');
  const currentQuestion = quizData[questionIndex];
  goNext = (navigation) => {                
    const currentQuestion = quizData[questionIndex];        
    if(ansIndex === currentQuestion.correctAnswer)
        score++;            
    if(buttonLabel === 'End') {                    
        navigation.navigate('HomeScreen',{'currentScore':score});
    }
    else {            
      if(questionIndex == quizData.length -2)
          setButtonLabel('End');                
      setAnsIndex('');
      setquestionIndex(questionIndex+1);
    }                
  }

  React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        score = 0;
      });
      return unsubscribe;
    }, [navigation]);

  return(
    <>
    <View style={styles.container}>
      <Text style={styles.fontStyle}>{"\n"}{currentQuestion.question}{"\n"}</Text>
    </View>
    <RadioButton.Group onValueChange={(value) => setAnsIndex(value)}  value={ansIndex}>
      {currentQuestion.options.map((value,index)=>{
        return <RadioButton.Item style={styles.fontStyle} key={index} value={value.index} label={value.option} />
      })}
    </RadioButton.Group>
    <FAB label={buttonLabel} onPress={() => goNext(navigation)}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    margin: 10,
    padding: 7,
  },
  fontStyle: {
    fontSize: 18
  }
});


export default QuizScreen;