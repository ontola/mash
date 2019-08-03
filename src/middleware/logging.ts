
export const logging = () => (next) => (a, o) => {
  // tslint:disable-next-line no-console
  console.log(`action: ${a.value}`, o);

  return next(a, o);
};
