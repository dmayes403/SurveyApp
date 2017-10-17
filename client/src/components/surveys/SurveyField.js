// SurveyField contains logic to render a single lable
// and text input.
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    // ^^ properties are automatically given through reactForm and through props added to Field element. This is the same as props.input.
    // meta property comes from redux errors. Nested destructoring. This pulls error, and touched off of the meta property,
    // which is pulled off of the props.
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }}/>
            {/* ^^ this is the same as doing onBlur={input.onBlur} onChange={input.onChange} etc */}
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
            {/* ^^ touched is a boolean, this is why this expression is evaluated */}
        </div>
    );
};