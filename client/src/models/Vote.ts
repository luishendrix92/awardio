import Entry from "./Entry";
import User from "./User";

interface Vote {
  id: number;
  entry?: Entry;
  comment: string | null;
  voter: User;
}

export default Vote;
