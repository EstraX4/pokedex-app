import { API_HOST } from "../utils/constant";

export async function getPokemonApi() {
  try {
    const url = `${API_HOST}/pokemon?limit=900&offset=0`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetailsByUrlApi(url) {
    try {
const response = await fetch(url);
const result = await response.json();
return result;
    } catch (error) {
        throw error;
    }
}