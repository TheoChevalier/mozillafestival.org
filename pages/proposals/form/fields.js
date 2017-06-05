import validator from './validator';

// *** IMPORTANT ***
//
// make sure all keys are all lowercase and contain no symbols or spaces
// reference: https://www.npmjs.com/package/google-spreadsheet#row-based-api-limitations
//
// **********************************************

var createPartOneFields = function(stringSource) {
  const EMPTY_VALUE_ERROR = stringSource.form_validation_errors.empty_value;
  const EMAIL_INVALID_ERROR = stringSource.form_validation_errors.email_invalid;

  return {
    'firstname': {
      type: `text`,
      label: stringSource.form_field_labels.firstname,
      labelClassname: `required`,
      fieldClassname: `form-control`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR)
      ]
    },
    'surname': {
      type: `text`,
      label: stringSource.form_field_labels.surname,
      labelClassname: `required`,
      fieldClassname: `form-control`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR)
      ]
    },
    'email': {
      type: `text`,
      label: stringSource.form_field_labels.email,
      placeholder: `hello@example.com`,
      labelClassname: `required`,
      fieldClassname: `form-control`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR),
        validator.emailValidator(EMAIL_INVALID_ERROR)
      ]
    },
    'organisation': {
      type: `text`,
      label: stringSource.form_field_labels.organisation,
      fieldClassname: `form-control`,
      validator: []
    },
    'twitterhandle': {
      type: `text`,
      label: stringSource.form_field_labels.twitterhandle,
      placeholder: `@twitterhandle`,
      fieldClassname: `form-control`
    },
    'githubhandle': {
      type: `text`,
      label: stringSource.form_field_labels.githubhandle,
      placeholder: `@githubhandle`,
      fieldClassname: `form-control`
    },
    'otherfacilitators': {
      type: `text`,
      label: stringSource.form_field_labels.otherfacilitators,
      placeholder: `Firstname Surname`,
      fieldClassname: `form-control`,
      multiplicity: 1,
      addLabel: stringSource.form_field_controls.add_another
    }
  };
};

// let partOneFields = {
//   'firstname': {
//     type: `text`,
//     label: `First name`,
//     labelClassname: `required`,
//     fieldClassname: `form-control`,
//     validator: [
//       validator.emptyValueValidator()
//     ]
//   },
//   'surname': {
//     type: `text`,
//     label: `Surname`,
//     labelClassname: `required`,
//     fieldClassname: `form-control`,
//     validator: [
//       validator.emptyValueValidator()
//     ]
//   },
//   'email': {
//     type: `text`,
//     label: `Email address`,
//     placeholder: `hello@example.com`,
//     labelClassname: `required`,
//     fieldClassname: `form-control`,
//     validator: [
//       validator.emptyValueValidator(),
//       validator.emailValidator()
//     ]
//   },
//   'organisation': {
//     type: `text`,
//     label: `Organisation`,
//     fieldClassname: `form-control`,
//     validator: []
//   },
//   'twitterhandle': {
//     type: `text`,
//     label: `Twitter handle`,
//     placeholder: `@twitterhandle`,
//     fieldClassname: `form-control`
//   },
//   'githubhandle': {
//     type: `text`,
//     label: `GitHub handle`,
//     placeholder: `@githubhandle`,
//     fieldClassname: `form-control`
//   },
//   'otherfacilitators': {
//     type: `text`,
//     label: `Additional facilitators for your session`,
//     placeholder: `Firstname Surname`,
//     fieldClassname: `form-control`,
//     multiplicity: 1,
//     addLabel: `+ Add another`
//   }
// };

var createPartTwoFields = function(stringSource) {
  const EMPTY_VALUE_ERROR = stringSource.form_validation_errors.empty_value;

  return {
    'space': {
      type: `choiceGroup`,
      label: stringSource.form_field_labels.space,
      options: [
        `Decentralization`,
        `Digital Inclusion`,
        `Open Innovation`,
        `Privacy and Security`,
        `Web Literacy`,
        `Youth Zone`,
      ],
      labelClassname: `required`,
      fieldClassname: `form-control choice-group`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR)
      ]
    },
    'secondaryspace': {
      type: `choiceGroup`,
      label: stringSource.form_field_labels.secondaryspace,
      options: [
        `Decentralization`,
        `Digital Inclusion`,
        `Open Innovation`,
        `Privacy and Security`,
        `Web Literacy`,
        `Youth Zone`,
        `None`
      ],
      colCount: 1,
      fieldClassname: `form-control choice-group`
    }
  };
};


// let partTwoFields = {
//   'space': {
//     type: `choiceGroup`,
//     label: `What space do feel your session will best contribute to?`,
//     options: [
//       `Decentralization`,
//       `Digital Inclusion`,
//       `Open Innovation`,
//       `Privacy and Security`,
//       `Web Literacy`,
//       `Youth Zone`,
//     ],
//     labelClassname: `required`,
//     fieldClassname: `form-control choice-group`,
//     validator: [
//       validator.emptyValueValidator()
//     ]
//   },
//   'secondaryspace': {
//     type: `choiceGroup`,
//     label: `Is there an alternate space your session could contribute to?`,
//     options: [
//       `Decentralization`,
//       `Digital Inclusion`,
//       `Open Innovation`,
//       `Privacy and Security`,
//       `Web Literacy`,
//       `Youth Zone`,
//       `None`
//     ],
//     colCount: 1,
//     fieldClassname: `form-control choice-group`,
//   }
// };

var createPartThreeFields = function(stringSource) {
  const EMPTY_VALUE_ERROR = stringSource.form_validation_errors.empty_value;
  const MAX_WORD_REACHED_ERROR = stringSource.form_validation_errors.max_word_reached;

  return {
    'name': {
      type: `text`,
      label: stringSource.form_field_labels.name,
      labelClassname: `required`,
      fieldClassname: `form-control`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR)
      ]
    },
    'description': {
      type: `textarea`,
      label: stringSource.form_field_labels.description,
      labelClassname: `required word-length-restriction max-120-words`,
      fieldClassname: `form-control`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR),
        validator.maxWordsValidator(120, MAX_WORD_REACHED_ERROR)
      ]
    },
    'outcome': {
      type: `textarea`,
      label: stringSource.form_field_labels.outcome,
      labelClassname: `required word-length-restriction max-120-words`,
      fieldClassname: `form-control`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR),
        validator.maxWordsValidator(120, MAX_WORD_REACHED_ERROR)
      ]
    },
    'afterfestival': {
      type: `textarea`,
      label: stringSource.form_field_labels.afterfestival,
      labelClassname: `required word-length-restriction max-120-words`,
      fieldClassname: `form-control`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR),
        validator.maxWordsValidator(120, MAX_WORD_REACHED_ERROR)
      ]
    },
    'timeneeded': {
      type: `choiceGroup`,
      label: stringSource.form_field_labels.timeneeded,
      options: [
        `Less than 60 mins`,
        `60 mins`,
        `90 mins`,
        `All weekend, as an installation, exhibit or drop-in session`
      ],
      labelClassname: `required`,
      fieldClassname: `form-control choice-group`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR)
      ]
    },
    'numsofparticipants': {
      type: `textarea`,
      label: stringSource.form_field_labels.numsofparticipants,
      labelClassname: `required word-length-restriction max-120-words`,
      fieldClassname: `form-control`,
      validator: [
        validator.emptyValueValidator(EMPTY_VALUE_ERROR),
        validator.maxWordsValidator(120, MAX_WORD_REACHED_ERROR)
      ]
    },
    'additionallanguage': {
      type: `choiceGroup`,
      label: stringSource.form_field_labels.additionallanguage,
      options: [
        `Spanish`,
        `German`,
        `French`,
        `Other`
      ],
      fieldClassname: `form-control choice-group`,
      validator: []
    },
    'additionallanguageother': {
      type: `text`,
      labelClassname: `required`,
      fieldClassname: `form-control`,
      controller: {
        name: `additionallanguage`,
        value: `Other`
      }
    }
  };
};

// let partThreeFields = {
//   'name': {
//     type: `text`,
//     label: `Session name`,
//     labelClassname: `required`,
//     fieldClassname: `form-control`,
//     validator: [
//       validator.emptyValueValidator()
//     ]
//   },
//   'description': {
//     type: `textarea`,
//     label: `What will happen in your session?`,
//     labelClassname: `required word-length-restriction max-120-words`,
//     fieldClassname: `form-control`,
//     validator: [
//       validator.emptyValueValidator(),
//       validator.maxWordsValidator(120)
//     ]
//   },
//   'outcome': {
//     type: `textarea`,
//     label: `What is the goal or outcome of your session?`,
//     labelClassname: `required word-length-restriction max-120-words`,
//     fieldClassname: `form-control`,
//     validator: [
//       validator.emptyValueValidator(),
//       validator.maxWordsValidator(120)
//     ]
//   },
//   'afterfestival': {
//     type: `textarea`,
//     label: `After the festival, how will you and your participants take the learning and activities forward?`,
//     labelClassname: `required word-length-restriction max-120-words`,
//     fieldClassname: `form-control`,
//     validator: [
//       validator.emptyValueValidator(),
//       validator.maxWordsValidator(120)
//     ]
//   },
//   'timeneeded': {
//     type: `choiceGroup`,
//     label: `How much time you will need?`,
//     options: [
//       `Less than 60 mins`,
//       `60 mins`,
//       `90 mins`,
//       `All weekend, as an installation, exhibit or drop-in session`
//     ],
//     labelClassname: `required`,
//     fieldClassname: `form-control choice-group`,
//     validator: [
//       validator.emptyValueValidator()
//     ]
//   },
//   'numsofparticipants': {
//     type: `textarea`,
//     label: `How will you deal with varying numbers of participants in your session? What if 30 participants attend? What if there are 3?`,
//     labelClassname: `required word-length-restriction max-120-words`,
//     fieldClassname: `form-control`,
//     validator: [
//       validator.emptyValueValidator(),
//       validator.maxWordsValidator(120)
//     ]
//   },
//   'additionallanguage': {
//     type: `choiceGroup`,
//     label: `Would you like to deliver this session bilingually in one of the following languages?`,
//     options: [
//       `Spanish`,
//       `German`,
//       `French`,
//       `Other`
//     ],
//     fieldClassname: `form-control choice-group`,
//     validator: []
//   },
//   'additionallanguageother': {
//     type: `text`,
//     labelClassname: `required`,
//     fieldClassname: `form-control`,
//     controller: {
//       name: `additionallanguage`,
//       value: `Other`
//     }
//   }
// };

var createPartFourFields = function(stringSource) {
  const EMPTY_VALUE_ERROR = stringSource.form_validation_errors.empty_value;

  return {
    'travelstipend': {
      type: `choiceGroup`,
      label: stringSource.form_field_labels.travelstipend,
      options: [
        stringSource.form_field_options.stipendnotrequired,
        stringSource.form_field_options.stipendrequired
      ],
      labelClassname: `required`,
      fieldClassname: `form-control choice-group`,
      colCount: 1,
      validator: [
        validator.emptyValueValidator()
      ]
    }
  };
};

// let partFourFields = {
//   'travelstipend': {
//     type: `choiceGroup`,
//     label: `Do you require a travel stipend?`,
//     options: [
//       LABEL_STIPEND_NOT_REQUIRED,
//       LABEL_STIPEND_REQUIRED
//     ],
//     labelClassname: `required`,
//     fieldClassname: `form-control choice-group`,
//     colCount: 1,
//     validator: [
//       validator.emptyValueValidator()
//     ]
//   }
// };

var createPartFiveFields = function(stringSource) {
  const MAX_WORD_REACHED_ERROR = stringSource.form_validation_errors.max_word_reached;

  return {
    'needs': {
      type: `textarea`,
      label: stringSource.form_field_labels.needs,
      labelClassname: `word-length-restriction max-120-words`,
      fieldClassname: `form-control`,
      validator: [
        validator.maxWordsValidator(120, MAX_WORD_REACHED_ERROR)
      ]
    }
  };
};

// let partFiveFields = {
//   'needs': {
//     type: `textarea`,
//     label: `If your session requires additional materials or electronic equipment, please outline your needs.`,
//     labelClassname: `word-length-restriction max-120-words`,
//     fieldClassname: `form-control`,
//     validator: [
//       validator.maxWordsValidator(120)
//     ]
//   }
// };

module.exports = {
  // partOne: partOneFields,
  // partTwo: partTwoFields,
  // partThree: partThreeFields,
  // partFour: partFourFields,
  // partFive: partFiveFields,
  createPartOneFields: createPartOneFields,
  createPartTwoFields: createPartTwoFields,
  createPartThreeFields: createPartThreeFields,
  createPartFourFields: createPartFourFields,
  createPartFiveFields: createPartFiveFields
};
