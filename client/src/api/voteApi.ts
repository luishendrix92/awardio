import Vote from "../models/Vote";
import client from "./client";

interface CastVotePayload {
  entryId: number;
  voterId: number;
  comment: string | null;
}

export async function castVote(voteData: CastVotePayload): Promise<Vote> {
  const response = await client.post(`/votes`, voteData);

  return response.data;
}

export async function deleteVote(voteId: number): Promise<void> {
  await client.delete(`/votes/${voteId}`);
}
