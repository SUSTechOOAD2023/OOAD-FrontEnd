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

const now = dayjs()
const notesOnDays = [
  {
    day: 2, 
    name: "Assignment 1", 
    author: "OOAD"
  }, 
  {
    day: 14, 
    name: "Assignment 2", 
    author: "OOAD"
  }, 
  {
    day: 14, 
    name: "Assignment 3", 
    author: "OOAD"
  }, 
  {
    day: 22, 
    name: "Assignment 4", 
    author: "OOAD"
  }, 
]
type notesType = typeof notesOnDays

function ServerDay(props: PickersDayProps<Dayjs> & { notesOnDays?: notesType }) {
  const { notesOnDays = [], day, outsideCurrentMonth, ...other } = props;

  const isOutside = props.outsideCurrentMonth 
  const numOfDays = notesOnDays.filter(x => x.day === props.day.date()).length

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

export default function DeadlineCalendar() {
  const [date, setDate] = useState<Dayjs | null>(now)

  return (
    <>  
      <Typography variant="h6" color="primary" marginLeft={3}>
        Deadline
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
        <DateCalendar 
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
      {notesOnDays.filter(x => x.day === date?.date()).length > 0 && <Divider />}
      <Stack
        divider={<Divider />}
      >
        {notesOnDays.map((value => {
          if (value.day === date?.date()) {
            return (
              <Box 
                key={`deadline-${value.name}`} 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between"
                height={40}
              >
                <Typography color="text.primary">
                  {value.name}
                </Typography>
                <Typography color="text.secondary">
                  {value.author}
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