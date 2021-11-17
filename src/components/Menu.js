import React, {Component} from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { auth } from '../firebase/config'

// Probando
import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";
import NewPost from "../screens/newPost"

const Drawer = createDrawerNavigator()

class Menu extends Component{
    constructor(){
        super()
        this.state ={
            logIn: false
        }
    }
    register(email, passwoard, username){
        auth.createUserWithEmailAndPassword(email, passwoard)
        .then(() => {
            alert('Te has registrado correctamente, ahora inicia session')
        })
        .catch(error => {
            alert(error)
        })
    }
    login(email, passwoard){
        auth.signInWithEmailAndPassword(email, passwoard)
        .then((response) => {
            this.setState({
                logIn: true
            })
            alert('Iniciaste session correctamente')
        })
    }
    render(){
        return(
            <NavigationContainer>
            {this.state.logIn ? 
                <Drawer.Navigator>
                    <Drawer.Screen name="Inicio" component={() => <Home />}/>
                    <Drawer.Screen name="Crear Posteo" component={() => <NewPost />}/>
                </Drawer.Navigator>
                :
                <Drawer.Navigator>
                    <Drawer.Screen name="Iniciar sesion" component={() => <Login  login={(email, passwoard) => this.login(email, passwoard)} />}/>
                    <Drawer.Screen name="Registro" component={() => <Register register={(email, passwoard) => this.register(email, passwoard)}/>} />
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }
}  


export default Menu