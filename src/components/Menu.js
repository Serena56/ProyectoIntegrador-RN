import React, {Component} from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { auth } from '../firebase/Config';
import { Camera } from 'expo-camera';

// Probando
import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";
import Buscador from "../screens/buscador";
import NewPost from "../screens/newPost";
import MyProfile from "../screens/myProfile";
// import Buscador from "../screens/buscador";

const Drawer = createDrawerNavigator()

class Menu extends Component {
    constructor() {
        super()
        this.state = {
            logIn: false,
            perimission: false,
            }
    }
    componentDidMount(){
        auth.onAuthStateChanged(
            user =>{
                console.log(user)
                if(user){
                    this.setState({
                        login: true,
                        userData: user
                    })
                }
            }
        )
    }
    register(email, passwoard, usuario){
        auth.createUserWithEmailAndPassword(email, passwoard)
        .then((response) => {
            response.user.updateProfile({
                displayName: usuario,
            })
            alert('Te has registrado correctamente, ahora inicia sesión')
        })
        .catch(error => {
            this.diferentesErrores(error)
            alert(error)
        })
    }
    login(email, passwoard){
        auth.signInWithEmailAndPassword(email, passwoard)
        .then( () => {
            this.setState({
                logIn: true,
            })
            alert('Iniciaste sesión correctamente')
        })
        .catch((error) => {
            this.diferentesErrores(error)
            alert(error)
        })
    }
    diferentesErrores(error){
        let mensaje=''
        switch (error.code) {
            case 'auth/invalid-email':
                mensaje = 'El formato utilizado no es el correcto. Por favor, pruebe devuelta'
                break;
            case 'auth/wrong-passwoard':
                mensaje = 'La contraseña no es la correcta. Pruebe devuelta o verifique si el mail es el correcto'
                break;
            case 'auth/email-already-in-use':
                mensaje = 'Ese mail ya fue utilizado. Por favor, pruebe con otro'  
                break;
            case 'auth/weak-password':
                mensaje = 'La contraseña no es segura. Por favor, pruebe con otra'
            case 'auth/to-many-requests':
                mensaje = 'Ha superado la cantidad de intentos permitidos, pruebe mas tarde'
            default:
                mensaje = 'Por favor pruebe nuevamente'
                break;
        }
        this.setState({
            errorForm: mensaje,
            errorField: true
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
                    <Drawer.Screen name="Mi Perfil" component={() => <MyProfile logout={()=>this.logout()} />}/>
                    <Drawer.Screen name="Búsqueda" component={()=> <Buscador/>}/>
                </Drawer.Navigator>
                :
                <Drawer.Navigator>
                    <Drawer.Screen name="Iniciar sesión" component={() => <Login  login={(email, passwoard) => this.login(email, passwoard)} />}/>
                    <Drawer.Screen name="Registro" component={() => <Register register={(email, passwoard,username) => this.register(email, passwoard, username)}/>} />
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }

}  




export default Menu;