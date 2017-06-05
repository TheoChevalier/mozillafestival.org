import validator from 'validator';

const Validator = {
  emptyValueValidator(errorMessage = `This field cannot be left blank.`) {
    return {
      error: errorMessage,
      validate: function(value) {
        return !value;
      }
    };
  },
  maxWordsValidator(maxWordsLength = 120, errorMessage = `You have typed more words than allowed.`) {
    return {
      error: errorMessage,
      validate: function(value) {
        if (!value) return false;

        let wordLength = value.split(` `).length;
        this.error = `${wordLength}/${maxWordsLength}`;

        return wordLength > maxWordsLength;
      }
    };
  },
  emailValidator(errorMessage = `"Not an valid email.`) {
    return {
      error: errorMessage,
      validate: function(value) {
        return !value || !validator.isEmail(value);
      }
    };
  }
};

export default Validator;
