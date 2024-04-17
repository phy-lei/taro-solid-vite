import { defineCustomElement as defineTaroButtonCore } from '@tarojs/components/dist/components/taro-button-core';
import { useLoad } from "@tarojs/taro";
import Counter from "@/components/Counter";
import { createSignal } from "solid-js";
import "./index.css";
defineTaroButtonCore()

export default function Index() {
  const [color, setColor] = createSignal("red");
  const [count, setCount] = createSignal(0)
  useLoad(() => {
    console.log(`[ _createElement('input') ] >`,)
  });



  return (
    <taro-view-core class="index">
      <taro-view-core style={`color: ${color()}`} >
        <taro-text-core>{count()}</taro-text-core>
      </taro-view-core>
      <taro-button-core  onClick={() => setColor('blue')}>set color</taro-button-core >
      <taro-button-core onClick={() => setCount(count() +1)}>add</taro-button-core>
      <taro-view-core>
        {Math.random()}
      </taro-view-core>
      <Counter></Counter>
    </taro-view-core>
  );
}
