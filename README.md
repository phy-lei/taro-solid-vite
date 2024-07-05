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

而stencil用solid导出的createSolidComponent的函数，是将stencil进行包裹，并且把defineCustomElement注册上，这样其实并不需要在关心组件的命名导出是怎样的了。而且在solid中，h函数的响应式是有问题的，可以看这个 [示例](https://playground.solidjs.com/anonymous/dd675c5d-7ed4-48fa-af71-9abbb55a2f21)

随着props的更新，他会全量更新，这个机制违背了solid的原则，我定义为响应式失效。


## 解决
本来只要对于web-component的组件来说，solid有一个solid-element的库去定义，这里面的实现跟stencil是很相似的，都是只要将web-component注册上，在使用自定义标签，就能正确生效了，也如这个项目的示例代码一样。
那么只要基于babel插件进行转译就好了。

- import { Button } from "@tarojs/components"; 转译为 import { defineCustomElement as defineTaroButtonCore } from '@tarojs/components/dist/components/taro-button-core';
- 转译后，并且调用defineTaroButtonCore()
- 对于jsx组件Button，转译为taro-button-core，并且走createElement路线


难点：
目前有的组件命名方式并不是统一的`taro-${Component}-core`，例如taro-picker-group，这个就没有-core，所以得组件名的映射，但是如果每次新增一个组件，就又得在该文件新增一个映射，为了考虑方便维护的问题，参考taro-components-library-react的自动生成components的脚本，可以扫描@tarojs/components的组件生成映射。
pnpm
```bash
pnpm link --global @tarojs/components @tarojs/plugin-framework-solid @tarojs/webpack5-runner babel-preset-taro  @tarojs/plugin-platform-h5
```
