import React, {Component} from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { auth } from '../firebase/Config';
import { Camera } from 'expo-camera';

// Probando
import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";
import NewPost from "../screens/newPost"
import MyProfile from "../screens/myProfile"

const Drawer = createDrawerNavigator()

class Menu extends Component{
    constructor(){
        super()
        this.state = {
            logIn: false,
            perimission: false,
            }
    }

    register(email, passwoard, username){
        auth.createUserWithEmailAndPassword(email, passwoard)
        .then((user) => {
            user.updateProfile({
                displayName: username
            }).then(() => {
                alert('Te has registrado correctamente, ahora inicia sesión')
            })
            .catch(error => {
                alert(error)
            })
        })
        .catch(error => {
            alert(error)
        })
    }
    login(email, passwoard){
        auth.signInWithEmailAndPassword(email, passwoard)
        .then(() => {
            this.setState({
                logIn: true
            })
            alert('Iniciaste sesión correctamente')
        })
    }

    logout(){
        auth.signOut()
            .then( () => {
                this.setState({
                    logIn: false,
                })
            })
            .catch()
        
    }

    render(){
        return(
            <NavigationContainer>
            {this.state.logIn ? 
                <Drawer.Navigator>
                    <Drawer.Screen name="Inicio" component={() => <Home posteos={this.state.posteos} />}/>
                    <Drawer.Screen name="Crear Posteo" component={() => <NewPost navigation={Drawer} />}/>
                    <Drawer.Screen name="Mi Perfil" component={() => <MyProfile logout={()=>this.logout()}/>}/>
                </Drawer.Navigator>
                :
                <Drawer.Navigator>
                    <Drawer.Screen name="Iniciar sesión" component={() => <Login  login={(email, passwoard) => this.login(email, passwoard)} />}/>
                    <Drawer.Screen name="Registro" component={() => <Register register={(email, passwoard) => this.register(email, passwoard)}/>} />
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }

}  




export default Menu