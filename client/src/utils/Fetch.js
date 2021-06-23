async function Get(url = "", data = "") {
  let myHeaders = new Headers();
  myHeaders.append("key", "llave prueba_tecnica_talentum");

  return await fetch("http://localhost:3030/data/hola", {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }).then((response) => response.json());
}

export { Get };
