import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Header extends React.Component{
    render(){
        return(
            <View style = {styles.Header}>
                <Text style={styles.HeaderText}>
                    Memory Game
                </Text>
            </View>
        );
    }
}
 const styles = StyleSheet.create({
     Header: {
         flex: 1,
         flexDirection: 'column',
         alignSelf: 'stretch',
         paddingTop: 20,
         paddingBottom: 5,
         backgroundColor: '#f3f3f3'
     },
     HeaderText: {
         fontWeight: 'bold',
         fontSize: 17,
         textAlign: 'center'
     }
 });

