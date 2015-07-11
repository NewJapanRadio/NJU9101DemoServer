var React = require('react');
var WebSocket = require('./ws.js');
var ReactBootstrap = require('react-bootstrap');
var GoogleLineChart = require('./chart_wrapper.js');
var Slider = require('react-slick');

var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
var Jumbotron = ReactBootstrap.Jumbotron;
var Glyphicon = ReactBootstrap.Glyphicon;

var _Jumbotron = React.createClass({
  render: function() {
    return(
      <Jumbotron>
        <h1>{this.props.title}</h1>
        <p><Glyphicon glyph='leaf' /> {this.props.text} <Glyphicon glyph='leaf'/></p>
        <logo>n</logo>
      </Jumbotron>
    );
  }
});

var _Button = React.createClass({
  getInitialState: function() {
    return { checked: true };
  },
  render: function() {
    return (
      <Button onClick={this.handleClick} bsStyle={this.state.checked ? "primary" : "" } bsSize="large" block>
        {this.state.checked ? <Glyphicon glyph='pause'/> : <Glyphicon glyph='play'/> }
      </Button>
    );
  },
  handleClick: function() {
    this.setState({ checked: !this.state.checked });
    if (this.state.checked){
      WebSocket.disconnect();
    }
    else {
      WebSocket.connect();
    }
  }
});

var _Switch = React.createClass({
  getInitialState: function() {
    return { checked: true };
  },
  render: function(){
    return (
      <input type="checkbox" name={this.props.name} />
    );
  },
  componentDidMount: function() {
    bootstrapSwitch({
      state: this.state.checked,
      onColor: this.props.onColor,
      offColor: this.props.offColor,
      handleWidth: this.props.handleWidth,
      onSwitchChange: this.handleChange
    });
  },
  handleChange: function(_event, _state) {
    if (_state){
      WebSocket.connect();
    }
    else {
      WebSocket.disconnect();
    }
  }
});

var _Panel = React.createClass({
  render: function() {
    return(
      <Panel header={this.props.title} bsStyle="primary" id={this.props.id}>
        <center>
          <div id="chart" className="chart"></div>
          <div id="button" className="button"></div>
        </center>
      </Panel>
    );
  }
});

var _Slider = React.createClass({
  render: function () {
    var settings = {
      autoplay: true,
      centerMode: true,
      className: "slide",
      dots: true,
      draggable: false,
      fade: true,
      infinite: true,
      lazyLoad: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      speed: 1000
    };
    return (
      <Slider {...settings}>
        <div className="slide-item">
            <center>
                <img className="img-responsive" src="./assets/about_demo1.png"/>
                <div className="alert alert-success" role="alert">Control NJU9101 via I<sup>2</sup>C</div>
            </center>
        </div>
        <div className="slide-item">
            <center>
                <img className="img-responsive" src="./assets/about_demo2.png"/>
                <div className="alert alert-success" role="alert">Connect to <i className="fa fa-android"/><i className="fa fa-mobile"/> via Bluetooth Low Energy</div>
            </center>
        </div>
        <div className="slide-item">
            <center>
                <img className="img-responsive" src="./assets/about_demo3.png"/>
                <div className="alert alert-success" role="alert">Publish sensor data read from NJU9101 to MQTT Broker using MQTT protocol</div>
            </center>
        </div>
        <div className="slide-item">
            <center>
                <img className="img-responsive" src="./assets/about_demo4.png"/>
                <div className="alert alert-success" role="alert">Subscribe the sensor data by web application on Heroku</div>
            </center>
        </div>
        <div className="slide-item">
            <center>
                <img className="img-responsive" src="./assets/about_demo5.png"/>
                <div className="alert alert-success" role="alert">Browse the visualized sensor data</div>
            </center>
        </div>
      </Slider>
    );
  }
});

module.exports.Jumbotron = _Jumbotron;
module.exports.Button = _Button;
module.exports.Switch = _Switch;
module.exports.Panel = _Panel;
module.exports.Chart = GoogleLineChart;
module.exports.Slider = _Slider;
