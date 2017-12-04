import React, { Component } from 'react';
import { ActivityIndicator, Text,  View, Alert,
Keyboard, ScrollView, FlatList, KeyboardAvoidingView} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage,List, ListItem, Icon} from 'react-native-elements';

import * as firebase from 'firebase';
import {inject, observer} from "mobx-react";

import Message from './Message.js'

@inject('inbox')
@observer
export class MessagesScreen extends Component{

  static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
      title: "Messages",
      headerTitleStyle :{textAlign:'center',color:'#838889',fontFamily:'Circular Bold',fontSize:17, backgroundColor:'transparent', marginTop:-3},
      headerStyle: {backgroundColor:'white'},
      headerLeft:
       <Icon
        name='chevron-left'
        type='material-community'
        color='#FF5A5F'
        size = {40}
        containerStyle={{marginLeft:10}}
        onPress={() => navigation.goBack(null)} />,
  };
};

  	constructor(props){
  		super(props);
    }


    renderMessages = ({item}) => (
    <Message {...item} />
    );


      render(){
        let messages = this.props.inbox.messages.slice();
        return (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={61}
            style = {{flex:1,backgroundColor:'white'}}
          >

          <ScrollView
          contentContainerStyle = {{paddingHorizontal:8, paddingVertical:15}}
          >
          <FlatList
            data= {messages}
            renderItem={this.renderMessages}
            inverted
          />
            </ScrollView>

            <View >
            <FormInput
            autoCapitalize = {'none'}
            placeholder=' Email'
            onChangeText={(message) => this.props.inbox.messageText = message}
            value={this.props.inbox.messageText}
             />
            </View>

            </KeyboardAvoidingView>

        );
      }
  }


module.exports = MessagesScreen;
