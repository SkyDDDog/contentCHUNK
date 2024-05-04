import { Link } from '@saas-ui/react'
import { IconButton, IconButtonProps, forwardRef } from '@chakra-ui/react'
import { ArrowLeftIcon } from './icons'

export interface BackButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  'aria-label'?: string
  href?: string | object
}

export const BackButton = forwardRef<BackButtonProps, 'button'>(
  (props, ref) => {
    const { href, variant = 'ghost', mr = 2, ...rest } = props
    const icon = rest.icon || <ArrowLeftIcon />

    let as
    if (href) {
      as = Link
    }

    return (
      <IconButton
        ref={ref}
        aria-label="back"
        href={href}
        as={as}
        icon={icon}
        variant={variant}
        mr={mr}
        {...rest}
      />
    )
  },
)
