import { View, Text, Button } from '@tarojs/components'
import { createSignal } from 'solid-js'
import './counter.css'

export default function Counter(props) {
  const [count, setCount] = createSignal(props.count)

  const add = () => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', count());
    setCount(count() + 1)
  }

  const sub = () => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', count());
    setCount(count() - 1)
  }

  return (
    <>
      <View class="flex">
        <Button onClick={add}>+</Button>
        <Text class="add">{count()}
          <Text>{Math.random()}</Text>
        </Text>
        <Button onClick={sub}>-</Button>
      </View>
    </>
  )
}
