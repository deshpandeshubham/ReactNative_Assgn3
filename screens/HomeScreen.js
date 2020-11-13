import React, {useState} from 'react'; 
import {StyleSheet,View,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAB,TextInput,Text} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';


const RNFS = require('react-native-fs');
const path = RNFS.DocumentDirectoryPath+'/score.txt';
const HomeScreen = ({route, navigation}) =>{   

  const [score,setScore] = useState(0);  
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [nickName,setNickName] = useState('');
  const [age,setAge] = useState('');
  
  saveUserData = (key,value) => {
    try{
      AsyncStorage.setItem(key,value).then(() => {
        console.log('Data Saved')
      });
    }catch(error){
      console.log(error)
    }
  }

  goToQuiz = (navigation) => {
    navigation.navigate('QuizScreen')
  }

  getUserData = () => {
    try{
      AsyncStorage.getItem('userData',(error,result)=>{
        userDetails = JSON.parse(result);
        if(userDetails.firstName != null)
          setFirstName(userDetails.firstName);
        if(userDetails.lastName != null)
          setLastName(userDetails.lastName);
        if(userDetails.nickName != null)
          setNickName(userDetails.nickName);
        if(userDetails.age != null)
          setAge(userDetails.age);
      });    
    } catch(error) {
      console.log(error)
    }
  }

  writeScore = (val) =>{
    RNFS.writeFile(path,val+'','utf8').then((response) => {
      console.log('Score Saved Successfully');
    }).catch((err) => {});          
  }
  
  fetchScore = () =>{
    RNFS.exists(path).then((result) =>{
      if(result){
        RNFS.readFile(path,'utf8').then((response)=>{
          setScore(response);
        })
      }
    })    
  }

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(isFocused){
        if(route.params){
          let userDetails = {};
          userDetails.firstName = firstName;
          userDetails.lastName = lastName;
          userDetails.nickName = nickName;
          userDetails.age = age;
          const userDetailsJSON = JSON.stringify(userDetails);
          setScore(route.params.currentScore);
          saveUserData('userData',userDetailsJSON);   
          writeScore(route.params.currentScore);       
        }
        else {
          getUserData();       
          fetchScore();   
        }
      }     
    });    
    return unsubscribe;
  }, [isFocused]);

  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}> 
      <View style={styles.container}>
        <TextInput
          value={firstName ? firstName : ''}
          onChangeText={(firstName) => {setFirstName(firstName)}}
          placeholder={'First Name'}
          style={styles.input}
        />
        <TextInput
          value={lastName ? lastName : ''}
          onChangeText={(lastName) => {setLastName(lastName)}}
          placeholder={'Last Name'}
          style={styles.input}
        />
        <TextInput
          value={nickName ? nickName : ''}
          onChangeText={(nickName) => {setNickName(nickName)}}
          placeholder={'Nickname'}
          style={styles.input}
        />
        <TextInput
          value={age ? age : ''}
          onChangeText={(age) => {setAge(age)}}
          placeholder={'Age'}
          style={styles.input}
          keyboardType={'numeric'}
        />
        <Text style={styles.fontStyle}>Score : {score ? score : 0}</Text>
        <FAB
          label="Take Quiz"
          onPress={() => goToQuiz(navigation)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 7,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  fontStyle: {
    padding: 15,
    fontSize: 18
  }
});

export default HomeScreen;
