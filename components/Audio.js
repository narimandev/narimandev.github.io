import React from 'react';
import {
  asset,
  Environment,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-360';

const {AudioModule} = NativeModules;

CARDS = [
  {uri: 'uefa-league.png', title: 'Uefa', audio: 'uefa.mp3'},
  {uri: 'liverpoll-logo.png', title: 'Liverpool', audio: 'liverpool.mp3' },
  {uri: 'fc-barcelona-logo.png', title: 'Barcelona', audio: 'fc-barcelona.mp3'},
  {uri: 'manchester-logo.png', title: 'ManchesterUnited', audio: 'manchester-unated.mp3'}
];

class EventImage extends React.Component {
  render() {
    return(
      <View>
        <Image style={{width: 800, height: 300}} source={asset(this.props.uri)} />
      </View>
    )
  }
}

export default class Events extends React.Component {
  state = {
    index: 0,
  };

  componentDidMount() {
    Environment.setBackgroundImage(asset('arena.png'));

    AudioModule.playEnvironmental({
      source: asset(`audio/${CARDS[this.state.index].audio}`),
      volume: 0.3, // play at 3/10 original volume
    });
  }

  componentDidUpdate() {
    AudioModule.playEnvironmental({
      source: asset(`audio/${CARDS[this.state.index].audio}`),
      volume: 0.3, // play at 3/10 original volume
    });
  }

  componentWillUnmount() {
    AudioModule.stopEnvironmental();
  }

  _prevPhoto = () => {
    let next = this.state.index - 1;
    if (next < 0) {
      next += CARDS.length;
    }
    this.setState({
      index: next,
    });

    const current = CARDS[
      this.state.index % CARDS.length
    ];
  };

  _nextPhoto = () => {
    let next = this.state.index + 1;
    if (next > 3) {
      next = 0;
    }

    this.setState({
      index: next
    });

    const current = CARDS[
      this.state.index % CARDS.length
    ];
  };

  render() {
    const current = CARDS[
      this.state.index % CARDS.length
    ];

    return (
      <View>
        <EventImage uri={current.uri} />
        <View style={styles.controls}>
          <VrButton onClick={this._prevPhoto} style={styles.button}>
            <Text style={styles.buttonText}>{'<'}</Text>
          </VrButton>
          <View>
            <Text style={styles.title}>{current.title}</Text>
          </View>
          <VrButton onClick={this._nextPhoto} style={styles.button}>
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