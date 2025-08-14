// constants.ts (Final, Data-Accurate Version)

import type { Processor } from './types';

// This list now accurately reflects designers present in your dataset.
// 'Google' has been removed.
export const PROCESSOR_DESIGNERS: string[] = [
  'All',
  'Qualcomm',
  'Apple',
  'Samsung',
  'MediaTek',
  'HiSilicon', // Kept from original
  'NVIDIA',    // Added from your data
  'Intel',     // Added from your data
  'AMD',       // Added from your data
];

// The MOCK_PROCESSORS array is no longer used by the Recommendation Engine,
// but we will leave it here in case any other part of the app uses it.
export const MOCK_PROCESSORS: Processor[] = [
  { id: 1, name: 'Snapdragon 8 Gen 3', designer: 'Qualcomm', releaseYear: 2023, cores: 8, has5g: true, hasWifi6: true, benchmarkScore: 2105 },
  { id: 2, name: 'A17 Pro', designer: 'Apple', releaseYear: 2023, cores: 6, has5g: true, hasWifi6: true, benchmarkScore: 2956 },
  { id: 3, name: 'Dimensity 9300', designer: 'MediaTek', releaseYear: 2023, cores: 8, has5g: true, hasWifi6: true, benchmarkScore: 2150 },
  { id: 4, name: 'Exynos 2400', designer: 'Samsung', releaseYear: 2024, cores: 10, has5g: true, hasWifi6: true, benchmarkScore: 2011 },
  { id: 5, name: 'Tensor G3', designer: 'Google', releaseYear: 2023, cores: 9, has5g: true, hasWifi6: true, benchmarkScore: 1450 },
  { id: 6, name: 'Snapdragon 8 Gen 2', designer: 'Qualcomm', releaseYear: 2022, cores: 8, has5g: true, hasWifi6: true, benchmarkScore: 1530 },
  { id: 7, name: 'A16 Bionic', designer: 'Apple', releaseYear: 2022, cores: 6, has5g: true, hasWifi6: true, benchmarkScore: 2510 },
  { id: 8, name: 'Kirin 9000S', designer: 'HiSilicon', releaseYear: 2023, cores: 8, has5g: true, hasWifi6: false, benchmarkScore: 1100 },
  { id: 9, name: 'Dimensity 9200', designer: 'MediaTek', releaseYear: 2022, cores: 8, has5g: true, hasWifi6: true, benchmarkScore: 1420 },
  { id: 10, name: 'Snapdragon 7+ Gen 2', designer: 'Qualcomm', releaseYear: 2023, cores: 8, has5g: true, hasWifi6: true, benchmarkScore: 1150 },
  { id: 11, name: 'A15 Bionic', designer: 'Apple', releaseYear: 2021, cores: 6, has5g: true, hasWifi6: false, benchmarkScore: 2080 },
  { id: 12, name: 'Exynos 2200', designer: 'Samsung', releaseYear: 2022, cores: 8, has5g: true, hasWifi6: true, benchmarkScore: 1109 },
];