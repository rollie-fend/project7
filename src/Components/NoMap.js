import React from 'react';

class NoMap extends React.Component {
  state = {
    show: false,
    timeout: null
  }

  componentDidMount = () => {
    let timeout = window.setTimeout(this.showMessage, 1000);
    this.setState({timeout});
  }

  componentWillUnmount = () => {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState({show: true});
  }

  render = () => {
    return (
      <div>
        {this.state.show ? (<h1>Problem loading map. Try again later.</h1>) : (<h1>Loading map...</h1>)}
      </div>
    )
  }
}
export default NoMap;