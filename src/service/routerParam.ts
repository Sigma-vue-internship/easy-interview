export const getRouterParam = (param: string | string[]): string =>
  Array.isArray(param) ? param[0] : param;
