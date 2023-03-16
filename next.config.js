/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "https://dev.funnelliner.com/api/",
  },
//   async rewrites() {
//     return [
//        {
//         has: [
//           {
//             type: "host",
//             value: "(^|\s)localhost",
//           }
//         ],
//         source: "/",
//         destination: "/b/index"
//       },
//     //   {
//     //     has: [
//     //       {
//     //         type: "host",
//     //         value: "(^|\s)mysupersaas.com",
//     //       }
//     //     ],
//     //     source: "/",
//     //     destination: "/actual-index",
//     //   },
//     //   {
//     //     has: [
//     //       {
//     //         type: "host",
//     //         value: "(?<user>.+)\.localhost",
//     //       },
//     //     ],
//     //     source: "/",
//     //     destination: "/user/:user",
//     //   },
//     //   {
//     //     has: [
//     //       {
//     //         type: "host",
//     //         value: "(?<user>.+)\.localhost",
//     //       },
//     //     ],
//     //     source: "/:path*",
//     //     destination: "/user/:user/:path*",
//     //   },
//     //   {
//     //     has: [
//     //       {
//     //         type: "host",
//     //         value: "(?<user>.+)\.funnelliner\.com",
//     //       },
//     //     ],
//     //     source: "/",
//     //     destination: "/:user",
//     //   },
//     //   {
//     //     has: [
//     //       {
//     //         type: "host",
//     //         value: "(?<user>.+)\.mysupersaas\.com",
//     //       },
//     //     ],
//     //     source: "/:path*",
//     //     destination: "/user/:host/:path*",
//     //   },
//       ]
//   },
};

module.exports = nextConfig;
