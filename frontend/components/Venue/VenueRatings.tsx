import { useState, useEffect } from "react";

/**
 * Averages all rating info for a specific venue
 * @param venueID venue being currently explored
 * @returns average ratings
 */
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch ratings");
        }
        return response.json();
      })
      .then((json) => {
        console.log(venueID)
        // If json is empty, set all ratings to default values (5 or 0 for overall)
        if (!json || json.length === 0) {
          setMainstreamRating(5);
          setPriceRating(5);
          setCrowdRating(5);
          setHypeRating(5);
          setEnergyRating(5);
          setExclusiveRating(5);
          setOverallRating(0); // Assuming 0 is the default for overall rating
        } else {
          // Calculate averages for each rating type
          const mainstream_rating = json.map((item) => item.mainstream_rating ?? 5);
          const price_rating = json.map((item) => item.price_rating ?? 5);
          const crowd_rating = json.map((item) => item.crowd_rating ?? 5);
          const hype_rating = json.map((item) => item.hype_rating ?? 5);
          const energy_rating = json.map((item) => item.energy_rating ?? 5);
          const exclusive_rating = json.map((item) => item.exclusive_rating ?? 5);
          const overall_rating = json.map((item) => item.overall_rating ?? 0);

          // Calculate average for each rating type
          const mainstream_average = mainstream_rating.reduce((acc, curr) => acc + curr, 0) / mainstream_rating.length;
          const price_average = price_rating.reduce((acc, curr) => acc + curr, 0) / price_rating.length;
          const crowd_average = crowd_rating.reduce((acc, curr) => acc + curr, 0) / crowd_rating.length;
          const hype_average = hype_rating.reduce((acc, curr) => acc + curr, 0) / hype_rating.length;
          const energy_average = energy_rating.reduce((acc, curr) => acc + curr, 0) / energy_rating.length;
          const exclusive_average = exclusive_rating.reduce((acc, curr) => acc + curr, 0) / exclusive_rating.length;
          const overall_average = overall_rating.reduce((acc, curr) => acc + curr, 0) / overall_rating.length;

          // Set state values
          setMainstreamRating(Math.ceil(mainstream_average));
          setPriceRating(Math.ceil(price_average));
          setCrowdRating(Math.ceil(crowd_average));
          setHypeRating(Math.ceil(hype_average));
          setEnergyRating(Math.ceil(energy_average));
          setExclusiveRating(Math.ceil(exclusive_average));
          setOverallRating(overall_average);
        }
      })
      .catch((error) => {
        // In case of error, use default values
        setMainstreamRating(5);
        setPriceRating(5);
        setCrowdRating(5);
        setHypeRating(5);
        setEnergyRating(5);
        setExclusiveRating(5);
        setOverallRating(0); // Default value for overall rating
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
