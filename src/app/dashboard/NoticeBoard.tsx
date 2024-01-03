'use client'

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AllNoticeInfo, getAllNotice } from "./dashboardHandler";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const noticeInPage = 5
const indicesArray = Array.from(Array(noticeInPage).keys())

export default function NoticeBoard({ id }: { id: string }) {
  const [notice, setNotice] = useState<AllNoticeInfo[]>([])
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    if (id) {
      getAllNotice(id).then(all => setNotice(all))
    }
  }, [id])

  return (
    <>
      <Typography variant="h6" color="primary" paddingBottom={2}>
        Annoucement
      </Typography>
      <Divider />
      <Stack
        divider={<Divider />}
      >
        {indicesArray.map((value => {
          const index = value + (page - 1) * noticeInPage
          if (index < notice.length) {
            return (
              <Accordion key={index.toString()}>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between", 
                    }
                  }}
                >
                  <Typography color="text.primary">
                    {notice[index].noticeTitle}
                  </Typography>
                  <Typography 
                    component={Link}
                    href={`/dashboard/course/${notice[index].classId}`}
                    color="text.secondary"
                    sx={{
                      textDecoration: "none"
                    }}
                  >
                    {notice[index].classShortName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.primary">
                    {notice[index].noticeContent}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
          }
        }))}
      </Stack>
      <Divider />
      <Pagination 
        count={Math.max(1, Math.ceil(notice.length / noticeInPage))} 
        color="primary" 
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{
          display: "flex", 
          justifyContent: "center", 
          mt: 3
        }}
      />
    </>
  )
}