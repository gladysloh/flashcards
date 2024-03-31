import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import Box from "@mui/material/Box";

import { useAtom } from "jotai";
import { ClipboardCopy } from "@/components/ClipboardCopy";

import { resultAtom, showDiffAtom } from "@/app/atoms";
import { HotkeyHint } from "./HotkeyHint";

import { FlashcardArray } from "react-quizlet-flashcard";

export function RefinedArea() {
  const [showDiff, setShowDiff] = useAtom(showDiffAtom);
  const [result] = useAtom(resultAtom);

  const cards = [
    {
      id: 1,
      frontHTML: <div>What is the capital of <u>Alaska</u>?</div>,
      backHTML: <>Juneau</>,
    },
    {
      id: 2,
      frontHTML: <>What is the capital of California?</>,
      backHTML: <>Sacramento</>,
    }
  ];

  function transformQuestionsToFlashcards(result: any) {
    console.log('Original input:', result);
    if (typeof result === 'string') {
      try {
        let parsedResult = JSON.parse(result); // First parse attempt
        console.log('First parse result:', parsedResult);

        // If the result of the first parse is still a string, parse again
        if (typeof parsedResult === 'string') {
          parsedResult = JSON.parse(parsedResult); // Second parse attempt
          console.log('Second parse result:', parsedResult);
        }

        if (!Array.isArray(parsedResult)) {
          console.error('Parsed data is not an array, but a', typeof parsedResult);
          return [];
        }

        result = parsedResult; // Proceed with the parsed result
      } catch (e) {
        console.error('Failed to parse result string as JSON:', e);
        return [];
      }
    } else if (!Array.isArray(result)) {
      console.error('Expected an array, but received:', typeof result);
      return [];
    }

    // Proceed with the assumption that result is now an array
    return result.map((item: { question: any; answer: any; }, index: any) => ({
      id: index,
      frontHTML: <div>{item.question}</div>,
      backHTML: <>{item.answer}</>,
    }));
  }

  // Use the transformation function to populate the `cards` array
  const flashcards = transformQuestionsToFlashcards(result);
  console.log(flashcards)

  return (
    <Stack spacing={2} direction="column" flexGrow={1}>
      {/* <Box
        sx={{
          whiteSpace: "pre-wrap",
          textAlign: "left",
          flexGrow: 1,
        }}
      >
        {result}
      </Box> */}
      <FlashcardArray cards={flashcards}
        frontContentStyle={{
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
          fontSize:"25px",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "25px"

        }}
        backContentStyle={{
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "25px"
        }}
      />

      {/* <Stack spacing={2} direction="row">
        {result.length > 0 && (
          <>
            <ClipboardCopy />
            <ToggleButton
              size="small"
              value="check"
              selected={showDiff}
              onChange={() => setShowDiff(!showDiff)}
            >
              <CompareOutlinedIcon />
              {showDiff ? "Hide" : "Show"} diff
              <HotkeyHint hotkey="mod+shift+d" />
            </ToggleButton>
          </>
        )}
      </Stack> */}
    </Stack>
  );
}
