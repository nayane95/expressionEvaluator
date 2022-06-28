import { ExpressionParser } from 'expressionparser'

const conditionLanguage = {
  AMBIGUOUS: {},
  INFIX_OPS: {
    eq(a, b) {
      return a() === b()
    },
    ne(a, b) {
      return a() !== b()
    },
    gt(a, b) {
      return a() > b()
    },
    lt(a, b) {
      return a() < b()
    },
    ge(a, b) {
      return a() >= b()
    },
    le(a, b) {
      return a() <= b()
    },
    or(a, b) {
      return !!a() || !!b()
    },
    and(a, b) {
      return !!a() && !!b()
    },
    incl(a, b) {
      const lhs = a()
      if (!Array.isArray(lhs)) return false
      if (lhs.length === 0) return false
      return a().includes(b())
    },
    excl(a, b) {
      const lhs = a()
      if (!Array.isArray(lhs)) return false
      if (lhs.length === 0) return false
      return !a().includes(b())
    },
  },
  PREFIX_OPS: {
    LEN(expr) {
      return Array.isArray(expr()) ? expr().length : 0
    },
    POW(expr) {
      return Math.pow(expr[0], expr[1])
    },
    HASVAL(expr) {
      return expr() !== ''
    },
    HASNOTVAL(expr) {
      return expr() === ''
    },
  },
  PRECEDENCE: [
    ['LEN', 'POW', 'INCL', 'EXCL', 'HASVAL', 'HASNOTVAL'],
    ['incl', 'excl'],
    ['lt', 'gt', 'le', 'ge'],
    ['eq', 'ne'],
    ['and', 'or'],
  ],
  GROUP_OPEN: '(',
  GROUP_CLOSE: ')',
  SEPARATOR: ' ',
  SYMBOLS: [','],

  termDelegate(term) {
    return term
  },
}

const parser = new ExpressionParser(conditionLanguage)

export default parser
