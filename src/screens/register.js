import React, {Component} from "react";
import { 
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

class Register extends Component{
    constructor(){
        super()
        this.state ={
            username: '',
            email: '',
            passwoard: ''
        }
    }
    render(){
        return(
            <View>
                <Text>Registrarse </Text>
                <TextInput 
                    style={styles.form}
                    keyboardType='default'
                    placeholder='nombre de usuario'
                    onChangeText={ text => this.setState({username: text})}
                />
                <TextInput 
                    style={styles.form}
                    keyboardType='email-address'
                    placeholder='mail'
                    onChangeText={ text => this.setState({email: text})}
                />
                <TextInput 
                    style={styles.form}
                    keyboardType='default'
                    placeholder='contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({passwoard: text})}
                />
                
                <TouchableOpacity style={styles.botonEnviar} onPress={() => this.props.register(this.state.email, this.state.passwoard, this.state.username)}><Text>Enviar</Text></TouchableOpacity>
            </View>
        )
    }
}  

const styles = StyleSheet.create({
    form: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        margin: 10
    },
    botonEnviar: {
        alignItems: 'center',
        backgroundColor: "#28a745",
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: '20%',
        textAlign: 'center',
        borderRadius: 4,
        border:1, 
    }
})

export default Register