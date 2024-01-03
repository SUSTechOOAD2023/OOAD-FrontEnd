'use client'

import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Image from 'next/image';
import { EventObject, EventType, HomeworkEvent, HomeworkReviewEvent, NoticeEvent, ReceiveInvitationEvent, SendInvitationEvent, acceptInvitation, getEvent, rejectInvitation } from "./dashboardHandler";
import Link from "next/link";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from "@mui/icons-material/Close";

const newsHeight = 50

function distanceFromNow(date: Dayjs) {
  dayjs.extend(relativeTime)
  return date.fromNow()
}

function Homework({ event }: { event: EventObject }) {
  const content: HomeworkEvent = event.eventContent as HomeworkEvent

  return (
    <Box display="flex" alignItems="center" minHeight={newsHeight}>
      <Typography 
        component={Link} 
        href={`/dashboard/course/${content.classId}`}
        color="text.primary"
        sx={{
          textDecoration: "none"
        }}
      >
        <b>{content.courseName}</b>
      </Typography>
      <Typography color="text.primary">
        &nbsp;released&nbsp;homework&nbsp;
      </Typography>
      <Typography 
        component={Link} 
        href={`/dashboard/homework/${content.homeworkId}`}
        color="text.primary"
        sx={{
          textDecoration: "none"
        }}
      >
        <b>{content.homeworkTitle}</b>
      </Typography>
      <Typography flexGrow={1} />
      <Typography color="text.secondary">
        {distanceFromNow(dayjs(event.eventTime))}
      </Typography>
    </Box>
  )
}

function HomeworkReview({ event }: { event: EventObject }) {
  const content: HomeworkReviewEvent = event.eventContent as HomeworkReviewEvent

  return (
    <Box display="flex" alignItems="center" minHeight={newsHeight}>
      <Typography 
        component={Link} 
        href={`/dashboard/homework/${content.homeworkId}`}
        color="text.primary"
        sx={{
          textDecoration: "none"
        }}
      >
        <b>{content.homeworkName}</b>
      </Typography>
      <Typography color="text.primary">
        &nbsp;is&nbsp;graded&nbsp;
      </Typography>
      <Typography color="text.primary">
        ,&nbsp;your&nbsp;score&nbsp;is&nbsp;{content.submissionScore}
      </Typography>
      <Typography flexGrow={1} />
      <Typography color="text.secondary">
        {distanceFromNow(dayjs(event.eventTime))}
      </Typography>
    </Box>
  )
}

function NoticeRelease({ event }: { event: EventObject }) {
  const content: NoticeEvent = event.eventContent as NoticeEvent

  return (
    <Box display="flex" alignItems="center" minHeight={newsHeight}>
      <Typography 
        component={Link} 
        href={`/dashboard/course/${content.classId}`}
        color="text.primary"
        sx={{
          textDecoration: "none"
        }}
      >
        <b>{content.classShortName}</b>
      </Typography>
      <Typography color="text.primary">
        &nbsp;released&nbsp;notice&nbsp;<b>{content.noticeTitle}</b>
      </Typography>
      <Typography flexGrow={1} />
      <Typography color="text.secondary">
        {distanceFromNow(dayjs(event.eventTime))}
      </Typography>
    </Box>
  )
}

function InvitationReceive({ event, onDelete }: { event: EventObject, onDelete: () => void }) {
  const content: ReceiveInvitationEvent = event.eventContent as ReceiveInvitationEvent

  const handleAccept = () => {
    acceptInvitation(content.joinGroupInvitationId).then(ok => {
      if (ok) {
        onDelete()
      }
    })
  }

  const handleReject = () => {
    rejectInvitation(content.joinGroupInvitationId).then(ok => {
      if (ok) {
        onDelete()
      }
    })
  }

  return (
    <Box display="flex" alignItems="center" minHeight={newsHeight}>
      <Typography 
        component={Link} 
        href={`/dashboard/profile/${content.sendStudentId}`}
        color="text.primary"
        sx={{
          textDecoration: "none"
        }}
      >
        <b>{content.sendStudentName}</b>
      </Typography>
      <Typography color="text.primary">
        &nbsp;sent&nbsp;you&nbsp;an&nbsp;invitation&nbsp;to&nbsp;group&nbsp;
      </Typography>
      <Typography 
        component={Link} 
        href={`/dashboard/group/${content.groupId}`}
        color="text.primary"
        sx={{
          textDecoration: "none"
        }}
      >
        <b>{content.groupName}</b>
      </Typography>
      <IconButton size="small" color="primary" onClick={handleAccept}>
        <DoneIcon />
      </IconButton>
      <IconButton size="small" color="primary" onClick={handleReject}>
        <CloseIcon />
      </IconButton>
      <Typography flexGrow={1} />
      <Typography color="text.secondary">
        {distanceFromNow(dayjs(event.eventTime))}
      </Typography>
    </Box>
  )
}

function InvitationSend({ event }: { event: EventObject }) {
  const content: SendInvitationEvent = event.eventContent as SendInvitationEvent

  return (
    <Box display="flex" alignItems="center" minHeight={newsHeight}>
      <Typography 
        component={Link} 
        href={`/dashboard/profile/${content.receiveStudentId}`}
        color="text.primary"
        sx={{
          textDecoration: "none"
        }}
      >
        <b>{content.receiveStudentName}</b>
      </Typography>
      <Typography color="text.primary">
        &nbsp;accepted&nbsp;your&nbsp;invitation&nbsp;to&nbsp;
      </Typography>
      <Typography 
        component={Link} 
        href={`/dashboard/group/${content.groupId}`}
        color="text.primary"
        sx={{
          textDecoration: "none"
        }}
      >
        <b>{content.groupName}</b>
      </Typography>
      <Typography flexGrow={1} />
      <Typography color="text.secondary">
        {distanceFromNow(dayjs(event.eventTime))}
      </Typography>
    </Box>
  )
}

export default function DailyNew({ id }: { id: string }) {
  const [events, setEvents] = useState<EventObject[]>([])

  useEffect(() => {
    getEvent(id).then(events => setEvents(events))
  }, [id])

  const handleDelete = ((value: number) => {
    setEvents(events.filter((x, index) => index !== value))
  })

  return (<>  
      <Typography variant="h6" color="primary" paddingBottom={1.5}>
        What&apos;s new?
      </Typography>
      <Divider />
      <Stack divider={<Divider />}>
        {events.map((event, index) => {
          if (event.eventType.includes("homework")) {
            if (event.eventType.includes("released")) {
              return <Homework key={event.eventTime} event={event}/>
            } else {
              return <HomeworkReview key={event.eventTime} event={event}/>
            }
          } else if (event.eventType.includes("notice")) {
            return <NoticeRelease key={event.eventTime} event={event}/>
          } else if (event.eventType.includes("accepted")) {
            return <InvitationSend key={event.eventTime} event={event}/>
          } else {
            return <InvitationReceive 
              key={event.eventTime} 
              event={event}
              onDelete={() => handleDelete(index)}
            />
          }
        })}
      </Stack>
    </>
  )
}