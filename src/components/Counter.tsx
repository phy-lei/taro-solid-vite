import { defineCustomElement as defineTaroButtonCore } from '@tarojs/components/dist/components/taro-button-core';
import { createSignal } from 'solid-js'
import './counter.css'
defineTaroButtonCore()
export default function Counter(props) {
  const [count, setCount] = createSignal(0)

  const add = () => {
    setCount(count() + 1)
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', count());
  }

  const sub = () => {
    setCount(count() - 1)
  }



  return (
    <>
      <taro-view-core class="flex">
        <taro-button-core onClick={add}>+</taro-button-core>
        <taro-text-core class="add">{count()}</taro-text-core>
        <taro-button-core onClick={sub}>-</taro-button-core>
      </taro-view-core>
    </>
  )
}
