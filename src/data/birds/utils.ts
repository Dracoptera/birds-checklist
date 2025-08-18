import { Bird } from "./types";
import { uruguayBirds } from "./allBirds";

export const getBirdsByOrder = () => {
  const birdsByOrder: { [key: string]: Bird[] } = {};
  uruguayBirds.forEach((bird) => {
    if (!birdsByOrder[bird.order]) {
      birdsByOrder[bird.order] = [];
    }
    birdsByOrder[bird.order].push(bird);
  });
  return birdsByOrder;
};

export const getBirdsByFamily = () => {
  const birdsByFamily: { [key: string]: Bird[] } = {};
  uruguayBirds.forEach((bird) => {
    if (!birdsByFamily[bird.family]) {
      birdsByFamily[bird.family] = [];
    }
    birdsByFamily[bird.family].push(bird);
  });
  return birdsByFamily;
};

// Utility function to get commonness for a specific department
export const getCommonnessForDepartment = (
  bird: Bird,
  departamento?: string
): string => {
  if (typeof bird.commonness === "string") {
    return bird.commonness;
  }

  if (!departamento) {
    // If no department specified, calculate the most common (majority) level
    const levels = Object.values(bird.commonness);
    const levelCounts: { [key: string]: number } = {};

    // Count occurrences of each level
    levels.forEach((level) => {
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });

    // Find the level with the highest count
    let mostCommonLevel = "rara"; // default fallback
    let maxCount = 0;

    Object.entries(levelCounts).forEach(([level, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonLevel = level;
      }
    });

    return mostCommonLevel;
  }

  return bird.commonness[departamento] || "rara";
};

// Utility function to get all unique commonness levels from a bird
export const getAllCommonnessLevels = (bird: Bird): string[] => {
  if (typeof bird.commonness === "string") {
    return [bird.commonness];
  }

  return Array.from(new Set(Object.values(bird.commonness)));
};

// Utility function to get departments for a bird
export const getDepartamentosForBird = (bird: Bird): string[] => {
  // If bird has explicit departamentos array, use it
  if (bird.departamentos) {
    return bird.departamentos;
  }

  // If bird has department-specific commonness, derive departments from it
  if (typeof bird.commonness === "object") {
    return Object.keys(bird.commonness);
  }

  // If bird has single commonness, it's found in all departments (or we don't have specific data)
  return [];
};
