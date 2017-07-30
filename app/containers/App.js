import React, { Component, PropTypes } from 'react';
import { Route } from 'react-router-dom'
import { Window, TitleBar } from 'react-desktop/windows'

export default class App extends Component {
  render() {
    return (
        <Window
            theme='light'
            chrome
            height='750px'
            width='950px'
            padding='12px'
            horizontalAlignment='center'>
            <TitleBar
                controls
                title="Mijengo Landlord App"
            />
            {this.props.children}
        </Window>
    );
  }
}

