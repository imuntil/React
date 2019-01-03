import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './AnimeSimCard.module.scss'
import cssModules from 'react-css-modules'
import { Button, Icon, Checkbox } from 'antd'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const Field = memo(
  cssModules(function Field({
    label,
    children,
    onChange,
    chooseAble = true,
    checked
  }) {
    return (
      <div styleName="wrap">
        <div styleName="label">{label}</div>
        <div styleName="value">{children}</div>
        {!chooseAble ? null : (
          <div styleName="use">
            <Checkbox checked={checked} onChange={onChange} />
          </div>
        )}
      </div>
    )
  },
  styles)
)

const IDS = memo(
  cssModules(function IDS({ ids }) {
    return (
      <div>
        {Object.entries(ids).map(v => (
          <div styleName="line" key={v[0]}>
            <span styleName="key">{v[0]}</span>
            <span styleName="key-value">{v[1]}</span>
          </div>
        ))}
      </div>
    )
  }, styles)
)

const AnimeSimCard = memo(
  cssModules(function AnimeSimCard(props) {
    const {
      is = '',
      data = {},
      onChoose,
      active,
      onChange,
      checks = {}
    } = props
    const chooseAble = is !== 'RESULT'
    const computeChecked = key =>
      Array.isArray(checks[key])
        ? checks[key].indexOf(is) > -1
        : checks[key] === is
    const handleChange = (e, key) => {
      onChange(e.target.checked, key, data[key], is, data.from)
    }
    return (
      <div className={cx('sim-card', is.toLowerCase(), { active })}>
        <h3>{is}</h3>
        <Field
          chooseAble={chooseAble}
          label="来源"
          onChange={e => handleChange(e, 'from')}
          checked={computeChecked('from')}
        >
          {data.from}
        </Field>
        <Field
          chooseAble={chooseAble}
          label="封面"
          onChange={e => handleChange(e, 'cover')}
          checked={computeChecked('cover')}
        >
          <img
            styleName="cover"
            src={`https://dummyimage.com/200x200?text=${data.cover || 'NONE'}`}
            alt=""
          />
        </Field>
        <Field
          chooseAble={chooseAble}
          label="番剧名"
          onChange={e => handleChange(e, 'name')}
          checked={computeChecked('name')}
        >
          {data.name}
        </Field>
        <Field
          chooseAble={chooseAble}
          label={data.ids ? 'IDs' : 'ID'}
          onChange={e => handleChange(e, 'id')}
          checked={computeChecked('id')}
        >
          {!data.ids ? data.id : <IDS ids={data.ids} />}
        </Field>
        <Field
          chooseAble={chooseAble}
          label="放送时间"
          onChange={e => handleChange(e, 'date')}
          checked={computeChecked('date')}
        >
          {data.date}
        </Field>
        <Field
          chooseAble={chooseAble}
          label="其他"
          onChange={e => handleChange(e, 'some')}
          checked={computeChecked('some')}
        >
          {data.some}
        </Field>
        {is === 'RESULT' ? null : (
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
        )}
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
