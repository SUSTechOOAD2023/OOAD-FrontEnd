'use client'

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar, LocalizationProvider, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { DeadlineInfo, getDeadline } from "./dashboardHandler";
import Link from "next/link";

const now = dayjs()

function ServerDay(props: PickersDayProps<Dayjs> & { notesOnDays?: DeadlineInfo[] }) {
  const { notesOnDays = [], day, outsideCurrentMonth, ...other } = props;

  const isOutside = props.outsideCurrentMonth 
  const numOfDays = notesOnDays.filter(x => x.homeworkDdl.date() === props.day.date()).length

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={!isOutside && numOfDays > 0 ? numOfDays : undefined}
      color="secondary"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DeadlineCalendar({ id }: { id: string }) {
  const [date, setDate] = useState<Dayjs | null>(now)
  const [deadline, setDeadline] = useState<DeadlineInfo[]>([])
  const notesOnDays = deadline.filter(homework => homework.homeworkDdl.isSame(date, "month"))

  useEffect(() => {
    if (id) {
      getDeadline(id).then(all => setDeadline(all.map(homework => ({
        ...homework, 
        homeworkDdl: dayjs(homework.homeworkDdl)
      }))))
    }
  }, [id])

  return (
    <>  
      <Typography variant="h6" color="primary" marginLeft={3}>
        Deadline
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
        <DateCalendar 
          minDate={now}
          value={date}
          onChange={(value) => setDate(value)}
          slots={{
            day: ServerDay
          }}
          slotProps={{
            day: {
              notesOnDays
            } as any
          }}
          sx={{
            m: 0, 
            alignSelf: "center" 
          }}
        />
      </LocalizationProvider>
      {deadline.filter(x => x.homeworkDdl.isSame(date, "day")).length > 0 && <Divider />}
      <Stack
        divider={<Divider />}
      >
        {deadline.map((value => {
          if (value.homeworkDdl.isSame(date, "day")) {
            return (
              <Box 
                key={value.homeworkId} 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between"
                height={40}
              >
                <Typography 
                  component={Link} 
                  href={`/dashboard/homework/${value.homeworkId}`}
                  color="text.primary"
                  sx={{
                    textDecoration: "none"
                  }}
                >
                  {value.homeworkTitle}
                </Typography>
                <Typography 
                  component={Link} 
                  href={`/dashboard/course/${value.classId}`}
                  color="text.secondary"
                  sx={{
                    textDecoration: "none"
                  }}
                >
                  {value.courseName}
                </Typography>
              </Box>
            )
          } else {
            return null
          }
        }))}
      </Stack>
    </>
  )
}