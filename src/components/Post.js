import React from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { db, auth } from '../firebase/Config';
import firebase from "firebase";

class Post extends React.Component {
    constructor(){
        super();
        this.state = {
            likes: 0,
            myLike: false
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

    render() {
        console.log(this.props.likes)
        return(
            
            <View style={styles.contenedorMadre}>
            

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
                            <Text styles={styles.commentsTextTitulo}>Comments: </Text>
                            <FlatList 
                                data={this.props.comments}
                                keyExtractor={ item => item.toString() }
                                renderItem={ ({item}) => <Text>{item}</Text>}
                                />  
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
    }
})


export default Post;