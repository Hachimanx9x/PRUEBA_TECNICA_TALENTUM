async function Get(url = "http://localhost:3030/data", data = "Cali") {
  let myHeaders = new Headers();
  myHeaders.append("key", "key prueba_tecnica_talentum");

  return new Promise(async (res, rej) => {
    await fetch(`${url}/${data}`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }).then((response) => {
      if (!response.ok) {
        //  console.log("error");
        rej({ Error: response.status });
      } else {
        //console.log("ok");
        res(response.json());
      }
    });
  });
}

export { Get };
