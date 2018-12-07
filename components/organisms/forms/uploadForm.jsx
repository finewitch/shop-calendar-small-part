import React from 'react'
import { Field, reduxForm } from 'redux-form'
import FormGroupField from '../../organisms/formGroupField'
import FormMsg from '../../atoms/formMsg'
import FormField from '../../atoms/formField'
import FormLabel from '../../atoms/formLabel'
import FormGroup from '../../molecules/formGroup'
import FormInputGroup from '../../molecules/formInputGroup'
import FormLabelGroup from '../../molecules/formLabelGroup'
import isEmail from 'validator/lib/isEmail';

import Dropzone from 'react-dropzone'


// https://github.com/BBB/dropzone-redux-form-example/blob/master/src/App.js
// https://react-dropzone.js.org/

let dropzoneRef

const renderDropzoneInput = (field) => {
    return (
        <div className={`m-formGroup -dropzone ${field.meta.error ? '-warned' : ''}`}>
            <Dropzone
                className="o-formDropzone"
                name={field.name}
                ref={(node) => { dropzoneRef = node; }}
                onDrop={(filesToUpload, e) => {
                    field.input.onChange(filesToUpload)
                    field.handleChange(filesToUpload[0].preview)
                }}
            />
            {field.meta.error && <FormMsg>{field.meta.error}</FormMsg>}
        </div>
    );
}

const validate = values => {
    const errors = {}
    if (!values.image) {
        errors.image = 'Zdjęcie jest wymagane'
    }
    if (!values.title) {
        errors.title = 'Pole jest wymagane'
    }
    return errors
}

class UploadForm extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        dropzoneRef.open()
    }

    render() {
        const { handleSubmit, handleChange, pristine, submitting, invalid } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <Field name="image" type="file" handleChange={handleChange} component={renderDropzoneInput} />
                <Field name="title" type="text" component={FormGroupField} placeholder="Wpisz nazwę inspiracji" value="Twoja inspiracja #1" />
                <Field name="description" type="textarea" component={FormGroupField} placeholder="Napisz co Ci się podoba w tej inspiracji…" />
                <button disabled={invalid || pristine || submitting} type="submit" className="a-formBtn a-btn -primary -lg">Dodaj inspirację</button>
            </form>
        )
    }
}


export default reduxForm({
    form: 'uploadForm', // a unique identifier for this form
    validate,
    keepDirtyOnReinitialize: true,
    enableReinitialize: true
    //asyncValidate,
    //asyncBlurFields: ['email']
})(UploadForm)