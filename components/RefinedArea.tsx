import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import Box from "@mui/material/Box";

import { useAtom } from "jotai";
import { ClipboardCopy } from "@/components/ClipboardCopy";

import { resultAtom, showDiffAtom } from "@/app/atoms";
import { HotkeyHint } from "./HotkeyHint";

import { FlashcardArray } from "react-quizlet-flashcard";
import FlashcardArrayProps from "react-quizlet-flashcard/dist/interfaces/IFlashcardArray";


interface FlashcardsByTopic {
  [topic: string]: any;
}

export function RefinedArea() {
  const [showDiff, setShowDiff] = useAtom(showDiffAtom);
  const [result] = useAtom(resultAtom);

  function transformQuestionsToFlashcards(result: string | JSX.Element[]) {
    let structuredFlashcards: any = {};

    try {
      // Parse the input if it's a JSON string.
      let parsedResult = typeof result === 'string' ? JSON.parse(result) : result;

      // Handle double-encoded JSON strings.
      parsedResult = typeof parsedResult === 'string' ? JSON.parse(parsedResult) : parsedResult;

      // Determine if the parsed result is an object (potentially with topics).
      if (typeof parsedResult === 'object' && !Array.isArray(parsedResult)) {
        // The input is an object with topics.
        structuredFlashcards = Object.entries(parsedResult).reduce((acc: any, [topic, cards]) => {
          if (Array.isArray(cards)) {
            // Process and assign each card to the appropriate topic.
            acc[topic] = cards.map((card, index) => ({
              index: index,
              frontHTML: <div>{card.question}</div>,
              backHTML: <div>{card.answer}</div>,
            }));
          }
          return acc;
        }, {});
      } else if (Array.isArray(parsedResult)) {
        // The result is directly an array of flashcards (no specific topic).
        // Assign them to a default topic key or leave the key as an empty string.
        structuredFlashcards[''] = parsedResult.map((item, index) => ({
          index: index,
          frontHTML: <div>{item.question}</div>,
          backHTML: <div>{item.answer}</div>,
        }));
      } else {
        console.error('Invalid input format');
        return {};
      }
    } catch (e) {
      console.error('Failed to parse result string as JSON:', e);
      return {};
    }

    return structuredFlashcards;
  }

  // Use the transformation function to populate the `cards` array
  const flashcards: FlashcardsByTopic = transformQuestionsToFlashcards(result);
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

      <div>
        {Object.entries(flashcards as FlashcardsByTopic).map(([topic, flashcard], index) => (
          <div key={index}>
            <h2>{topic}</h2>
            {flashcard.length > 0 ? (
                <FlashcardArray cards={flashcard}
                  frontContentStyle={{
                    color: "black",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "25px",
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
              ) : (
                <p>No flashcards</p>
              )}
          </div>
        ))}
      </div>

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
