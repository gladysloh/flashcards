import { showDiffAtom } from "@/app/atoms";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAtom } from "jotai";

export const ChunkDelete = ({ content }: { content: string }) => {
  const [showDiff] = useAtom(showDiffAtom);
  if (!showDiff) return null;
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: red[500],
        whiteSpace: "pre-wrap",
        "&::before": { content: `"${content}"` },
      }}
    ></Box>
  );
};