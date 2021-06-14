/**
 * Validation configuration to handle dynamic form validation
 */
const getValidationConfig = (selectedCountry) => {
  const regexConfig = {
    zipCode: '12345',
  };

  return {
    zipCode: {
      pattern: {
        value: new RegExp(regexConfig.zip),
        message: 'Please enter Valid Zip code',
      },
    },
  };
};

export default getValidationConfig;
