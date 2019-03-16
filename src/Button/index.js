import { Audio } from 'expo';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity as TouchableBounce,
} from 'react-native';
// import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

import AudioFiles from '../../Audio';

export default class Button extends Component {
  state = { soundReady: false };
  async componentWillUnmount() {
    if (this.buttonInSoundObject) {
      this.buttonInSoundObject.unloadAsync();
    }
    if (this.buttonOutSoundObject) {
      this.buttonOutSoundObject.unloadAsync();
    }
  }

  render() {
    return (
      <TouchableBounce
        onPress={this.props.onPress}
        onPressIn={async () => {
          this.buttonInSoundObject = new Audio.Sound();
          await this.buttonInSoundObject.loadAsync(AudioFiles.button_in);
          this.buttonInSoundObject.playAsync();
        }}
        onPressOut={async _ => {
          this.buttonOutSoundObject = new Audio.Sound();
          await this.buttonOutSoundObject.loadAsync(AudioFiles.button_out);
          this.buttonOutSoundObject.playAsync();
        }}
        style={[styles.container, this.props.style]}
      >
        <Image
          source={this.props.source}
          style={[styles.image, this.props.imageStyle]}
        />
      </TouchableBounce>
    );
  }

  /*
  <TouchableWithoutFeedback onPressIn={_=> {
      this.animation.setValue(1);
    }} onPressOut={_=> {
      this.animation.setValue(0);
    }} onPress={this.props.onPress} style={[styles.container, this.props.style]}>
    <Animated.View style={{overflow: 'hidden'}}>
    <Animated.View style={this.wrapStyle}>
      <Image source={this.props.source} style={[styles.image, this.props.imageStyle]}/>
    </Animated.View>
  </Animated.View>
  </TouchableWithoutFeedback>
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,

    resizeMode: 'contain',
    height: 48,
  },
});
