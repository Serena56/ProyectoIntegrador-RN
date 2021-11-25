import React from 'react';
import { render } from 'react-dom';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import Post from '../Components/Post';
import { auth, db } from '../firebase/Config';

class Home extends React.Component {
    constructor(){
        super()
        this.state = {
            posteos: ''  
        }
    }
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'asc').onSnapshot(
            docs => {    
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                    id: doc.id,
                    data: doc.data()
                }) 
            this.setState({
                posteos: posts,
                loading: false,
            }) 
            })
            }),
            auth.onAuthStateChanged(user => {
                console.log(user)
            })
    }
    render(){
    return(
        <>
            {console.log(this.state.buscar)}
            <View style={styles.flatList}>
                <FlatList 
                data={this.state.posteos}
                keyExtractor={ item => item.id.toString() }
                renderItem={ ({item}) => <Post dataId={item.id}
                description={item.data.description} 
                owner={item.data.owner} createdAt={item.data.createdAt} 
                comments={item.data.comments} likes={item.data.likes} 
                imagen={item.data.photo}    
                />}
            />   
            </View>

        </>
    )
} }

const styles = StyleSheet.create({
    flatlist: {
    width: '100%',
    flex: 1,
    },
})

export default Home;