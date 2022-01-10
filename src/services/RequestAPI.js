async function requireApi(url) {
  const planets = await fetch(url)
    .then((response) => response.json())
    .then((response) => response);
  return planets;
}

export default requireApi();
