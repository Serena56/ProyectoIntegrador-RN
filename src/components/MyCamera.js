import React from 'react';
import { Camera } from 'expo-camera';
import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {db, storage} from '../firebase/Config'

class MyCamera extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            permission: false,
            photo: ''
        }
        this.camera
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permission: true,
                })
            })
            .catch( e => console.log(e))
    }
    
    savePhoto() {
        fetch(this.state.photo)
        .then(res => res.blob())
        .then( image => {
            const ref = storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(image)
                .then(() => {
                    ref.getDownloadURL()
                        .then(url => {
                            this.props.onImageUpload(url);
                            this.setState({
                                photo: ''
                            })
                        })
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    }

    clearPhoto(){
        //Opcion de volver a sacarse una foto
        //setear el estado de photo =  " "
    }

    takePicture(){
        this.camera.takePictureAsync()
            .then(photo => {
                this.setState({
                    photo: photo.uri,
                    showCamera: false
                })
            }) 
    }

    render(){
    return (
        <>
       { 
           this.state.permission ?
            this.state.photo ?
            <>
            <Image   
                style={styles.preview}
                source={ {uri:this.state.photo}}
            />
            <View style={styles.actionArea}>
            <TouchableOpacity onPress={()=> this.savePhoto()}><Text>Aceptar</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=> this.clearPhoto()}><Text>Rechazar</Text></TouchableOpacity>
            </View>
            </>
            :
           <>
        <Camera style={styles.cameraBody} type={Camera.Constants.Type.back} 
                ref={reference => this.camera = reference}/>
                <TouchableOpacity style={styles.shootButton} onPress={() => this.takePicture()}>
                <Text>Shoot</Text>
                </TouchableOpacity>
                </>
                :
                <Text>No hay permisos para usar la camara</Text>
       }
        </>
    )
}}

const styles = StyleSheet.create({
    cameraBody: {
        flex: 7,
        marginTop: '150px'
    },
    shootButton: {
        flex: 1,
        marginTop: '200px',
        border: '1px solid black'
    },
    preview: {
        flex: 7
    },
    actionArea: {
    flex: 2
    }
})
    
export default MyCamera;
