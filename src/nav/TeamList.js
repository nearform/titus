import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/PersonAdd';
import Badge from '@material-ui/core/Badge';
import { teamMembersData } from '../mock/menuData';

const styles = {
  root: {},
  smallAvatar: {
    width: 32,
    height: 32,
    fontSize: 16
  }
};

/*todo:
 - load team from data model
 - add (remove?) team members
 - events when clicking team
*/
class TeamList extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ListItem button>
          <ListItemIcon>
            <Avatar className={classes.smallAvatar}>
              <AddIcon />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Add Team Member" />
        </ListItem>

        {teamMembersData.map(member => (
          <ListItem key={member.id} button>
            <ListItemIcon>
              {member.notifications > 0 ? (
                <Badge badgeContent={member.notifications} color="secondary">
                  <Avatar className={classes.smallAvatar}>
                    {member.initials}
                  </Avatar>
                </Badge>
              ) : (
                <Avatar className={classes.smallAvatar}>
                  {member.initials}
                </Avatar>
              )}
            </ListItemIcon>
            <ListItemText primary={member.name} />
          </ListItem>
        ))}
      </div>
    );
  }
}

TeamList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TeamList);
