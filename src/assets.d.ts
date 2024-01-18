declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
