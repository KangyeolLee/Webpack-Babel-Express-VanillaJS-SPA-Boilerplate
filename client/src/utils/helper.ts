export const html = (str: TemplateStringsArray, ...args: unknown[]) =>
  str.map((s, i) => `${s}${args[i] || ''}`).join('');
