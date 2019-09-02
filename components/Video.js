import React from 'react';
import {
  View,
  asset,
  Environment,
  NativeModules,
  StyleSheet,
  Text,
  VrButton,
} from 'react-360';
import VideoModule from 'VideoModule';

 const CARDS = ['./video/uefa.mp4', './video/football5.mp4', './video/football3.mp4']

export default class Promo extends React.Component {
  state = {
    index: 0,
  };
  promoVideo = VideoModule.createPlayer('promo');

  componentDidMount() {
    Environment.setBackgroundImage(asset('arena.png'), { rotateTransform: [{rotateY: '100deg'}] });

    this.promoVideo.play({
      source: {url: asset(CARDS[this.state.index]).uri},
      muted: false,
      volume: 0.1
    });

    Environment.setScreen(
      'default', /* screen name */
      'promo', /* player unique id */
      'main', /* surface name */
      0, 0, 800, 450 /* relative position on the surface */
    );
  }

  componentDidUpdate() {
    this.promoVideo.play({
      source: {url: asset(CARDS[this.state.index]).uri},
      muted: false,
      volume: 0.1
    });

    Environment.setScreen(
      'default', /* screen name */
      'promo', /* player unique id */
      'main', /* surface name */
      0, 0, 800, 450 /* relative position on the surface */
    );
  }

  _prevVideo = () => {
    let next = this.state.index - 1;
    if (next < 0) {
      next += CARDS.length;
    }
    this.setState({
      index: next,
    });
  }

  _nextVideo = () => {
    let next = this.state.index + 1;
    if (next > 2) {
      next = 0;
    }
    this.setState({
      index: next
    });
  }

  componentWillUnmount() {
    Environment.setScreen(
      'default', /* screen name */
      null, /* player unique id */
      'main', /* surface name */
      0, 0, 800, 450 /* relative position on the surface */
    );
    this.promoVideo.destroy();
  }

  render() {
    return (
      <View>
        <View style={styles.controls}>
          <VrButton onClick={this._prevVideo} style={styles.button}>
            <Text style={styles.buttonText}>{'<'}</Text>
          </VrButton>
          <View>
            <Text>PLAYER PANEL</Text>
          </View>
          <VrButton onClick={this._nextVideo} style={styles.button}>
            <Text style={styles.buttonText}>{'>'}</Text>
          </VrButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 800,
    padding: 10,
  },
  title: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 36,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#c0c0d0',
    borderRadius: 5,
    width: 40,
    height: 44,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
});