import React from 'react';
import { Link } from '@reach/router';

import ListItem from '@material-ui/core/ListItem';

const ListItemLink = props => <ListItem {...props} button component={Link} />;

export default ListItemLink;
