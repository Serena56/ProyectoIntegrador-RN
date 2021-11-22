import React, {Component} from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { auth, db } from '../firebase/Config'

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
            logIn: false
        }
    }

    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {    
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                    id: doc.id,
                    data: doc.data()
                }) 
            this.setState({
                posteos: posts,
                loading: false
            }) 
            })
            }),
            auth.onAuthStateChanged(user => {
                console.log(user)
            })
    }

    register(email, passwoard, username){
        auth.createUserWithEmailAndPassword(email, passwoard)
        .then(() => {
            
            alert('Te has registrado correctamente, ahora inicia sesión')
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
                    <Drawer.Screen name="Inicio" component={() => <Home posteos={this.state.posteos}/>}/>
                    <Drawer.Screen name="Crear Posteo" component={() => <NewPost />}/>
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