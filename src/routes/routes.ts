// config/routes.ts
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/explore-more", label: "Explore More", opensSheet: true },
];

export const appLinks = [
  { href: "/news", label: "News App" },
  { href: "/websocket", label: "Websocket App" },
];
export const routes = {
  main: navLinks,
  apps: appLinks,
  mobile: [...navLinks.filter(navLink => navLink.href != "/explore-more"), ...appLinks],
};