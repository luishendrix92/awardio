import Award from "./Award";
import Vote from "./Vote";

interface Entry {
  id: number;
  title: string;
  image: string | null;
  description: string;
  award?: Award;
  votes?: Vote[];
}

export default Entry;
