import React, {Component} from "react";
import { 
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'



class Login extends Component{
    constructor(){
        super()
        this.state ={
            email: '',
            passwoard: '',
        }
    }
    render(){
        return(
            <View>
                <TextInput
                    style={styles.form}
                    keyboardType='email-address'
                    placeholder='mail'
                    onChangeText={text => this.setState({email: text})}
                />
                <TextInput
                    style={styles.form}
                    keyboardType='default'
                    placeholder='passwoard'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({passwoard: text})}
                />
                <TouchableOpacity style={this.state.email === "" || this.state.passwoard === "" ? styles.botonNoEnviar: styles.botonEnviar}  disabled={this.state.email === "" || this.state.passwoard === "" ? true: false} onPress={() => this.props.login(this.state.email, this.state.passwoard)} ><Text>Enviar</Text></TouchableOpacity>
            </View>
        )
    }
}  

const styles = StyleSheet.create({
    form:{
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
    },
    botonNoEnviar: {
        alignItems: 'center',
        backgroundColor: "grey",
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: '20%',
        textAlign: 'center',
        borderRadius: 4,
        border:1, 
    }
})
export default Login