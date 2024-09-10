import { Copyright } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center py-2.5">
      <a
        className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
        href="https://dtdevs.com.br"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span
          className={"text-sm font-light text-white"}
        >{`desenvolvido por dtdevs ${new Date().getFullYear()}`}</span>
        <Copyright />
      </a>
    </footer>
  );
};

export default Footer;
