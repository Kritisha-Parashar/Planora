import React, { useEffect, useState } from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPages = window.scrollY / window.innerHeight;
      setVisible(scrollPages >= 1.8); // appears after scrolling 2 page heights
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        py: 3,
        px: { xs: 4, sm: 8 },
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255,255,255,0.2)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease-in-out",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 100,
      }}
    >
      {/* About Us Section */}
      <Box maxWidth={500} sx={{textAlign: "left"}}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          About Me
        </Typography>
        <Typography variant="body2">
          I am a passionate traveler and developer, always looking for new adventures. I believe in simplicity and functionality in design. This website is a reflection of my journey and the places I've explored. I hope you like it. :)
        </Typography>
      </Box>

      {/* Social Media Links */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <IconButton
          component={Link}
          href="https://github.com/Kritisha-Parashar"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          sx={{ color: "white" }}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>

        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/kritisha-parashar-2385602b0"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
          sx={{ color: "white" }}
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
