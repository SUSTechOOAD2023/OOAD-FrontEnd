'use client'

import { useMemo, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import ListItem from "@mui/material/ListItem"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import ListItemButton from "@mui/material/ListItemButton"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import Link from 'next/link';
import ListItemText from "@mui/material/ListItemText"
import SearchIcon from '@mui/icons-material/Search';
import Fuse from "fuse.js"
import Box from "@mui/material/Box"

const fuseOptions = {
  threshold: 0.4
}

export default function ViewList({ name, items, refs, check, onCheckChange }: { 
  name: string, 
  items: string[], 
  refs?: string[], 
  check?: boolean[], 
  onCheckChange?: (index: number) => void
}) {
  const [prompt, setPrompt] = useState("")
  const [indices, setIndices] = useState<number[]>(() => Object.keys(items).map(Number))
  const fuse = useMemo(() => new Fuse(items, fuseOptions), [items])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrompt = event.target.value

    setPrompt(newPrompt)

    if (newPrompt.length === 0) {
      setIndices(Object.keys(items).map(Number))
    } else {
      const result = fuse.search(newPrompt)
      setIndices(result.map(t => t.refIndex))
    }
  }

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props
    const ref = indices[index]

    // FIXME
    return (
      <ListItem 
        style={style} 
        key={index} 
        component="div" 
        secondaryAction={check !== undefined && 
          <Checkbox 
            edge="end"
            onChange={onCheckChange && (() => onCheckChange(ref))}
            checked={check[ref]}
          />
        }
        disablePadding
      >
        {refs !== undefined ?
          <ListItemButton component={Link} href={refs[ref]} target="_blank">
            <ListItemText primary={items[ref]} />
          </ListItemButton> :
          <ListItemButton>
            <ListItemText primary={items[ref]} />
          </ListItemButton>
        }
      </ListItem>
    )
  }

  return (
    <Stack spacing={1}>
      <Box sx={{ display: "flex", alignItems: "flex-end", mb: 1 }}>
        <SearchIcon sx={{ mr: 1, my: 0.5 }} />
        <TextField 
          label={name} 
          variant="standard"
          value={prompt}
          onChange={handleSearch}
        />
      </Box>
      <FixedSizeList
        height={300}
        width={300}
        itemCount={indices.length}
        itemSize={45}
      >
        {renderRow}
      </FixedSizeList>
    </Stack>
  )
}