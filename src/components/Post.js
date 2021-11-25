import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Modal} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { db, auth } from '../firebase/Config';
import firebase from "firebase";

class Post extends React.Component {
    constructor(){
        super();
        this.state = {
            likes: 0,
            myLike: false,
            showModal: false,
            comment: ''
        }
    }

    componentDidMount(){
       this.setState({
           likes: this.props.likes.length,
           myLike: this.props.likes.includes(auth.currentUser.email)
       })
       
    }

    likear(){
        db.collection('posts').doc(this.props.dataId).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
            myLike: true,
            likes: this.props.likes.length 
            }),
            ()=>console.log(this.props.likes)
        })
        .catch(e=> console.log(e))
    }

    unlike(){
        db.collection('posts').doc(this.props.dataId).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
            myLike: false,
            likes: this.props.likes.length 
            }),
            ()=>console.log(this.props.likes)
        })
        .catch(e=> console.log(e))
    }

    showModal() {
        this.setState({
            showModal: true
        }),
        console.log(this.props.comments)
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }
    
    eliminar(){
        db.collection('posts').doc(this.props.dataId).delete()
            .then()
            .catch(e => console.log(e))
    }
    
    publicarComentario() {
        let oneComment = {
            author: auth.currentUser.email,
            createdAt: Date.now(),
            commentText: this.state.comment,
        }
        db.collection('posts').doc(this.props.dataId).update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=> {
            this.setState({
                comment: ''
            })
        })
        .catch(e=> console.log(e))
    }

    render() {
        return(
            
            <View style={styles.contenedorMadre}>

            {auth.currentUser.email == this.props.owner ?
                <TouchableOpacity style={styles.botonEliminar} onPress={() => this.eliminar()}>
                                <Text>Eliminar</Text>
                </TouchableOpacity>
                :
                <Text></Text>
                }

            <View style={styles.contenedor}>
                <Image source={this.props.imagen} style={styles.imgPost}/>

                <View style={styles.contenedorPost}>
                    
                    <View style={styles.infoPost}>
                    <Text>{this.props.owner}: </Text>

                    

                    <View style={styles.setRow}>
                        <Text style={styles.textPost}>{this.props.description}</Text> 
                        <Text style={styles.createdAt}>{this.props.createdAt.toString()}</Text>
                    </View>
                       
                       <View style={styles.commentsContainer}>
                            
                            <Text>Likes: {this.state.likes}</Text>
                            {
                                this.state.myLike ?

                                <TouchableOpacity onPress={()=> this.unlike()}>
                                <Text>Deslikear</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=> this.likear()}>
                                <Text>Me Gusta</Text>
                            </TouchableOpacity>
                            }

                            <TouchableOpacity onPress={()=> this.showModal()}>
                                <Text styles={styles.commentsTextTitulo}>Ver Comentarios </Text>
                            </TouchableOpacity>

                           { this.state.showModal ?
                                <Modal style={styles.modalContainer}
                                animationType='fade' transparent={false} visible={this.state.showModal} presentationStyle='formSheet'>
                                
                                    <TouchableOpacity onPress={()=> this.closeModal()}>
                                    <Text style={styles.closeButton}>X</Text>
                                    </TouchableOpacity>

                                    {
                                        this.props.comments ?
                                    
                                    <FlatList 
                                    data={this.props.comments}
                                    keyExtractor={ item => item.createdAt.toString() }
                                    renderItem={ ({item}) => <Text>{item.author}: {item.commentText}</Text>}
                                    />
                                    :
                                    <Text></Text>
                                    }

                                    <View>
                                        <TextInput keyboardType='default' placeholder="escribi tu comentario" 
                                        onChangeText={(text)=> {this.setState({ comment: text })}} value={this.state.comment}/>
                                            
                                        <TouchableOpacity onPress={()=> this.publicarComentario()}>
                                            <Text>Comentar</Text>
                                        </TouchableOpacity>
                                    </View>
                                
                                    </Modal>
                                :
                                <Text> No Modal</Text>
                            }

                            {/* <Text styles={styles.commentsTextTitulo}>Comments: </Text>
                            <FlatList 
                                data={this.props.comments}
                                keyExtractor={ item => item.toString() }
                                renderItem={ ({item}) => <Text>{item}</Text>}
                                />   */}
                       </View>
                    </View>
                    

                </View>

            </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedorMadre: {
        backgroundColor: '#d6eaff',
    },
    contenedor: {
        marginTop: 25,
        flex: 1,
        backgroundColor: 'grey',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    contenedorPost: {
        flex: 1,
        backgroundColor: 'white',
        width: '90%',
        marginTop: 32,
        marginBottom: 12,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        height: '220px'
        
    },
    textPost: {
        marginTop: 15,
        alignItems: 'flex-start'
    },
    infoPost: {
        height: '220px'
    },
    createdAt: {
        alignItems: 'flex-end',
        marginRight: 0,
        marginLeft: 'auto',
        marginBottom: 0,
        marginTop: 5,
    },
    setRow: {
        flexDirection: 'row'
    },
    commentsContainer: {
        marginTop: 5,
    },
    commentsTextTitulo: {
        fontWeight: 'bold'
    },
    imgPost: {
        flex: 1,
        height: 300,
        border: '1px solid black'
    },
    modalContainer: {
        maxWidth: '90%',
        width: '20px%',
        boderRadius: 4,
        padding: 10,
        alignSelf: 'center',
        marginVertical: 10,
        boxShadow: 'rgb(204 204 204) 0px 0px 12px 9px',
        backgroundColor: 'white'
    },
    closeButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        borderRadius: 4,
        margin: 5,
        alignSelf: 'flex-end'
    },
    botonEliminar: {
        alignItems: 'center',
          backgroundColor: "red",
          color: "#fff",
          paddingHorizontal: 10,
          paddingVertical: 6,
          width: '15%',
          textAlign: 'center',
          borderRadius: 4,
          border:1, 
          marginTop: 20,
    },
})


export default Post;