import axios from 'axios'

export default async function invokeRandom(max: number): Promise<number> {
  return (
    await axios.post('https://api.random.org/json-rpc/4/invoke', {
      jsonrpc: '2.0',
      method: 'generateIntegers',
      params: {
        apiKey: import.meta.env.VITE_API_KEY,
        n: 1,
        min: 1,
        max,
        replacement: true,
      },
      id: 42,
    })
  ).data.result.random.data[0]
}
