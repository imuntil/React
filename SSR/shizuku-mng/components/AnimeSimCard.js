import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './AnimeSimCard.module.scss'
import { Button, Icon, Checkbox } from 'antd'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const Field = memo(function Field({
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
})

const IDS = memo(function IDS({ ids }) {
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
})

const AnimeSimCard = memo(function AnimeSimCard(props) {
  const { is = '', data = {}, onChoose, onChange, checks = {} } = props
  const chooseAble = is && is !== 'RESULT'
  const computeChecked = key =>
    Array.isArray(checks[key])
      ? checks[key].indexOf(is) > -1
      : checks[key] === is
  const handleChange = (e, key) => {
    onChange(e.target.checked, key, data[key], is, data.from)
  }
  return (
    <div className={cx('sim-card', is.toLowerCase())}>
      {is ? <h3>{is}</h3> : null}
      <Field chooseAble={false} label="来源">
        {(data.from || '').toString()}
      </Field>
      <Field chooseAble={false} label="ID">
        {data.id}
      </Field>
      {data.ids ? (
        <Field chooseAble={false} label="IDs">
          <IDS ids={data.ids} />
        </Field>
      ) : null}
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
      {!is || is === 'RESULT' ? null : (
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
})

AnimeSimCard.propTypes = {
  data: PropTypes.shape({
    from: PropTypes.string,
    cover: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  is: PropTypes.oneOf(['TARGET', 'ORIGIN', 'RESULT']),
  onChoose: PropTypes.func
}

export default AnimeSimCard
