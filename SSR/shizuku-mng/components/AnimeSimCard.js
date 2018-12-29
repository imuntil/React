import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './AnimeSimCard.module.scss'
import cssModules from 'react-css-modules'
import { Button, Icon } from 'antd'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const AnimeSimCard = memo(
  cssModules(function AnimeSimCard(props) {
    const { is = '', data = {}, onChoose, active } = props
    return (
      <div className={cx('sim-card', is.toLowerCase(), { active })}>
        <h3>{is}</h3>
        <div styleName="wrap">
          <span styleName="label">来源</span>
          <span styleName="value">{data.from}</span>
        </div>
        <div styleName="wrap">
          <span styleName="label">封面</span>
          <span styleName="value">
            <img
              styleName="cover"
              src="https://dummyimage.com/200x200?text=Anime"
              alt=""
            />
          </span>
        </div>
        <div styleName="wrap">
          <span styleName="label">番剧名</span>
          <span styleName="value">{data.name}</span>
        </div>
        <div styleName="wrap">
          <span styleName="label">ID</span>
          <span styleName="value">{data.id}</span>
        </div>
        <span styleName="wrap">
          <span styleName="label">放送时间</span>
          <span styleName="value">每周日</span>
        </span>
        <span styleName="wrap">
          <span styleName="label">其他</span>
          <span styleName="value">x.x.</span>
        </span>
        <div styleName="btn">
          <Button
            onClick={() => onChoose(is)}
            icon="check"
            size="small"
            type="primary"
          >
            Use This
          </Button>
        </div>
      </div>
    )
  }, styles)
)

AnimeSimCard.propTypes = {
  data: PropTypes.shape({
    from: PropTypes.string,
    cover: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  is: PropTypes.oneOf(['TARGET', 'ORIGIN']),
  onChoose: PropTypes.func,
  active: PropTypes.bool
}

export default AnimeSimCard
