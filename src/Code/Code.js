import 'prismjs';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';

export default class Code extends Component {

  static propTypes = {
    Animation: PropTypes.any.isRequired,

    theme: PropTypes.any.isRequired,
    classes: PropTypes.any.isRequired,

    animate: PropTypes.bool,
    show: PropTypes.bool,
    animation: PropTypes.object,

    /**
     * If the code snippet is inline or block type.
     */
    type: PropTypes.oneOf(['code', 'pre']),

    /**
     * The programming language. Supported by [Prism](http://prismjs.com/).
     */
    language: PropTypes.string,
  };

  static defaultProps = {
    Animation: AnimationComponent,
    show: true,
    type: 'code',
    language: 'javascript',
  };

  componentDidMount () {
    this.highlight();
  }

  componentDidUpdate () {
    this.highlight();
  }

  render () {

    const {
      Animation,
      animation,
      theme,
      classes,
      animate,
      show,
      type: Wrapper,
      language,
      className,
      children,
      ...etc
    } = this.props;

    const cls = cx(classes.root, className);

    return (
      <Animation
        animate={animate}
        show={show}
        timeout={theme.animTime}
        {...animation}
      >
        {anim => (
          <span className={cx(cls, classes[anim.status])} {...etc}>
            <Wrapper
              className={cx(classes.wrapper, 'language-' + language)}
              ref={el => (this.wrapper = el)}
            >
              {children}
            </Wrapper>
          </span>
        )}
      </Animation>
    );
  }

  highlight () {
    Prism.highlightElement(this.wrapper);
  }
}
