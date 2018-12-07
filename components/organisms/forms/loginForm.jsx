import React from 'react'
import { Field, reduxForm } from 'redux-form'
import FormGroupField from '../../organisms/formGroupField'
import FormMsg from '../../atoms/formMsg'
import Button from '../../atoms/button'
import FormField from '../../atoms/formField'
import FormLabel from '../../atoms/formLabel'
import FormGroup from '../../molecules/formGroup'
import FormInputGroup from '../../molecules/formInputGroup'
import FormLabelGroup from '../../molecules/formLabelGroup'
import isEmail from 'validator/lib/isEmail';


const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Pole jest wymagane'
    }
    else if (!isEmail(values.email)) {
        errors.email = 'To nie jest poprwny adres e-mail'
    }
    if (!values.password) {
        errors.password = 'Pole jest wymagane'
    }
    else if (values.password.length < 6) {
        errors.password = 'Hasło powinno mieć minimum 6 znaków'
    }
    return errors
}

const renderPasswordField = ({ input, label, type, meta: { asyncValidating, touched, error, ...rest } }) => {
    return (<FormGroup error={touched && !!error} className={asyncValidating ? 'async-validating' : ''}>
        <FormLabelGroup>
            <FormLabel>{label}</FormLabel>
            {/* <span className="a-formTxt"><a href="#">Nie pamiętam hasła</a></span> */}
        </FormLabelGroup>
        <FormInputGroup>
            <FormField {...input} type={type} placeholder={label} />
            {/* <button className="a-formFieldControl -passwordToggle"></button> */}
            {touched && !!error && <span><FormMsg>{error}</FormMsg></span>}
        </FormInputGroup>
    </FormGroup>)
}

const LoginForm = (props) => {
    const { handleSubmit, pristine, submitting, invalid } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name="email" type="text" component={FormGroupField} label="Adres e-mail*" />
            <Field name="password" type="password" component={renderPasswordField} label="Hasło*" />
            <Button disabled={invalid || pristine || submitting} type="submit" className="a-button" color="primary">Zaloguj się</Button>
        </form>
    )
}



export default reduxForm({
    form: 'loginForm', // a unique identifier for this form
    validate,
    //asyncValidate,
    //asyncBlurFields: ['email']
})(LoginForm)