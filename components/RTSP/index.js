import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

export default class RTSP extends React.Component {
  static proptypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };
  render() {
    const { id, url } = this.props;
    return (
      <div class="rtsp-container">
        <div
          class="vxgplayer"
          id={id}
          url={url}
          autostart="true"
          auto-reconnect="true"
          controls
          avsync="true"
          nmf-src="vxgplayer/pnacl/Release/media_player.nmf"
          nmf-path="media_player.nmf"
        />
      </div>
    );
  }
}
