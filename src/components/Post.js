import React from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';

class Post extends React.Component {
    constructor(){
        super();
        this.state = {
            
        }
    }

    render() {
        return(
            <View style={styles.contenedorMadre}>
            

            <View style={styles.contenedor}>
                <Image source={this.props.imagen} style={styles.imgPost}/>

                <View style={styles.contenedorPost}>
                    
                    <View style={styles.infoPost}>
                    <Text>{this.props.owner}: </Text>
                    {console.log(this.props)}
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
                            <Text>Likes: {this.props.likes}</Text>
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
        backgroundColor: '#d6eaff'
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
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        
    },
    imagePost: {
        flex: 1,
        height: 400,
        width: '100%',
        
    },
    textPost: {
        marginTop: 5,
        alignItems: 'flex-start'
    },
    infoPost: {

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