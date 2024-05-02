import Entry from "../models/Entry";
import client from "./client";

const BASE_PATH = '/entries';

export interface CUEntryPayload {
  awardId?: number;
  title: string;
  description: string;
  image: string | null;
}

export async function createEntry(entryData: CUEntryPayload): Promise<Entry> {
  const response = await client.post(BASE_PATH, entryData);

  return response.data;
}

export async function updateEntry(id: number, updatedEntryData: CUEntryPayload): Promise<Entry> {
  const response = await client.put(`${BASE_PATH}/${id}`, updatedEntryData);

  return response.data;
}

export async function deleteEntry(id: number): Promise<void> {
  await client.delete(`${BASE_PATH}/${id}`);
}