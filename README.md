## todo 
目前发现，本来对于stencil的solid编译来说，就是编译成web-components，而对于这种写法
```tsx
import { View, Text, Button, Icon } from "@tarojs/components";
```
babel编译的结果会多套一层get children，而这个其实编译出来的是web-components。类似这样


```tsx
<taro-view-core class="index">
  <taro-view-core style={`color: ${color()}`} >
    <taro-text-core>{count()}</taro-text-core>
  </taro-view-core>
  <taro-button-core>set color</taro-button-core >
  <taro-button-core>add</taro-button-core>
  <taro-view-core>
    {Math.random()}
  </taro-view-core>
  <Counter></Counter>
</taro-view-core>
```

而stencil用solid导出的createSolidComponent的函数，是将stencil进行包裹，并且把defineCustomElement注册上，这样其实并不需要在关心组件的命名导出是怎样的了。而且在solid中，h函数的响应式是有问题的，可以看这个示例 https://playground.solidjs.com/anonymous/1aafbe32-9fdf-4912-be39-d64b074c28a2

示例中展示h函数在props中，会失去响应式，这也是由于solid的getter并不能监听到h中这种对象的props下发
```
h("div", { style: `color: ${props.color}` }, 2222); // 失去响应式

h("div", { style: `color: ${color()}` }, 2222); // 在同一个组件可以响应式
```
而不通过props下发的话，这个color是可以响应式的，对于props的跟踪，solid采取的措施应该是不一致，还有待深入研究。

## 解决
本来只要对于web-component的组件来说，solid有一个solid-element的库去定义，这里面的实现跟stencil是很相似的，都是只要将web-component注册上，在使用自定义标签，就能正确生效了，也如这个项目的示例代码一样。
那么只要基于babel插件进行转译就好了。

- import { Button } from "@tarojs/components"; 转译为 import { defineCustomElement as defineTaroButtonCore } from '@tarojs/components/dist/components/taro-button-core';
- 转译后，并且调用defineTaroButtonCore()
- 对于jsx组件Button，转译为taro-button-core，并且走createElement路线
