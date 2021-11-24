import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/Config';
import Post from '../components/Post';

class MyProfile extends Component{
    constructor(props){
      super(props);
      this.state ={
        posteos: []
      }
    }

    componentDidMount(){
      db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
          docs => {
              let posts = [];
              docs.forEach( doc => {
                posts.push({
                      id: doc.id,
                      data: doc.data()
                  })
                  this.setState({
                    posteos: posts,
                })
              })
          }
      )
  }

    render(){
        return(
          <View>
            <Text>Mi Perfil</Text>
    
            <View>
              <Text>Nombre:{}</Text>
              <Text>Mail: {auth.currentUser.email}</Text>
              <Text>Último inicio de sesión: {auth.currentUser.metadata.lastSignInTime}</Text>
            </View>
            
            <TouchableOpacity onPress={()=>this.props.logout()}>
              <Text>Cerrar sesión</Text>
           
            </TouchableOpacity>

            {this.state.posteos.length>0 ? 
           <FlatList 
           data = {this.state.posteos}
           keyExtractor = { item => item.id}
           renderItem= {({item})=> <Post 
           dataId={item.id}
           description={item.data.description} 
           owner={item.data.owner} createdAt={item.data.createdAt} 
           comments={item.data.comments} likes={item.data.likes} 
           imagen={item.data.photo}    
           />}
          />
            
          :
          <Text> No has hecho posteos </Text>
           }
            
          </View>
          
        )
      }
    }


export default MyProfile;