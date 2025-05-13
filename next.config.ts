import type { NextConfig } from "next"

const nextConfig: NextConfig = {

  // Désactive les indicateurs de développement
  devIndicators: false,

  // Désactive les sourcemaps en production pour éviter d'exposer le code source
  productionBrowserSourceMaps: false,

  // Active le mode strict de React pour détecter les problèmes potentiels
  reactStrictMode: true
}

export default nextConfig