import React from 'react';
import shortid from 'shortid';

export default class AdminView extends React.Component {

  constructor(props) {
    super(props);
    this.urls = {};
    let count = 0;
    while(window.localStorage.key(count)) {
      let key = window.localStorage.key(count++);
      if(shortid.isValid(key)) {
        this.urls[key] = window.localStorage.getItem(key);
      }
    }
  }

  render() {
    return (
      <div className="page">
        <table>
          <thead>
            <tr>
              <td>Short ID</td>
              <td>URL</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.urls).map(key => {
              return (
                <tr>
                  <td>{ key }</td>
                  <td>{ this.urls[key] }</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
