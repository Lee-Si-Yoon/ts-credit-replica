export const defaultPaths = (base: string) => {
  return {
    default: `${base}`,
    pattern: `${base}/*`,
    getMenuPattern: `${base}/:current/*`,
  };
};

export const Paths = {
  ...defaultPaths(`/`),
};
