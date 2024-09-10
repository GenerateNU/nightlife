{inputs, ...}: {
  imports = [
    inputs.devenv.flakeModule
  ];
  perSystem = {pkgs, ...}: {
    devenv = {
      modules = [
        inputs.env-help.devenvModule
      ];
      shells.default = {
        enterShell = ''
          printf "Welcome to Nightlife\n" | ${pkgs.cowsay}/bin/cowsay | ${pkgs.lolcat}/bin/lolcat
          printf "\033[0;1;36mDEVSHELL ACTIVATED\033[0m\n"
        '';
        env-help.enable = true;
        languages = {
          go.enable = true;
          javascript = {
            enable = true;
            npm.enable = true;
          };
          nix.enable = true;
          typescript.enable = true;
        };

        packages = with pkgs; [
          cowsay
          gnumake
          golangci-lint
          lolcat
          nodePackages.eslint
          supabase-cli
        ];
      };
    };
  };
}
