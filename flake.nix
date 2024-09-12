{
  description = "Nightlife: you're about to be so informed";

  inputs = {
    devenv = {
      inputs.nixpkgs.follows = "nixpkgs";
      url = "github:cachix/devenv";
    };
    env-help = {
      inputs.nixpkgs.follows = "nixpkgs";
      url = "github:jtrrll/env-help";
    };
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = {
    flake-parts,
    ...
  } @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [ ./nix_modules ];
    };
}
