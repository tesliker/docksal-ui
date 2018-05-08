// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
var cmd = require('node-cmd');

type Props = {};

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.listProjects= this.listProjects.bind(this);
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <button onClick={this.listProjects}>List projects</button>
        </div>
      </div>
    );
  }

  listProjects() {
    cmd.get(
        'fin project list',
        function(err, data, stderr){
          var stringObj = data.split(/ {2,}/g);
          var tableSize = 4;
          var tableObj = {};
          for (var i = 0; i < tableSize; i++) {
            var column = [];
            for (var n = i; n < stringObj.length; n+=tableSize - 1) {
              column.push(stringObj[n]);
            }
            var key = stringObj[i];
            tableObj[key] = column;
          }
          console.log(tableObj);
        }
    );

  }
}
