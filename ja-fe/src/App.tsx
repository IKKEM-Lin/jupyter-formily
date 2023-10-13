import React from 'react';
const path = './component/process.env.COMPONENT_NAME.tsx';
const temp = import.meta.glob('./component/process.env.COMPONENT_NAME.tsx', { eager: true })
// console.log({temp})
const Widget = (temp[path] as any).default

// console.log(Widget)

const App: React.FC = () => <Widget />;

export default App;