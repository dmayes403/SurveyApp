// SurveyField contains logic to render a single lable
// and text input.
import React from 'react';

export default ({ input, label }) => {
    // ^^ properties are automatically given through reactForm and through props added to Field element. This is the same as props.input
    return (
        <div>
            <label>{label}</label>
            <input {...input}/>
            {/* ^^ this is the same as doing onBlur={input.onBlur} onChange={input.onChange} etc */}
        </div>
    );
};