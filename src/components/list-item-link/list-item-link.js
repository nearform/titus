import React from 'react';
import { Link } from '@reach/router';

import ListItem from '@material-ui/core/ListItem';

// for some reason ListItem won't accept a class as the component prop
const LinkAsFn = props => <Link {...props} />;

const ListItemLink = props => (
  <ListItem {...props} button component={LinkAsFn} />
);

export default ListItemLink;
