import { useState, useEffect } from "react";

const useVenueRatings = (venueID) => {
  const [mainstreamRating, setMainstreamRating] = useState(5);
  const [priceRating, setPriceRating] = useState(5);
  const [crowdRating, setCrowdRating] = useState(5);
  const [hypeRating, setHypeRating] = useState(5);
  const [energyRating, setEnergyRating] = useState(5);
  const [exclusiveRating, setExclusiveRating] = useState(5);
  const [overallRating, setOverallRating] = useState(5);

  useEffect(() => {
    fetch(`http://localhost:8080/venueratings/venue/${venueID}/ratings`)
      .then((response) => response.json())
      .then((json) => {
        const mainstream_rating = json.map((item) => item.mainstream_rating ?? 5);
        const price_rating = json.map((item) => item.price_rating ?? 5);
        const crowd_rating = json.map((item) => item.crowd_rating ?? 5);
        const hype_rating = json.map((item) => item.hype_rating ?? 5);
        const energy_rating = json.map((item) => item.energy_rating ?? 5);
        const exclusive_rating = json.map((item) => item.exclusive_rating ?? 5);
        const overall_rating = json.map((item) => item.overall_rating ?? 0);

        const mainstream_total = mainstream_rating.reduce(
          (acc, curr) => acc + curr,
          0
        );
        const mainstream_average =
          mainstream_rating.length > 0
            ? mainstream_total / mainstream_rating.length
            : 5;  // Default to 5 if no ratings exist

        const price_total = price_rating.reduce((acc, curr) => acc + curr, 0);
        const price_average =
          price_rating.length > 0 ? price_total / price_rating.length : 5;

        const crowd_total = crowd_rating.reduce((acc, curr) => acc + curr, 0);
        const crowd_average =
          crowd_rating.length > 0 ? crowd_total / crowd_rating.length : 5;

        const hype_total = hype_rating.reduce((acc, curr) => acc + curr, 0);
        const hype_average =
          hype_rating.length > 0 ? hype_total / hype_rating.length : 5;

        const energy_total = energy_rating.reduce((acc, curr) => acc + curr, 0);
        const energy_average =
          energy_rating.length > 0 ? energy_total / energy_rating.length : 5;

        const exclusive_total = exclusive_rating.reduce((acc, curr) => acc + curr, 0);
        const exclusive_average =
          exclusive_rating.length > 0
            ? exclusive_total / exclusive_rating.length
            : 5;

        const overall_total = overall_rating.reduce((acc, curr) => acc + curr, 0);
        const overall_average =
          overall_rating.length > 0 ? overall_total / overall_rating.length : 0;

        setMainstreamRating(Math.ceil(mainstream_average));
        setPriceRating(Math.ceil(price_average));
        setCrowdRating(Math.ceil(crowd_average));
        setHypeRating(Math.ceil(hype_average));
        setEnergyRating(Math.ceil(energy_average));
        setExclusiveRating(Math.ceil(exclusive_average));
        setOverallRating(overall_average);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, [venueID]);

  return {
    mainstreamRating,
    priceRating,
    crowdRating,
    hypeRating,
    energyRating,
    exclusiveRating,
    overallRating
  };
};

export default useVenueRatings;
