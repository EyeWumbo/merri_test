import React from 'react';

import generateUrl from '../urlGenerator.js';

export default class URLInputPage extends React.Component {

  constructor(props) {
    super(props);

    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onShortenRequest = this.onShortenRequest.bind(this);

    this.errorRef = React.createRef();
    this.inputRef = React.createRef();
    this.resultRef = React.createRef();

    // Regex for validating URLs. Taken from StackOverflow.
    this.urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    this.state = {
      disableButton: true
    }
  }

  onInputBlur(e) {
    const currentValue = this.inputRef.current.value;
    const validUrl = currentValue.match(this.urlRegex);
    this.errorRef.current.innerHTML = validUrl ? '' : 'This does not appear to be a valid URL.';
    if(currentValue === '') {
      this.errorRef.current.innerHTML = 'Please input something for the URL.';
    }
    this.setState({
      disableButton: !validUrl
    });
  }

  onInputChange(e) {
    const currentValue = this.inputRef.current.value;
    this.errorRef.current.innerHTML = '';
    if(e.key === 'Enter') {
      this.onShortenRequest();
    }
    this.setState({
      disableButton: !currentValue.match(this.urlRegex)
    })
  }

  onShortenRequest() {
    if(!this.inputRef.current.value.match(this.urlRegex)) {
      return;
    }
    const url = this.inputRef.current.value;
    const shortId = generateUrl(url);
    this.resultRef.current.innerHTML = `Your shortened link is at <a target="_blank" href="/s/${shortId}">${document.location.origin}/s/${shortId}</a>`
  }

  render() {
    return (
      <div className="page">
        <div className="col content-container">
          <div className="row input-container">
            <span className="error-msg" ref={this.errorRef}>
            </span>
            <input type="text" placeholder="URL to shorten" onBlur={this.onInputBlur} ref={this.inputRef} onKeyDown={this.onInputChange} />
            <button disabled={this.state.disableButton} onClick={this.onShortenRequest}>Shorten!</button>
          </div>
          <div className="result-section" ref={this.resultRef}>
          </div>
        </div>
      </div>
    );
  }
}
