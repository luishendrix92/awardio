import Entry from "./Entry";
import Show from "./Show";

interface Award {
  id: number;
  title: string;
  show?: Show;
  entries?: Entry[];
  winnerEntryId: number | null;
}

export default Award;
