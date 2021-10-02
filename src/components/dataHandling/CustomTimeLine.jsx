import { Ballot } from '@mui/icons-material';
import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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
