import * as React from "react";

export const useFetch = (url?: string) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  async function fetchData(fetchUrl) {
    const response = await fetch(fetchUrl);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }

  React.useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url]);

  return [ data, loading ];
};
