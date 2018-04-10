import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField.jsx';
import validateEmails from '../../utils/validateEmails.js';

import _ from 'lodash';

const FIELDS = [
  { name: 'title', label: 'Survey Title' },
  { name: 'subject', label: 'Subject Line' },
  { name: 'body', label: 'Email body' },
  { name: 'emails', label: 'Recipient List' }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ name, label }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="btn-flat red left white-text">
            CANCEL
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  _.map(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'you must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
