import React from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import Post from '../Components/Post';

const Home = (props) => {
    return(
        <>
    
            {console.log(props)}
            <View style={styles.flatList}>
             <FlatList 
                data={props.posteos}
                keyExtractor={ item => item.id.toString() }
                renderItem={ ({item}) => <Post 
                description={item.data.description} 
                owner={item.data.owner} createdAt={item.data.createdAt} 
                comments={item.data.comments} likes={item.data.likes} 
                imagen={item.data.photo}    
                />}
            />   
            </View>

        </>
    )
} 

const styles = StyleSheet.create({
    flatlist: {
    width: '100%',
    flex: 1,
    },
})

export default Home;