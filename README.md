<div align="center">
<h1>Nightlife 🌃</h1>
  <div>
      A fullstack application for the Nightlife project
  </div>
</div>

## Stack

[![Nix](https://img.shields.io/badge/nix-devshell-blue?logo=NixOS&labelColor=ccc)](https://nixos.org/)
[![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/doc/)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/supabase-black?logo=supabase&style=for-the-badge)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactnative.dev/)

## Tools

[![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)](https://docs.expo.dev/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Development Enviroment Setup

Before compiling and running our application, we need to install/setup several
languages, package managers, and various tools. The installation process can
vary, so follow the instructions for each item below!

[Nix](https://nixos.org/download/) our devshell, standarizing the development environment for all engineers.

[Go](https://go.dev/doc/install) our primary backend language.

[Node Package Manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
our package manager in the frontend.

[Docker](https://www.docker.com/get-started/) and
[Docker Desktop](https://www.docker.com/products/docker-desktop/) our Postgres
Database will be containerized in Docker.

[Ngrok](https://ngrok.com/docs/getting-started/) Allows us to easily connect the
frontend to backend code.

## Before Running

Create an .env file in the root directory:

```
SUPABASE_URL=<your-supabase-url-here>
SUPABASE_ANON_KEY=<your-supabase-anon-key-here>
DATABASE_URL<your-supabase-db-url-here>
SUPABASE_PROJECT_ID=<your_supabase_project_id_here>
SUPABASE_JWT_SECRET=<your_supabase_jwt_secret_here>
EXPO_PUBLIC_DOMAIN=<your_expo_public_domain>
```

Create a supabase account [here](https://supabase.com/) and Cam and I will add you to the Generate org!

## Running The Project

1. In the base of the repo: run `nix develop --impure`
2. Launch Docker Desktop
3. In the base of the repo: run `make db-run`
4. Then, open a new tab to run commands in: run `make backend-dep` then `make backend-run`
5. Next, in a new tab run `make ngrok-run`
6. Finally, open one last new tab: run `make frontend-run`
