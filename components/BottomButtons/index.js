import StatusText from '@/components/StatusText'
import Keycap from '@/components/Keycap'
import useIsMobile from '@/hooks/useIsMobile'

const Item = {
  key: Keycap,
  text: StatusText,
}

const BottomButtons = ({ className, data }) => {
  const isMobile = useIsMobile()

  return (
    <div className={className}>
      {data.map((item, i) => {
        if (isMobile && item.type === 'text') return null
        const Render = Item[item.type]

        return (
          <Render
            inverted
            bordered
            small
            key={i}
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
}

export default BottomButtons
