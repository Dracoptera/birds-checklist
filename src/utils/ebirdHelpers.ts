/**
 * eBird/Macaulay Library Embed URL Helper
 * 
 * To get an eBird embed URL:
 * 1. Go to https://ebird.org
 * 2. Search for a bird species
 * 3. Click on "Media" tab
 * 4. Find a good photo
 * 5. Click on the photo
 * 6. Look for "Embed" button or copy the embed code
 * 7. Extract the URL from the iframe src attribute
 * 
 * Example embed URL format:
 * https://macaulaylibrary.org/asset/ASSET_ID/embed
 */

export const getEbirdEmbedUrl = (assetId: string): string => {
  return `https://macaulaylibrary.org/asset/${assetId}/embed`;
};

export const extractAssetIdFromEmbedCode = (embedCode: string): string | null => {
  // Extract asset ID from iframe src
  const match = embedCode.match(/src="https:\/\/macaulaylibrary\.org\/asset\/(\d+)\/embed"/);
  return match ? match[1] : null;
};

export const createEbirdEmbedCode = (assetId: string, height = 300, width = 400): string => {
  return `<iframe src="https://macaulaylibrary.org/asset/${assetId}/embed" height="${height}" width="${width}" frameborder="0" allowfullscreen></iframe>`;
};

// Common Uruguayan bird asset IDs (you can add more)
export const URUGUAY_BIRD_ASSETS: { [key: string]: string } = {
  'rufous-hornero': '79992301',
  'southern-house-wren': '79992301', // Replace with actual asset ID
  'great-kiskadee': '79992301', // Replace with actual asset ID
  'black-necked-swan': '79992301', // Replace with actual asset ID
  // Add more as you find them
};

export const getBirdEbirdUrl = (birdId: string): string | null => {
  const assetId = URUGUAY_BIRD_ASSETS[birdId];
  return assetId ? getEbirdEmbedUrl(assetId) : null;
}; 