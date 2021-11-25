import React, { Component } from "react";
import {
    TextInput, 
    View, 
    FlatList,
    StyleSheet, 
    Text
} from 'react-native'
import { auth, db } from '../firebase/Config';


class searchProfile extends Component{
    constructor(){
        super()
        this.state={
            
        }
    }
    render(){
        return(
            
            <View>
                
                {this.state.buscar  }
                <FlatList

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

export default searchProfile