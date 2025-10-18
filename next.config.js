const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);
const repoName = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split("/").pop()
  : "";

const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const computedBasePath =
  explicitBasePath ?? (isGithubActions && repoName ? `/${repoName}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pesalink.co.ke",
        pathname: "/storage/images/logos/**"
      }
    ]
  }
};

if (computedBasePath) {
  nextConfig.basePath = computedBasePath;
  nextConfig.assetPrefix = computedBasePath;
}

module.exports = nextConfig;
