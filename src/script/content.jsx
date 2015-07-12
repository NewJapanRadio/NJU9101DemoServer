var React = require('react');
var Components = require('./components.jsx')

var Jumbotron = Components.Jumbotron;
var Panel = Components.Panel;
var Switch = Components.Switch;
var Button = Components.Button;
var Chart = Components.Chart;
var Slider = Components.Slider;

var _Content = React.createClass({
  render: function() {
    return(
      <div>
        <Jumbotron title="NJU9101" text='Low Power Analog Front End IC' />
        <Panel title="Gas Sensor Demo" id="panel" />
        <div className="page-header">
          <h1>About this Demonstration</h1>
        </div>
        <Slider />
      </div>
    );
  },
  componentDidMount: function(){
    React.render(<Chart/>, document.getElementById("chart"));
    React.render(<Button/>, document.getElementById("button"));
  }
});

module.exports = _Content;

