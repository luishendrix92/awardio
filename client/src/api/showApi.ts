import Show from "../models/Show";
import client from "./client";

const BASE_PATH = '/shows';

// Information needed to create a new show or update
// an existing one. For updates, the id is provided
// as a parameter to the async function instead.
export interface CUShowPayload {
  title: string;
  image: string;
  description: string;
  airDate: number;
}

export async function getAllShows(): Promise<Show[]> {
  const response = await client.get(BASE_PATH);

  return response.data;
}

export async function getShowById(id: number): Promise<Show> {
  const response = await client.get(`${BASE_PATH}/${id}`);

  return response.data;
}

export async function deleteShow(id: number): Promise<void> {
  await client.delete(`${BASE_PATH}/${id}`);
}

export async function createShow(showData: CUShowPayload): Promise<Show> {
  const response = await client.post(BASE_PATH, showData);

  return response.data;
}

export async function updateShow(id: number, updatedShowData: CUShowPayload): Promise<Show> {
  const response = await client.put(`${BASE_PATH}/${id}`, updatedShowData);

  return response.data;
}