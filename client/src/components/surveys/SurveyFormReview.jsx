import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields.js';
import * as actions from '../../actions';

import _ from 'lodash';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const renderFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your survey</h5>
      {renderFields}
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="btn-flat green right white-text"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values // is pulled as props to SurveyFormReview
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
