/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';

import CodePush from 'react-native-code-push'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state( {
      logs: []
    })
  }

  sendEvent() {
    Analytics.trackEvent('some custom event', {
      prop1: new Date().getSeconds()
    });
  }

  nativeCrash() {
    Crashes.generateTestCrash();
  }

  jsCrash() {
    this.func1();
  }

  func1() {
    this.func2();
  }

  func2() {
    this.func3();
  }

  func3() {
    throw new Error('some js crash errror');
  }


  codePushSync() {
    this.setState({logs: ['started at ' + new Date().getTime()]})
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE
    }, (status) => {
      for (var key in CodePush.SyncStatus) {
        if(status === CodePush.SyncStatus[key]) {
          this.setState(prevState => ({
            logs: [...prevState, key.replace(/_/g, ' ')];
          }));

          break;
        }
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.sendEvent()}>Custom Analytics Event</TouchableOpacity>
        <TouchableOpacity onPress={() => this.nativeCrash()}>Native Crash Event</TouchableOpacity>
        <TouchableOpacity onPress={() => this.jsCrash()}>Javascript Crash Event</TouchableOpacity>
        <TouchableOpacity onPress={() => this.codePushSync()}>CodePush Sync</TouchableOpacity>
        <Text>{JSON.stringify(this.state.logs)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
