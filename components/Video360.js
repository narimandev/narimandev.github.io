import React from 'react';
import {
  asset,
  Environment,
  View,
} from 'react-360';

import VideoModule from 'VideoModule';

export default class Video360 extends React.Component {
  Video360 = VideoModule.createPlayer('Video360');

  componentDidMount() {

    this.Video360.play({
      source: { url: asset('./video/football.mp4').uri},
      muted: false
    });

    Environment.setBackgroundVideo('Video360', { rotateTransform: [{rotateY: '180deg'}] });
  }

  componentWillUnmount() {
    this.Video360.destroy();
  }

  render() {
    return(
      <View />
    )
  }
}