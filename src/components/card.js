import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default class Card extends React.Component{
    render(){
        let CardSource = FontAwesome;
        let iconName = 'question-circle';
        let iconColor = '#393939';

        if (this.props.isOpen){
            CardSource = this.props.src;
            iconName = this.props.name;
            iconColor = this.props.color;
        }

        return(
          <View style= {styles.card}>
              <TouchableHighlight 
                onPress = {this.props.clickCard} 
                activeOpacity={0.75} 
                underlayColor={'#f1f1f1'}>
                    <CardSource
                        name = {iconName}
                        size = {50}
                        color = {iconColor}
                    />
                </TouchableHighlight>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center'
    },
    cardText: {
        fontWeight: 'bold',
        fontSize: 50,
    }
})