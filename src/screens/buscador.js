import React, {Component} from 'react';
import {Text,
        TouchableOpacity,
        View,
        StyleSheet,
        Image,
        ActivityIndicator,
        FlatList,
        TextInput } from 'react-native';


class Buscador extends Component{
  constructor(props){
      super(props)
      this.state={  
        buscar: '',
        posteos: ''
      }
  }
  render(){
    return(
      <View>
        <Text>Busca tus usuarios aca</Text>
        <TextInput 
            style={styles.form}
            keyboardType='default'
            placeholder='Busque los posteos de sus usuarios favoritos'
            onChange={text => this.setState({buscar: text})}
        />
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
  }
})

export default Buscador;