import { View, Text, Button } from '@tarojs/components'
import Counter from '@/components/Counter'
import { createSignal, onMount } from 'solid-js'
import './index.css'

export default function Index() {
  const [color, setColor] = createSignal('red')
  const [cls, setCls] = createSignal('')
  let divRef

  onMount(() => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', divRef);
  })

  return (
    <View class="index">
      <View data-name="uid" style={{color: color(), margin: '10px'}} classList={{ bold: color() === "blue" }}>
        <Text ref={divRef}>Hello world! </Text>
      </View>
      <View style={`color: ${color()}`} id={color()}>
        <Text class={cls()}>Hello world2! </Text>
      </View>
      <Button onClick={() => setCls('bold')}>set class</Button>
      <Button onClick={() => setColor('blue')}>set style</Button>
      <Counter count={0}></Counter>
      <View>{Math.random()}</View>
    </View>
  )
}
