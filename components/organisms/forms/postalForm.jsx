import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import ReactDOM from 'react-dom'
// https://github.com/insin/react-maskedinput
import MaskedInput from 'react-maskedinput'
// https://github.com/renato-bohler/redux-form-input-masks
import { createNumberMask, createTextMask } from 'redux-form-input-masks';

import { servicesActions } from '../../../modules/services'
import Button from '../../atoms/button'


const postal = value =>
  value && !/^([0-9]{2}-([0-9]){3})$/.test(value)
    ? 'Nieprawidłowy kod'
    : undefined

const normalizePostal00 = (value) => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')

    if (onlyNums.length <= 2) {
        return onlyNums
    }
    return onlyNums.slice(0, 3)
}

const normalizePostal000 = (value) => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')

    if (onlyNums.length <= 3) {
        return onlyNums
    }
    return onlyNums.slice(0, 3)
}


class PostalForm extends Component {
    constructor(props) {
        super(props)

        this.handleFocus = this.handleFocus.bind(this)
        this.handleTypingFirst = this.handleTypingFirst.bind(this)
        this.handleTypingSecond = this.handleTypingSecond.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.scrolling = false
        this.valuesEmpty = 'btn-disabled';
    }

    handleFocus(e) {
        const element = e.target
        element.select()
    }

    handleTypingFirst(e) {
        const currentValue = e.target.value
        const fullCode = `${currentValue}-${this.props.postalCode000}`
        const nextField = e.target.closest('.-postalCode').querySelector('.a-formInput.-second')

        // set hidden field value
        this.props.change('fullCode', fullCode)
      
        if (currentValue.length === 2) {
            if(nextField){
                nextField.focus()
            }
            // nextField.select()
        }
        //to blur out the submit button
        this.checkIfEmtpy(currentValue)

    }
    
    handleTypingSecond(e) {
        const currentValue = e.target.value
        const fullCode = `${this.props.postalCode00}-${currentValue}`
        
        // set hidden field value
        this.props.change('fullCode', fullCode)
        
        this.checkIfEmtpy(currentValue)
        
    }

    checkIfEmtpy(currentValue){

        var num = !isNaN(currentValue)

        if(currentValue.length > 0 && num){
            return this.valuesEmpty = false;
        }else{
            return this.valuesEmpty = 'btn-disabled';
        }

    }
    
    handleSubmit(e) {

        var target = e.currentTarget;
        var isHeader = target.classList.contains('-header'); 
        var firstInput, secondInput;

        if(target.tagName === 'INPUT' && isHeader === true){

            firstInput = target.parentNode.querySelector('.-first')
            secondInput = target.parentNode.querySelector('.-second')

        }else if(target.tagName === 'INPUT' && isHeader === false){


            return;

        }else{

            firstInput = e.target.querySelector('.-first')
            secondInput = e.target.querySelector('.-second')

        }
        // console.log(firstInput, secondInput, '-inputs');
        const { fullCode, actions, handleCallback } = this.props
        const correct = /^([0-9]{2}-([0-9]){3})$/.test(fullCode)
        const msgField = e.target.closest('.o-formular.-postalCode').querySelector('.m-formularMessage')

        //remove all error classes
        removeValidationClasses()
        
        e.preventDefault()
        
        if (correct) {
            actions.getServices(fullCode)
            this.scrolling = true
            
            if (handleCallback) handleCallback(e)
        } else {
            if (fullCode === '-') msgField.textContent = 'Podaj kod pocztowy'
            else {
                msgField.textContent = 'Nieprawidłowy kod'
                addValidationClasses();
            }
        }
        function removeValidationClasses(){

            msgField.classList.remove('inputfield-error')
            firstInput.classList.remove('inputfield-error');
            secondInput.classList.remove('inputfield-error');
            
        }
        function addValidationClasses(){
            msgField.classList.add('inputfield-error')
            firstInput.classList.add('inputfield-error');
            secondInput.classList.add('inputfield-error');
        }
    }

    componentDidUpdate() {
        if(this.scrolling && !this.props.error && !this.props.failed && !this.props.loading && !this.props.submitting  && this.props.handleSubmit) {
            this.scrolling = false
            this.props.handleSubmit();
        }
    }

    render() {
        const { zipCode, locationName, pristine, submitting, invalid, fullCode, error, loading, failed, disabled, inHeader } = this.props

        return (
            <form onSubmit={this.handleSubmit} className={`${disabled ? '-static' : ''}`}>
                <fieldset className={`m-formularGroup -postalCode ${disabled ? '-static' : ''}`}>
                    <Field
                        name="postalCode00"
                        component="input"
                        type="tel"
                        className="a-formInput -first"
                        placeholder="00"
                        maxLength="2"
                        size=""
                        autoComplete="off"
                        disabled={disabled}
                        normalize={normalizePostal00}
                        onFocus={this.handleFocus}
                        onChange={this.handleTypingFirst} autoFocus/>
                    <span className="m-formularGroup_separator">&nbsp;</span>
                    <Field
                        name="postalCode000"
                        maxLength="3"
                        component="input"
                        type="tel"
                        className={"a-formInput -second" + this.props.placed}
                        placeholder="000"
                        size=""
                        autoComplete="off"
                        disabled={disabled}
                        normalize={normalizePostal000}
                        onFocus={this.handleFocus}
                        onChange={this.handleTypingSecond} 
                        onBlur={this.handleSubmit}
                        />
                    <Field 
                        name="fullCode"
                        component="input"
                        validate={postal}
                        type="hidden" />
                </fieldset>
                {loading ? 
                <Button type="submit" className={this.valuesEmpty + ' _loading'}>
                    <img src="/static/img/icons/anim_spinner_small.gif" alt="" className="u-deco"/>
                </Button>
                :
                <Button type="submit" disabled={submitting || loading} className={this.valuesEmpty}>Potwierdź</Button>
                }
                {inHeader && locationName === 'bd' && !loading &&
                <p className="m-formularMessage">
                    <span className="u-text">Wpisz swój kod<br/> pocztowy</span>
                </p>}
                {loading ?
                <p className="m-formularMessage">...</p> :
                    failed || error ?
                    <p className="m-formularMessage">Wystąpił błąd. Spróbuj ponownie</p> :
                    locationName && locationName !== 'bd' ?
                    <p className="m-formularMessage">
                        {/* <strong>Warszawa</strong><span className="u-spacer"> - </span> */}
                        <span className="u-text">Usługę zrealizuje: </span><span className="u-text2">twoj_sklep {locationName}</span>
                    </p> :
                    <p className="m-formularMessage"></p>
                }
            </form>
        )
    }
}


const selector = formValueSelector('postalForm')

PostalForm = reduxForm({
    form: 'postalForm',
    destroyOnUnmount: false
})(PostalForm)

const mapStateToProps = state => {
    const postalCode00 = selector(state, 'postalCode00') || ''
    const postalCode000 = selector(state, 'postalCode000') || ''
    const locationName = state.services.locationName || ''
    const zipCode = state.services.zipCode || ''
    const loading = state.services.loading || false
    const failed = state.services.failed || false

    return {
        postalCode00: postalCode00,
        postalCode000: postalCode000,
        fullCode: `${postalCode00}-${postalCode000}`,
        locationName: locationName,
        zipCode: zipCode,
        loading: loading,
        failed: failed,
        initialValues: {
            postalCode00: zipCode ? zipCode.substring(0, 2) : '',
            postalCode000: zipCode ? zipCode.substring(3) : '',
            locationName: locationName
        }
    }
}

const mapDispatchToProps = dispatch => ({ 
    change: bindActionCreators(change, dispatch),
    actions: bindActionCreators(servicesActions, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(PostalForm)