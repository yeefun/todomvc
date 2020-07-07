import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

function FilterableItem({to, name}) {
  return (
    <li>
      <NavLink to={to} exact activeClassName="selected">
        {name}
      </NavLink>
    </li>
  );
}

FilterableItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FilterableItem;
