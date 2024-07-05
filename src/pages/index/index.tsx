import { View, Text, Button } from '@tarojs/components'
import Counter from '../../components/Counter'
import { createSignal, onMount, createMemo, createEffect } from 'solid-js'
import './index.css'


const colorMap = ["red", "green", "blue"];

export default function Index() {
  const [color, setColor] = createSignal(0)
  const [cls, setCls] = createSignal('')
  let divRef

  const currentColor = createMemo(() => colorMap[color() % 3])

  onMount(() => {
    console.log('%c [ 1212222 ]', 'font-size:13px; background:pink; color:#bf2c9f;', divRef);
  })

  createEffect(() => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', currentColor());
  })

  return (
    <View class="index">
      <button>12123</button>
      <View data-name={Math.random()} class="flex" style={{color: currentColor(), margin: '10px'}} classList={{ bold: currentColor() === "blue" }}>
        <Text ref={divRef}>Hello world! </Text>
      </View>
      <View style={`color: ${currentColor()}`} id={currentColor()}>
        <Text class={cls()}>Hello world2! </Text>
      </View>
      <View textContent="12312"></View>
      <View innerHTML="<taro-view-core>4555</taro-view-core>"></View>
      <Button onClick={() => {setCls('bold'); console.log(cls())}}>set class</Button>
      <Button onClick={() => setColor(color() + 1)}>set style</Button>
      <Counter count={color()}></Counter>
      <View>{Math.random()}</View>
    </View>
  )
}
