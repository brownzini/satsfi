export default async function getBtcPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return (result.bitcoin.brl * 0.00000001);
  } catch (error) {
    return 0;
  }
};
