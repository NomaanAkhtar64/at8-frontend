import cloneNodeForField from './cloneNodeForField'
import { onValueUpdate, Values } from './valueType'

const getFieldChild = (
  children: React.ReactNode,
  initialValues: Values,
  disable: boolean,
  onUpdate: onValueUpdate
) => {
  if (Array.isArray(children)) {
    return children.map((c, i) =>
      cloneNodeForField(c, initialValues, disable, onUpdate, i)
    )
  }
  return cloneNodeForField(children, initialValues, disable, onUpdate)
}

export default getFieldChild
