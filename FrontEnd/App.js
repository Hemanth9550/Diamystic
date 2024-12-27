import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions, BackHandler, Alert } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import PatientLogin from './screens/PatientLogin';
import DocDashboard from './screens/DocDashboard';
import Docmenu from './screens/Docmenu';
import DoctorSignUp from './screens/DoctorSignUp';
import DoctorLogin from './screens/DoctorLogin';
import PatDashboard from './screens/PatDashboard';
import Diabetes from './screens/Diabetes';
import PatMenu from './screens/PatMenu';
import FoodsToEatScreen from './screens/FoodsToEatScreen';
import FoodsToControlScreen from './screens/FoodsToControlScreen';
import FoodsToAvoidScreen from './screens/FoodsToAvoidScreen';
import DownloadScreen from './screens/DownloadScreen';
import AddPatient from './screens/AddPatient';
import ViewAll from './screens/ViewAll';
import HelpScreen from './screens/HelpScreen';
import Patientmedic from './screens/Patientmedic';
import BloodSugar from './screens/BloodSugar';
import PatientDetails from './screens/PatientDetails';
import Anthro from './screens/anthro';
import Previous from './screens/Previous';
import Video from './screens/Video';
import Exercise from './screens/Exercise';
import AddVideo from './screens/AddVideo';
import FoodTriangle from './screens/FoodTriangle';
import EditProfile from './screens/EditProfile';
import EditDoctorScreen from './screens/EditDoctorScreen';
import BloodSugarScreen from './screens/BloodSugarScreen';

const Stack = createStackNavigator();
const { height } = Dimensions.get('window');

const headerOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#6EBFF9',
    height: height * 0.1, // Adjust the height proportionally to the screen height
  },
  headerTitle: '',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    color: 'white',
  },
  headerTintColor: 'white',
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Diabetes">
        <Stack.Screen name="Diabetes" component={Diabetes} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FoodsToAvoidScreen" component={FoodsToAvoidScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Diabetes Diet: Foods to Avoid", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="AddPatient" component={AddPatient} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Patient Details", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="DoctorLogin" component={DoctorLogin} options={{ headerShown: false }} />
        <Stack.Screen name="DownloadScreen" component={DownloadScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "              Download", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
       
        <Stack.Screen name="PatientLogin" component={PatientLogin} options={{ headerShown: false }} />
        <Stack.Screen name="DocDashboard" component={DocDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="PatDashboard" component={PatDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Docmenu" component={Docmenu} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Menu", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="DoctorSignUp" component={DoctorSignUp} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="PatMenu" component={PatMenu} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Menu", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="FoodsToEatScreen" component={FoodsToEatScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Diabetes-Friendly Foods", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="FoodsToControlScreen" component={FoodsToControlScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Balanced Choices", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="ViewAll" component={ViewAll} options={{ headerShown: false }} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Support Center", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="Patientmedic" component={Patientmedic} options={headerOptions} />
        <Stack.Screen name="BloodSugar" component={BloodSugar} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Blood Sugar", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="PatientDetails" component={PatientDetails} options={headerOptions} />
        <Stack.Screen name="Anthro" component={Anthro} options={headerOptions} />
        <Stack.Screen name="Previous" component={Previous} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Patient Details", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />

        <Stack.Screen name="Video" component={Video} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Exercise Videos", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />

        <Stack.Screen name="Exercise" component={Exercise} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Exercise Videos", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />

        <Stack.Screen name="AddVideo" component={AddVideo} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Add Video", headerTitleStyle: { textAlign: 'center', marginLeft: 70, marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="FoodTriangle" component={FoodTriangle} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Food Pyramid", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Edit Profile", headerTitleStyle: { textAlign: 'center', marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="EditDoctorScreen" component={EditDoctorScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Edit Profile", headerTitleStyle: { textAlign: 'center', marginLeft: 70, marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="BloodSugarScreen" component={BloodSugarScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Blood Sugar", headerTitleStyle: { textAlign: 'center', marginLeft: 70, marginTop: 10, flexGrow: 1, color: 'white' } }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
