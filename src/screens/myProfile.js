import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/Config';
import Post from '../components/Post';


class MyProfile extends Component {
    constructor(props){
      super(props);
      this.state = {
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

    render() {
        return(
          <View>
            <Text style={styles.titulo} >Mi Perfil</Text>
    
            <View>
              <Text style={styles.data} >Nombre:{auth.currentUser.displayName}</Text>
              <Text style={styles.data} >Mail: {auth.currentUser.email}</Text>
              <Text style={styles.data} >Último inicio de sesión: {auth.currentUser.metadata.lastSignInTime}</Text>
              <Text style={styles.data} >Cantidad de publicaciones: {this.state.posteos.length}</Text>
            </View>
            
            <TouchableOpacity style={styles.botonLogOut} onPress= {()=>this.props.logout()} >
              <Text>Cerrar sesión</Text>
           
            </TouchableOpacity>

            {this.state.posteos.length !== 0 ? 
           <FlatList 
           style={styles.posteos}
           data = {this.state.posteos}
           keyExtractor = { item => item.id.toString()}
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

    const styles = StyleSheet.create({
      botonLogOut: {
          alignItems: 'center',
          backgroundColor: "grey",
          color: "#fff",
          paddingHorizontal: 10,
          paddingVertical: 6,
          width: '30%',
          textAlign: 'center',
          borderRadius: 4,
          border:1, 
          marginTop: 20,
      },
      titulo: {
            color: 'black',
            textAlign: 'center',
            fontSize: 35,
            fontFamily:"sans-serif",
            textDecorationLine: "underline",
            marginTop: 15,
          },
          containerStyle: {
            backgroundColor: 'white',
            padding: 15,
          },
          data: {
            color: 'black',
            textAlign: 'center',
            fontSize: 20,
            fontFamily:"sans-serif",
            marginTop: 15,
          },
          posteos: {
            padding: 20,
          },
  })


export default MyProfile;