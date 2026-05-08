import CustomLink from '@/components/inputs/CustomLink';

const Copyright = ({ href, children }) => (
  <p className="text-xs text-muted-foreground text-center">
    {'Copyright © '}
    <CustomLink
      rel="noreferrer noopener"
      plain
      target="_blank"
      href={href}
    >
      {new Date().getFullYear()}{' '}
      {children}
    </CustomLink>
  </p>
);

const Footer = ({ href, children }) => (
  <div className="mt-2 text-center">
    <Copyright href={href}>
      {children}
    </Copyright>
  </div>
);

export default Footer;
