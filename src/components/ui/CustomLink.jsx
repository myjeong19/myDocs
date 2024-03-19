import PropTypes from 'prop-types';

import classes from './css/CustomLink.module.css';

export const CustomLink = ({ children, href }) => {
  return (
    <a className={classes.link} href={href}>
      {children}
    </a>
  );
};

CustomLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};
