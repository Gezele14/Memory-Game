import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import {Ionicons, FontAwesome, Entypo} from '@expo/vector-icons';

import Header from './src/components/header';
import Score from './src/components/score';
import Card from './src/components/card';
import helpers from './src/helpers/helpers';

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.renderCards = this.renderCards.bind(this);
    this.resetCards = this.resetCards.bind(this);

    //Fuentes de los iconos
    let sources ={
      'fontawesome': FontAwesome,
      'entypo': Entypo,
      'ionicons': Ionicons
    };

    //matriz de las cartas
    let cards = [
      {
        src: 'fontawesome',
        name: 'heart',
        color: 'red'
      },
      {
        src: 'entypo',
        name: 'feather',
        color: '#7d4b12'
      },
      {
        src: 'entypo',
        name: 'flashlight',
        color: '#f7911f'
      },
      {
        src: 'entypo',
        name: 'flower',
        color: '#37b24d'
      },
      {
        src: 'entypo',
        name: 'moon',
        color: '#ffd43b'
      },
      {
        src: 'entypo',
        name: 'youtube',
        color: '#ff0000'
      },
      {
        src: 'entypo',
        name: 'shop',
        color: '#5f5f5f'
      },
      {
        src: 'fontawesome',
        name: 'github',
        color: '#24292e'
      },
      {
        src: 'fontawesome',
        name: 'skype',
        color: '#1686d9'
      },
      {
        src: 'fontawesome',
        name: 'send',
        color: '#1c7cd6'
      },
      {
        src: 'ionicons',
        name: 'ios-magnet',
        color: '#d61c1c'
      },
      {
        src: 'ionicons',
        name: 'logo-facebook',
        color: '#3c5b9b'
      },
    ];

    //Clonar la matriz para que existan las parejas
    let clone = JSON.parse(JSON.stringify(cards));
    this.cards = cards.concat(clone);

    //Generar un id unico a las cartas
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = sources[obj.src];
      obj.isOpen = false;
    });

    //Ordenar las cartas al azar
    this.cards = this.cards.shuffle();

    this.state = {
      currentSelection: [],
      selectedPairs:[],
      score: 0,
      cards: this.cards
    }
  };

  //Mostrar las cartas en la pantalla
  renderRows(){
    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards,index) =>{
      return(
        <View key={index} style={styles.row}>
          {this.renderCards(cards)}
        </View>
      );
    })
  }

  //Ordenar la filas y columnas
  getRowContents(cards){
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      contents.push(item);
      if(count == 4){
        contents_r.push(contents);
        count = 0;
        contents = [];
      }
    });

    return contents_r;
  };

  renderCards(cards) {
    return cards.map((card,index) =>{
      return(
        <Card
          key = {index}
          src = {card.src}
          name = {card.name}
          color = {card.color}
          isOpen = {card.isOpen}
          clickCard = {this.clickCard.bind(this, card.id)}
        />
      );
    });
  }

  clickCard(id){
    let selectedPairs = this.state.selectedPairs;
    let currentSelection = this.state.currentSelection;
    let score = this.state.score;

    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;

    if(cards[index].isOpen == false && selectedPairs.indexOf(cards[index].name) == -1){
      cards[index].isOpen = true;
      currentSelection.push({
        index: index,
        name: cards[index].name
      });

      if(currentSelection.length == 2){
        if(currentSelection[0].name == currentSelection[1].name){
          score += 10;
          selectedPairs.push(cards[index].name);
        }else{
          cards[currentSelection[0].index].isOpen = false;

          setTimeout(() =>{
            cards[index].isOpen = false;
            this.setState({
              cards: cards
            });
          }, 1000);
        }

        currentSelection = [];
      }

      this.setState({
        score: score,
        cards: cards,
        currentSelection: currentSelection
      });
    }
  }

  resetCards(){
    let cards = this.cards.map((obj) => {
      obj.isOpen = false;
      return obj;
    });

    cards = cards.shuffle();

    this.setState({
      score: 0,
      selectedPairs: [],
      cards: cards,
      currentSelection: []
    });
  }

  render(){
    return(
      <View style = {styles.container}>
        <Header/>
        <View style={styles.body}>
          {
            this.renderRows.call(this)
          }
        </View>
        <Score score = {this.state.score} />
        <Button
          onPress={this.resetCards}
          title= "Reset"
          color="#008cfa"
        />
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20
  }
});
