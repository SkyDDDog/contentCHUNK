import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const variantSolid = defineStyle((props) => {
  const { colorScheme: c, colorMode } = props

  let color = `${c}.500`
  let hoverColor = `${c}.600`

  if (c === 'neutral' && colorMode === 'dark') {
    color = 'white'
    hoverColor = 'whiteAlpha.800'
  } else if (c === 'neutral') {
    color = 'black'
    hoverColor = 'blackAlpha.800'
  }

  return {
    borderWidth: '1px',
    borderColor: color,
    boxShadow: 'xs',
    bg: color,
    color: 'white',
    fontWeight: 'medium',
    _hover: {
      borderColor: hoverColor,
      bg: hoverColor,
    },
    _dark: {
      boxShadow: 'dark-xs',
    },
  }
})

const variantGhost = defineStyle((props) => {
  return {
    fontWeight: 'medium',
    _checked: {
      bg: 'blackAlpha.100',
    },
    _dark: {
      _checked: {
        bg: 'whiteAlpha.100',
      },
    },
  }
})

const variantOutline = defineStyle((props) => {
  const { colorScheme: c } = props

  if (c === 'gray') {
    return {
      fontWeight: 'medium',
    }
  }

  return {
    fontWeight: 'medium',
    color: `${c}.500`,
    _hover: {
      color: `${c}.400`,
      bg: 'blackAlpha.50',
    },
    _dark: {
      color: `${c}.500`,
      _hover: {
        color: `${c}.400`,
        bg: 'whiteAlpha.50',
      },
    },
  }
})

const variantPrimary = defineStyle((props) => {
  return variantSolid({ ...props, colorScheme: 'primary' })
})

const variantSecondary = defineStyle({
  borderWidth: '1px',
  borderColor: 'gray.200',
  boxShadow: 'xs',
  bg: 'white',
  fontWeight: 'medium',
  color: 'inherit',
  _hover: {
    borderColor: 'gray.300',
    bg: 'gray.50',
  },
  _dark: {
    boxShadow: 'dark-xs',
    borderColor: 'gray.600',
    bg: 'gray.700',
    _hover: {
      borderColor: 'gray.500',
      bg: 'gray.600',
    },
  },
})

const variantTertiary = defineStyle({
  borderWidth: '1px',
  borderColor: 'gray.200',
  bg: 'gray.200',
  color: 'black',
  fontWeight: 'medium',
  _hover: {
    borderColor: 'gray.300',
    bg: 'gray.200',
  },
  _dark: {
    borderColor: 'gray.700',
    bg: 'gray.700',
    color: 'white',
    _hover: {
      borderColor: 'gray.600',
    },
  },
})

export const sizes = {
  lg: defineStyle({
    h: '10',
    minW: '10',
    fontSize: 'lg',
    px: '4',
    borderRadius: 'md',
  }),
  md: defineStyle({
    h: '8',
    minW: '8',
    fontSize: 'md',
    px: '3',
    borderRadius: 'sm',
  }),
  sm: defineStyle({
    h: '7',
    minW: '7',
    fontSize: 'sm',
    px: '3',
    borderRadius: 'sm',
  }),
  xs: defineStyle({
    h: '6',
    minW: '6',
    fontSize: 'xs',
    px: '2',
    borderRadius: 'sm',
  }),
}

export const buttonStyles = defineStyleConfig({
  defaultProps: {
    size: 'sm',
    variant: 'secondary',
  },
  variants: {
    solid: variantSolid,
    outline: variantOutline,
    ghost: variantGhost,
    primary: variantPrimary,
    secondary: variantSecondary,
    tertiary: variantTertiary,
  },
  sizes,
})
