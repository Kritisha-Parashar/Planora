import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import PopupComponent from "./Popup";

export default function MyForm() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
  });

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => {
        const countryList = res.data.data.map((item) => item.name);
        setCountries(countryList);
      });
  }, []);

  useEffect(() => {
    if (formData.country) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", {
          country: formData.country,
        })
        .then((res) => {
          const stateList = res.data.data.states.map((item) => item.name);
          setStates(stateList);
          setCities([]);
          setFormData((prev) => ({ ...prev, state: "", city: "" }));
        });
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.country && formData.state) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
          country: formData.country,
          state: formData.state,
        })
        .then((res) => {
          setCities(res.data.data);
          setFormData((prev) => ({ ...prev, city: "" }));
        });
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const countryInfo = await axios.get(
        `https://restcountries.com/v3.1/name/${formData.country}`
      );
      const countryData = countryInfo.data[0];

      let wikiDescription = "";
      try {
        const wikiRes = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${formData.city}`
        );
        wikiDescription = wikiRes.data.extract;
      } catch {
        wikiDescription = `Explore ${formData.city}, a beautiful city in ${formData.state}, ${formData.country}.`;
      }

      const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      let imageUrl = `https://source.unsplash.com/800x600/?${formData.city}`;
      if (unsplashAccessKey) {
        try {
          const unsplashRes = await axios.get(
            `https://api.unsplash.com/search/photos`,
            {
              params: {
                query: `${formData.city} ${formData.country}`,
                per_page: 1,
              },
              headers: {
                Authorization: `Client-ID ${unsplashAccessKey}`,
              },
            }
          );
          const unsplashImg = unsplashRes.data.results[0]?.urls?.regular;
          if (unsplashImg) imageUrl = unsplashImg;
        } catch {}
      }

      const title = `${formData.city}, ${formData.state}`;
      const desc = `A city in ${formData.country}`;
      const description = `${wikiDescription}

${
  formData.country
} has a population of approximately ${countryData.population.toLocaleString()} and is known for the ${
        countryData.region
      } region. Capital: ${countryData.capital?.[0] || "Unknown"}.`;

      setPopupData({ title, desc, description, img: imageUrl });
      setPopupOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load location info. Please try again.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 500,
            mx: "auto",
            mt: 8,
            p: 5,
            mb: 20,
            borderRadius: 6,
            background: "rgba(25, 25, 25, 0.75)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            border: "2px solid transparent",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              borderColor: "#00e5ff",
              boxShadow: "0 0 20px #00e5ff88",
            },
          }}
        >
          <Typography
            variant="h4"
            color="#ffffff"
            textAlign="center"
            fontWeight="bold"
            fontFamily={"'Unbounded', sans-serif"}
          >
            🌍 Choose Your Destination
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="country-label" sx={{ color: "#ccc" }}>
              Country
            </InputLabel>
            <Select
              labelId="country-label"
              name="country"
              value={formData.country}
              onChange={handleChange}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#888",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00e5ff",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00e5ff",
                },
              }}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!states.length}>
            <InputLabel id="state-label" sx={{ color: "#ccc" }}>
              State
            </InputLabel>
            <Select
              labelId="state-label"
              name="state"
              value={formData.state}
              onChange={handleChange}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#888",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00e5ff",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00e5ff",
                },
              }}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!cities.length}>
            <InputLabel id="city-label" sx={{ color: "#ccc" }}>
              City
            </InputLabel>
            <Select
              labelId="city-label"
              name="city"
              value={formData.city}
              onChange={handleChange}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#888",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00e5ff",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00e5ff",
                },
              }}
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!formData.city}
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 8px 24px rgba(0, 229, 255, 0.2)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.25)",
                boxShadow: "0 12px 32px rgba(0, 229, 255, 0.4)",
                borderColor: "#00e5ff",
              },
            }}
          >
            🌐 Submit
          </Button>
        </Box>
      </motion.div>

      {popupData && (
        <PopupComponent
          open={popupOpen}
          handleClose={() => setPopupOpen(false)}
          card={popupData}
        />
      )}
    </>
  );
}
