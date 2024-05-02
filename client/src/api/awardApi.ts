import Award from "../models/Award";
import client from "./client";

const BASE_PATH = '/awards';

interface SetWinnerDTO {
  awardId: number;
  winnerEntryId: number | null;
}

interface CreateAwardPayload {
  title: string;
  showId: number;
}

export async function setWinner({ awardId, winnerEntryId }: SetWinnerDTO): Promise<SetWinnerDTO> {
  const response = await client.patch(`${BASE_PATH}/${awardId}/winner`, { winnerEntryId });

  return response.data;
}

export async function deleteAward(id: number): Promise<void> {
  await client.delete(`${BASE_PATH}/${id}`);
}

export async function createAward(awardData: CreateAwardPayload): Promise<Award> {
  const response = await client.post(BASE_PATH, awardData);

  return response.data;
}

export async function changeAwardTitle(id: number, title: string): Promise<string> {
  const response = await client.put(`${BASE_PATH}/${id}`, { title });

  return response.data;
}