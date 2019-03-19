import React, { Component } from 'react';

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

class Contact extends Component {
  constructor(props) {
    super(props)
    this.txtCaptcha = React.createRef();

    this.state = {
      title: 'Contact Form',
      subtitle: "Large Group Vacation Rentals in the land called Hanalei", 
      canSubmit: false, 
      name: '',
      city: '',
      email: '',
      message: ''
    }

    this.drawCaptcha = this.drawCaptcha.bind(this)
    this.removeSpaces = this.removeSpaces.bind(this)
    this.check = this.check.bind(this)

  }
  componentDidMount() {
    if (this.txtCaptcha) {
      this.drawCaptcha();
    } else {
      return false;
    }
  }
  drawCaptcha = () => {
    var a = Math.ceil(Math.random() * 9) + '';
    var b = Math.ceil(Math.random() * 9) + '';
    var c = Math.ceil(Math.random() * 9) + '';
    var d = Math.ceil(Math.random() * 9) + '';
    var e = Math.ceil(Math.random() * 9) + '';
    var f = Math.ceil(Math.random() * 9) + '';
    var g = Math.ceil(Math.random() * 9) + '';
    var code = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
    this.txtCaptcha.value = code
  }
  removeSpaces = (string) => {
    return string.split(' ').join('');
  }
  check = (input) => {
    var cap = this.removeSpaces(this.txtCaptcha.value);
    console.log('input :',input);
    if (input.length === cap.length) {
      if (input !== cap) {
        this.clearCaptchaField()
      } else {
        // input is fine -- reset the error message
        this.setState({ 
            canSubmit: !this.state.canSubmit
        });
      }      
    }
  }
  
  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, city, email, message} = this.state
    return (
      <div className="contact">
          <h1 className="contact_title">{this.state.title}</h1>
          <div id="contact-area">
          <h5>
            I would love to hear from you!
          </h5>
          <h6>Please complete the form below, or email me directly: kristopher (at) kmskelton .com</h6>
          <form onSubmit={this.handleSubmit}>
          <input
            type="hidden"            
            id="contact_form" 
            value="contact_form"
            name="contact_form" 
            method="POST" 
            noValidate
          />

            <p className="u-visually-hidden">
              <label className="u-visually-hidden">Don't complete this if you're human:
                <input name="bot-field" /> </label>
            </p>
            <label htmlFor="Name">Name:</label>
            <input type="text" name="Name" id="Name" value={name} onChange={this.handleChange} />
      
            <label htmlFor="City">City:</label>
            <input type="text" name="City" id="City"  value={city} onChange={this.handleChange} />
      
            <label htmlFor="Email">Email address:</label>
            <input type="text" name="Email" id="Email" value={email} onChange={this.handleChange} />
      
            <input 
              type="text" 
              readOnly="readonly" 
              id="txtCaptcha"
              ref={(input) => {this.txtCaptcha = input}}
            />
            <input type="button" id="btnrefresh" value="Refresh Numbers" onClick={this.drawCaptcha} />
            <input type="text" 
              placeholder="Enter numbers as shown above to prove you're not a robot" 
              onInput={(e) => {this.check(e.target.value)}} 
              id="txtInput" 
            />
      
            <label htmlFor="Message">Message:</label>
            <br />
            <textarea 
              name="Message" 
              id="Message" 
              rows="10" 
              value={message}
              onChange={this.handleChange}
            ></textarea>
            {this.state.canSubmit && (
              <input 
              type="submit" 
              name="submit" 
              value="Submit" 
              className="submit-button" />
              )
            }
          </form>    
        </div>
      </div>
    )
  }
}
export default Contact