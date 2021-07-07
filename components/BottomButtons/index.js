import StatusText from '@/components/StatusText'
import Keycap from '@/components/Keycap'
import { isMobile } from 'react-device-detect'

const Item = {
  key: Keycap,
  text: StatusText,
}

const BottomButtons = ({ className, data }) => (
  <div className={className}>
    {data.map((item) => {
      if (isMobile && item.type === 'text') return null
      const Render = Item[item.type]

      return (
        <Render
          inverted
          bordered
          small
          red={item.red}
          fitContent={isMobile}
          value={isMobile ? item.mobile : item.value}
          onKeyDown={item.onKeyDown}
          onClick={item.onClick}
          className={item.className}
          active={item.active}
        >
          {item.text}
        </Render>
      )
    })}
  </div>
)

export default BottomButtons
