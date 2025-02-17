const selectors = {
  ["0.0.1"]: {
    active: () => `@cartridge/active`,
    account: (address: string) => `@cartridge/account/${address}`,
    deployment: (address: string, chainId: string) =>
      `@cartridge/deployment/${address}/${chainId}`,
    admin: (address: string, origin: string) =>
      `@cartridge/admin/${address}/${origin}`,
    session: (address: string, origin: string, chainId: string) =>
      `@cartridge/session/${address}/${origin}/${chainId}`,
  },
};

export default selectors;
