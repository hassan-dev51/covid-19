{
  /* @ts -expect-error Async Server Component */
}
import SelectCountry from "./SelectCountry";

interface option {
  method: string;
  headers: {
    "X-RapidAPI-Key": any;
    "X-RapidAPI-Host": any;
  };
}

const option: option = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.RAPID_API_HOST,
  },
};

async function getApiData() {
  const res = await fetch(
    "https://corona-virus-world-and-india-data.p.rapidapi.com/api",
    option
  );

  if (!res.ok) {
    throw new Error("failed to fetch corona-virus-world-and-india-data");
  }

  return res.json();
}

const CovidCard: any = async () => {
  const { countries_stat, world_total } = await getApiData();

  return (
    <>
      <SelectCountry
        countries_stat={countries_stat}
        world_total={world_total}
      />
    </>
  );
};
export default CovidCard;
