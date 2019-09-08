import React from 'react';

export default class RedirectPage extends React.Component {
  constructor(props) {
    super(props);
    const url = props.url;
    // Supporting URLs provided without a protocol.
    if(url) {
      if(url.match(/^https?/)) {
        window.location.replace(url);
      }
      else {
        // Defaults to using current protocol if not supplied.
        window.location.replace('//' + url);
      }
    }
  }

  render() {
    return <div>Loading</div>;
  }
}
