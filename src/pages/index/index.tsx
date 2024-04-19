import { View, Text, Button } from '@tarojs/components'
import Counter from '@/components/Counter'
import { createSignal, onMount, createMemo} from 'solid-js'
import './index.css'


const colorMap = ["red", "green", "blue"];
export default function Index() {
  const [color, setColor] = createSignal(0)
  const [cls, setCls] = createSignal('')
  let divRef

  const currentColor = createMemo(() => colorMap[color() % 3])

  onMount(() => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', divRef);
  })

  return (
    <View class="index">
      <View data-name="uid" class="flex" style={{color: currentColor(), margin: '10px'}} classList={{ bold: currentColor() === "blue" }}>
        <Text ref={divRef}>Hello world! </Text>
      </View>
      <View style={`color: ${currentColor()}`} id={currentColor()}>
        <Text class={cls()}>Hello world2! </Text>
      </View>
      <Button onClick={() => setCls('bold')}>set class</Button>
      <Button onClick={() => setColor(color() + 1)}>set style</Button>
      <Counter count={0}></Counter>
      <View>{Math.random()}</View>
    </View>
  )
}
