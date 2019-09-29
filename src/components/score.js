import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Score extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <Text style={styles.score}>
                    {this.props.score}
                </Text>
            </View>
        );
    }
}
 const styles = StyleSheet.create({
    container: {
         flex: 1,
         alignItems: 'center',
         padding: 10
     },
     score: {
         fontWeight: 'bold',
         fontSize: 40,
     }
 });

 