import { Ballot } from '@material-ui/icons';
import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: 'var(--theme-palette-secondary-main)',
  },
};

export default function CustomTimeLine({ items }) {
  const classes = useClasses(styles);

  return (
    <Timeline align="left">
      {items.map((item, index) => (
        <TimelineItem key={`history-${index}`}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {item.date}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <Ballot />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6">
                {item.title}
              </Typography>
              <Typography>{item.text}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
