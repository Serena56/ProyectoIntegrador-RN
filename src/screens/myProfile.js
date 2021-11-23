import React, {Component} from 'react';
import {Text, TouchableOpacity, View,} from 'react-native';
import {auth} from '../firebase/Config';

class MyProfile extends Component{
    constructor(props){
      super(props);
      this.state ={
        
      }
    }


    render(){
        console.log(auth.currentUser);
        return(
          <View>
            <Text>Mi Perfil</Text>
    
            <View>
              <Text>Nombre: {auth.currentUser.displayName}</Text>
              <Text>Mail: {auth.currentUser.email}</Text>
              <Text>Último inicio de sesión: {auth.currentUser.metadata.lastSignInTime}</Text>
            </View>
            
            <TouchableOpacity onPress={()=>this.props.logout()}>
              <Text>Cerrar sesión</Text>
           
            </TouchableOpacity>
            
          </View>
          
        )
      }
    }


export default MyProfile;