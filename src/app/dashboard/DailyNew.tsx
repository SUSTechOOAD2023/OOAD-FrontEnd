import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Image from 'next/image';

export default function DailyNew() {
  return (<>  
      <Typography variant="h6" color="primary" paddingBottom={1.5}>
        What&apos;s new?
      </Typography>
      <Divider />
      <Box display="flex" alignItems="center" minHeight={70}>
        <Image
          src="/hutao1.png"
          alt="Genshin Impact"
          width={40}
          height={40}
          style={{ 
            borderRadius: '50%', 
            padding: 5
          }}
          priority
        />
        <Typography>
          <b>Hutao</b> just invited you to join the group <b>OOAD-1</b>!
        </Typography>
      </Box>
    </>
  )
}