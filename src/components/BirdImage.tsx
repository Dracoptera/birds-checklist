import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import { Bird } from "../data/birds";
import EbirdEmbed from "./EbirdEmbed";
import { useLazyLoad } from "../hooks/useLazyLoad";

// Create a cache to store preloaded images
const imageCache = new Map<string, boolean>();

// Function to preload an image
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache.set(src, true);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
};

interface BirdImageProps {
  bird: Bird;
  height?: number | string;
  showPlaceholder?: boolean;
  compact?: boolean;
}

const BirdImage: React.FC<BirdImageProps> = ({
  bird,
  height = 315,
  showPlaceholder = true,
  compact = true,
}) => {
  const { elementRef, isVisible, isLoaded, handleLoad } = useLazyLoad();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!bird.imageUrl || !isVisible) return;

    // If image is not cached, show loading state
    if (!imageCache.has(bird.imageUrl)) {
      setIsLoading(true);
      preloadImage(bird.imageUrl)
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [bird.imageUrl, isVisible]);

  // Priority: eBird embed > regular image > placeholder
  if (bird.ebirdEmbedUrl) {
    return (
      <EbirdEmbed
        embedUrl={bird.ebirdEmbedUrl}
        height={height}
        compact={compact}
      />
    );
  }

  if (bird.imageUrl) {
    return (
      <Box
        ref={elementRef}
        sx={{
          height,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        {(!isVisible || isLoading) && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        )}
        {isVisible && (
          <Box
            component="img"
            src={bird.imageUrl}
            alt={bird.commonName}
            loading="lazy"
            onLoad={handleLoad}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isLoaded && !isLoading ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
        )}
      </Box>
    );
  }

  if (!showPlaceholder) return null;

  return (
    <Box
      sx={{
        height,
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px dashed #ccc",
      }}
    >
      <ImageIcon sx={{ fontSize: 48, color: "#ccc", mb: 1 }} />
      <Typography variant="body2" color="text.secondary" align="center">
        Sin imagen
      </Typography>
      <Typography variant="caption" color="text.secondary" align="center">
        {bird.commonName}
      </Typography>
    </Box>
  );
};

export default BirdImage;
