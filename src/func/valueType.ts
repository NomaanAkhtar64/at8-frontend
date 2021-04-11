export interface Values {
  [key: string]:
    | JSX.IntrinsicElements['input']['value']
    | JSX.IntrinsicElements['select']['value']
}
export type onValueUpdate = (name: string, value: Values['key']) => void
