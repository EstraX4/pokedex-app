import { API_HOST } from "../utils/constant";

export async function getPokemonDetailApi(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonApi(nextUrl) {
  try {
    const url = `${API_HOST}/pokemon?limit=1153&offset=0`;
    //const response = await fetch(nextUrl || url);
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonByName(name) {
  try {
    const url = `${API_HOST}/pokemon/${name}`;
    const response = await fetch(url);
    if (response !== undefined || response !== null || response !== "" || !response) {
      const result = await response.json();
      return result;
    } else {
      return null;
    }
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


