import React from 'react'
import PropTypes from 'prop-types'

/**
 * form input 
 * types: email, password, text
 */

// var ta;
var modal;

class FormField extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      value: this.props.val
    }
  }

  componentDidMount() {
    // ta = document.querySelector('textarea.a-formField');
    // modal = document.querySelector('.o-modal');
  }

  handleInput() {
    // ta.style.height = 'auto';
    // ta.style.height = ta.scrollHeight + 'px';
    // ta.scrollTop = ta.scrollHeight;
    // // modal.scrollTo(0,(ta.scrollTop + ta.scrollHeight));
  }
  showTooltip(e){
    console.log(e.currentTarget);
    var nextsibling = e.currentTarget.nextSibling
    nextsibling.classList.add('active-tooltip')
  }
  hideTooltip(e){
    var nextsibling = e.currentTarget.nextSibling
    nextsibling.classList.remove('active-tooltip')
  }

  render() {
    const { type, input, name, options, informed, id, value, extraFeature, ...rest } = this.props

    let fieldClass = 'a-formInput'

    if (informed) {
      fieldClass += ' -informed'
    }
    // console.log(actionType);


    if (type === "textarea") {
      return <textarea className={fieldClass} {...rest} />
    } else if (type === "checkbox") {
      return <input className={fieldClass} type={type} name={name} id={name} {...rest} />
    } else if (type === "radio") {
      return <input className={fieldClass} type={type} name={name} id={id} value={value} {...rest} />
    } else {

      if (extraFeature === 'tooltip'){

          return (

            <div>
              <input onMouseLeave = {(e)=> this.hideTooltip(e)} onMouseEnter={(e) => this.showTooltip(e)} className={fieldClass} type={type} name={name} value={value} {...rest} />
            <span className="tooltip">Na tym etapie nie możesz zmienić swojego kodu pocztowego, ponieważ na jego podstawie przypisany został sklep, który zrealizuje Twoje zamówienie</span>
            </div>

          )

        }else{

          return <input className={fieldClass} type={type} name={name} value={value} {...rest} />

        }
    }
  }

}


FormField.propTypes = {
  type: PropTypes.oneOf([
    'text', 'email', 'checkbox', 'radio', 'textarea'
  ]),
  informed: PropTypes.bool
}

FormField.defaultProps = {
  type: 'text'
}


export default FormField