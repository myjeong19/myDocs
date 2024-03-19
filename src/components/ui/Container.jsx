import PropTypes from 'prop-types';

import classes from './css/Container.module.css';

export const Container = ({
  ContainerTag = 'section',
  InenerTitleTag = 'h2',
  title,
  children,
  className,
}) => {
  return (
    <ContainerTag className={`${classes.container} ${className}`}>
      <div className={classes.container__inner}>
        <InenerTitleTag className={classes.title}>{title}</InenerTitleTag>
        {children}
      </div>
    </ContainerTag>
  );
};

Container.propTypes = {
  ContainerTag: PropTypes.string,
  InenerTitleTag: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
