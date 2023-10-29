import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";

import { showDiffAtom } from "@/app/atoms";
import { useAtom } from "jotai";

export const ChunkDelete = ({ content }: { content: string }) => {
  const [showDiff] = useAtom(showDiffAtom);
  if (!showDiff) return null;
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: red[200],
        whiteSpace: "pre-wrap",
        "&::before": { content: `"${CSS.escape(content)}"` },
      }}
    ></Box>
  );
};
