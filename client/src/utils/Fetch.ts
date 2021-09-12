//variables
const urlDefault = "http://localhost:3030/weather/city=";
//interfaces
interface methodGet {
  city: string;
  url?: string;
}

export function GET({ city, url = urlDefault }: methodGet): any {
  return new Promise<any>((resultFetch, errFetch) => {
    fetch(`${url}${city}`)
      .then((response) => {
        if (!response.ok) {
          console.log(response.status);
          errFetch(response.status);
        }
        return response.json();
      })
      .then((data) => resultFetch(data));
  });
}
