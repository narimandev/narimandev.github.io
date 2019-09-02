import React from 'react';
import {
  AppRegistry,
  asset,
  Environment,
  NativeModules,
  StyleSheet,
  Text,
  View,
} from 'react-360';
import InfoButton from './components/InfoButton';
import Video from './components/Video';
import Audio from './components/Audio';
import Video360 from './components/Video360';

const SCENES = ['Video', 'Audio', '360'];

class Scene extends React.Component {
  state = {
    scene: ''
  }

  componentDidMount() {
    Environment.setBackgroundImage(asset('arena.png'), { rotateTransform: [{rotateY: '180deg'}] });
  }

  clearMedia() {
    Environment.clearBackground();
  }

  clickHandler(selection) {
    this.setState({
      scene: selection
    })

    this.clearMedia();
  }

  render() {
    const scene = this.state.scene;
    let selection;
    const sceneButtons = [];

    if (scene === 'Video') {
      selection = <Video />;
    } else if (scene === 'Audio') {
      selection = <Audio />;
    } else if (scene === '360') {
      selection = <Video360 />;
    }

    for (let i in SCENES) {
      sceneButtons.push(
        <InfoButton
          key={i}
          style={styles.button}
          source={asset('53283.svg')}
          text={SCENES[i]}
          onClick={() => { this.clickHandler(SCENES[i])}}
        />
      )
    }

    return(
      <View style={styles.panel}>
        <View>
          {selection}
        </View>
        <View style={styles.section}>
          {sceneButtons}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  panel: {
    width: 800,
    height: 450,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  section: {
    padding: 10,
    backgroundColor: '#FFE500',
    borderColor: '#ED8B00',
    borderWidth: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
  }
});

AppRegistry.registerComponent('Scene', () => Scene);