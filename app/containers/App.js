import React, { Component, PropTypes } from 'react';
import { Window, TitleBar } from 'react-desktop/windows'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

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

