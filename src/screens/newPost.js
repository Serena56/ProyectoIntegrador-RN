import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { db, auth } from '../firebase/Config';
import MyCamera from '../components/MyCamera';
import { Camera } from 'expo-camera';



class newPost extends React.Component {
    constructor(){
        super();
        this.state = {
            post: '',
            description: '',
            showCamera: true,
            url: ''
        }
    }

    uploadPost() {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: this.state.description,
            createdAt: Date.now(),
            likes: [],
            comments: [],
            photo: this.state.url
            })
            .then(
              //  this.props.drawerProps.navigation.navigate('Home')
              //falta redireccionar a home
            )
            .catch( e => console.log(e))
    }

    onImageUpload(url){
        this.setState({
            showCamera: false,
            url: url
        })
    }

    render(){
        return(
            <>
            {
                this.state.showCamera ?
                <MyCamera onImageUpload={(url)=> this.onImageUpload(url)}/>
                :
            <View style={styles.form}>
                <Text>Postea</Text>
                <TextInput style={styles.field}
                keyboardType='default'
                placeholder='Description'
                onChangeText={ text => this.setState({description:text}) }/>
                <TouchableOpacity style={styles.submit} onPress={() => this.uploadPost()}>
                <Text> Submit </Text>
                </TouchableOpacity>    

            </View>
            }
            </>
        )
    }
}

const styles = {
    field: {
        width: 200,
        marginTop: 20,
        backgroundColor: "#769ede",
        padding: 15,
        borderRadius: 50,
    },
    form: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    },
    submit: {
        alignItems: 'center',
        paddingTop: 5,
        backgroundColor: 'grey'
    }
} 

export default newPost;