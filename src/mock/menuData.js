import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddIcon from '@material-ui/icons/PersonAdd';
import TeamIcon from '@material-ui/icons/People';
import DocumentsIcon from '@material-ui/icons/Folder';
import MessageIcon from '@material-ui/icons/Message';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssumptionsIcon from '@material-ui/icons/Grain';
import ScheduleIcon from '@material-ui/icons/List';

import Badge from '@material-ui/core/Badge';

import { ProfitAndLossIcon } from '../assets/navIcons';

export const mainMenuItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Concept" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ProfitAndLossIcon />
      </ListItemIcon>
      <ListItemText primary="Profit and Loss" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssumptionsIcon />
      </ListItemIcon>
      <ListItemText primary="Assumptions" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="Schedule" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Badge badgeContent={4} color="secondary">
          <MessageIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Badge badgeContent={2} color="primary">
          <AlarmIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Notifications" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <TeamIcon />
      </ListItemIcon>
      <ListItemText primary="Team" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DocumentsIcon />
      </ListItemIcon>
      <ListItemText primary="Documents" />
    </ListItem>
  </div>
);

export const teamMembers = (
  <div color="primary">
    <ListItem button>
      <ListItemIcon>
        <Avatar>
          <AddIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary="Add Team Member" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Avatar>CW</Avatar>
      </ListItemIcon>
      <ListItemText primary="Chris Wheatly" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Avatar>MR</Avatar>
      </ListItemIcon>
      <ListItemText primary="Matt Robinson" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Avatar>CF</Avatar>
      </ListItemIcon>
      <ListItemText primary="Cian Foley" />
    </ListItem>
  </div>
);
