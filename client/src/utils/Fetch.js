async function Get(url = "http://localhost:3030/data", data = "Cali") {
  let myHeaders = new Headers();
  myHeaders.append("key", "llave prueba_tecnica_talentum");

  return await fetch(`${url}/${data}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }).then((response) => response.json());
}

export { Get };
