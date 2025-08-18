import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useLazyLoad } from "../hooks/useLazyLoad";

// Improved cache with size limits and better memory management
class EmbedCache {
  private cache = new Map<string, boolean>();
  private maxSize = 100; // Limit cache to 100 entries
  private accessOrder: string[] = []; // Track access order for LRU

  has(url: string): boolean {
    return this.cache.has(url);
  }

  set(url: string, value: boolean): void {
    // If cache is full, remove least recently used entry
    if (this.cache.size >= this.maxSize) {
      const oldestUrl = this.accessOrder.shift();
      if (oldestUrl) {
        this.cache.delete(oldestUrl);
      }
    }

    // Add new entry
    this.cache.set(url, value);
    this.accessOrder.push(url);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  get size(): number {
    return this.cache.size;
  }
}

const embedCache = new EmbedCache();

interface EbirdEmbedProps {
  embedUrl: string;
  height?: number | string;
  width?: number | string;
  compact?: boolean;
}

const EbirdEmbed: React.FC<EbirdEmbedProps> = ({
  embedUrl,
  height = 400,
  width = "100%",
  compact = true,
}) => {
  const { elementRef, isVisible, isLoaded, handleLoad } = useLazyLoad();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // If embed is not cached, show loading state
    if (!embedCache.has(embedUrl)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [embedUrl, isVisible]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    handleLoad();
    // Cache the loaded embed
    embedCache.set(embedUrl, true);
  };

  return (
    <Box
      ref={elementRef}
      sx={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
        borderRadius: 1,
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(compact && {
          "& iframe": {
            transform: "scale(0.95)",
            transformOrigin: "center center",
            width: "105.3%", // 100% / 0.95 to compensate for scale
            height: "105.3%", // 100% / 0.95 to compensate for scale
            objectFit: "contain",
          },
        }),
      }}
    >
      {(!isVisible || isLoading) && <CircularProgress size={40} />}
      {isVisible && (
        <iframe
          src={embedUrl}
          height="100%"
          width="100%"
          frameBorder="0"
          allowFullScreen
          style={{
            border: "none",
            borderRadius: "4px",
            opacity: isLoaded && !isLoading ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          title="eBird Bird Image"
          onLoad={handleIframeLoad}
        />
      )}
    </Box>
  );
};

export default EbirdEmbed;
