async function sendRequest(url: string, { arg }: any) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  const data = await res.json();
  return data;
}

export default sendRequest;
