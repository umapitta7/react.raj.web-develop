import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import CdsButton from 'forge-components/dist/components/Button/';

import {
  FontSize2,
  FontSize3
} from 'cds-tokens/dist/js/cds-variables';

// Overriding MUI root theme for input text fields
// !important rule probably not the best way to do this, but it works.
const SearchAutoComplete = withStyles({
  inputRoot: {
    '&[class*="MuiOutlinedInput-root"]': {
      fontFamily: 'Arial, Helvetica, "Helvetica Neue", Roboto, georgia, serif',
      fontSize: FontSize3,
      padding: '0',
      paddingRight: '0 !important',
      paddingLeft: '0 !important',
      height: '40px',
      width: '288px',
    },
  },
  option: {
    fontFamily: 'Arial, Helvetica, "Helvetica Neue", Roboto, georgia, serif',
    fontSize: FontSize2,
    // Hover
    '&[data-focus="true"]': {
      backgroundColor: '#f0f8ff',
      borderColor: 'transparent',
    },
    // Selected
    '&[aria-selected="true"]': {
      backgroundColor: '#f0f8ff',
      borderColor: 'transparent',
    },
  },
})(Autocomplete);

export default function SearchField({
  options,
  loading,
  getOptionSelected,
  getOptionLabel,
  onInputChange,
  charWidth,
  label,
  variant,
  value,
  handleSubmit,
}) {
  const { t } = useTranslation();
  /* eslint-disable react/jsx-props-no-spreading */

  return (
    <SearchAutoComplete
      id="free-solo"
      data-testid="autocomplete"
      style={{ width: parseInt(charWidth, 10) }}
      freeSolo
      includeInputInList
      options={options}
      loading={loading}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      onInputChange={onInputChange}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={label}
          variant={variant}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment>
                <CdsButton variant="primary" onClick={handleSubmit}>
                  {t('Find')}
                </CdsButton>
              </InputAdornment>
            ),
          }}
          aria-describedby="search-field-description"
        />
      )}
      renderOption={(option) => (
        <div>
          {option.locality}
          <br />
          {option.address}
        </div>
      )}
    />
  );
  /* eslint-enable react/jsx-props-no-spreading */
}

SearchField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  getOptionSelected: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  charWidth: PropTypes.number,
  label: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

SearchField.defaultProps = {
  loading: false,
  charWidth: 800,
  label: 'City, State or Zip',
  variant: 'outlined',
  value: '',
};
