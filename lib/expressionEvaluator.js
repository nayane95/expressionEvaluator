import parser from './parser'

export default function (expression, context = {}) {
  if (!expression) return true
  const contextMap = Object.keys(context).reduce(
    (map, key) => ({
      ...map,
      [`{${key}}`]: context[key],
    }),
    {}
  )
  return parser.expressionToValue(expressionReplacer(expression), {
    ...contextMap,
  })
}
// add expression replacer for change expressions
function expressionReplacer(expression) {
  const currentYear = new Date().getFullYear()
  const replacedExpression = expression.replace('current_year', currentYear)
  return replacedExpression
}
