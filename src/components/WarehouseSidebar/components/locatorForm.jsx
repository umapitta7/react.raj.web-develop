import PropTypes from 'prop-types';
import React from 'react';

import { Grid, Row } from 'react-styled-flexboxgrid-v2';
import { string, object } from 'yup';
import agent from '../../../utils/agent';

import FilterOptions from './filterOptions';
import SearchField from './searchField';

// Radius, in meters, representing the confidence in the accuracy of the user’s location.
const confidence = '10000';

const getOptionSelected = (option, value) => option.address === value.address;

const getOptionLabel = (option) => {
  let label = '';
  if (option.address) {
    label = option.address.toString();
  }
  return label;
};

const illegalCharacterValidationSchema = object().shape({
  searchString: string().test(
    'xss test',
    'Search string includes illegal characters.  Such as ( ) * & | ! = < > ~', // Error message
    (searchString) => (!(searchString.search(/[()*&|!=<>~]/) >= 0))
  ),
});

const LocatorForm = ({
  charWidth,
  label,
  variant,
  location,
  searchForWarehouses,
  setFilter,
}) => {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState();
  const [userLocation, setUserLocation] = React.useState();

  // For filterOptions
  const [visibility, setVisibility] = React.useState(false);

  // Users location or search location description
  const [locationDescription, setLocationDescription] = React.useState('');

  if (!userLocation && location) {
    setUserLocation(`${location.latitude},${location.longitude},${confidence}`);
  }

  // Helper method uses a map to filter out duplicate suggestions from Bing.
  const uniqByProp = (prop) => (arr) => Array.from(
    arr
      .reduce(
        (acc, item) => (item && item[prop] && acc.set(item[prop], item), acc),
        new Map()
      )
      .values()
  );

  const autosuggest = async (q, ul) => {
    const results = await agent.autoSuggest(q, ul);

    const suggestions = results.resourceSets[0].resources[0].value
      .filter((obj) => !!obj?.address?.formattedAddress)
      .map((obj) => ({
        locality: obj.address.locality,
        address: obj.address.formattedAddress,
        postalCode: obj.address.postalCode,
      }));

    const uniqueByAddress = uniqByProp('address');
    const returnValue = uniqueByAddress(suggestions);
    return returnValue;
  };

  const onInputChange = async (event, newValue) => {
    if (newValue) {
      let validationResults;
      try {
        validationResults = await illegalCharacterValidationSchema.validate(
          {
            searchString: newValue,
          },
          { abortEarly: false }
        );
        if (validationResults) {
          setValue(newValue);
          if (!loading) setLoading(true);

          const results = await autosuggest(newValue, userLocation);
          setOptions(results);

          if (loading) setLoading(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setOptions([]);
      if (loading) setLoading(false);
    }
  };

  const getAddressLocation = async (q) => {
    const results = await agent.getLocation(q);
    const { resources } = results.resourceSets[0];
    const resource = resources.find((element) => element.confidence === 'High');
    return {
      latitude: resource.point.coordinates[0],
      longitude: resource.point.coordinates[1],
    };
  };

  const triggerSearchForWarehouses = async (options, value) => {
    // Get user selection
    const selectedOption = options.find((option) => option.address === value);
    if (selectedOption) {
      // So the selected option shows up in the search textbox
      setLocationDescription(selectedOption.address);
      searchForWarehouses({
        location: await getAddressLocation(selectedOption.address),
      });
    } else {
      try {
        const returnValue = await getAddressLocation(value);
        searchForWarehouses({ location: returnValue });
        // So the selected option shows up in the search textbox
        setLocationDescription(value);
      } catch (error) {
        // applicationStore.resetState();
        // navigate("/sl")
      }
    }
  };

  const handleSubmit = (event) => {
    if (loading) setLoading(false);
    if (value) {
      triggerSearchForWarehouses(options, value);
      setOptions([]); // reset suggestions
    }
    setVisibility(false);
    event.preventDefault();
  };

  return (
    <Grid style={{ width: '320px', paddingLeft: '0px', marginBottom: '16px' }}>
      <form id="formlocsearch" noValidate="novalidate">
        <Row
          style={{ width: '320px', marginLeft: '16px', marginBottom: '16px' }}
        >
          <SearchField
            options={options}
            loading={loading}
            getOptionSelected={getOptionSelected}
            getOptionLabel={getOptionLabel}
            onInputChange={onInputChange}
            charWidth={charWidth}
            label={label}
            variant={variant}
            value={locationDescription}
            handleSubmit={handleSubmit}
          />
        </Row>
        <Row style={{ width: '320px', marginLeft: '16px', paddingLeft: '4px' }}>
          <FilterOptions
            visibility={visibility}
            setVisibility={setVisibility}
            setFilter={setFilter}
          />
        </Row>
      </form>
    </Grid>
  );
};

export default LocatorForm;

LocatorForm.propTypes = {
  charWidth: PropTypes.number,
  label: PropTypes.string,
  variant: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  searchForWarehouses: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

LocatorForm.defaultProps = {
  charWidth: 288,
  label: 'City, State or Zip',
  variant: 'outlined',
};
