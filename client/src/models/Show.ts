import Award from "./Award";

interface Show {
  id: number;
  title: string;
  image: string;
  description: string;
  airDate: number;
  awards?: Award[];
}

export default Show;
