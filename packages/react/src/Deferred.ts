import { ReactElement, useEffect, useState } from 'react'
import usePage from './usePage'

interface DeferredProps {
  children: ReactElement | number | string
  fallback: ReactElement | number | string
  data: string | string[]
}

const Deferred = ({ children, data, fallback }: DeferredProps) => {
  if (!data) {
    throw new Error('`<Deferred>` requires a `data` prop to be a string or array of strings')
  }

  const [loaded, setLoaded] = useState(false)
  const pageProps = usePage().props
  const keys = Array.isArray(data) ? data : [data]

  useEffect(() => {
    setLoaded(keys.every((key) => pageProps[key] !== undefined))
  }, [pageProps, keys])

  return loaded ? children : fallback
}

Deferred.displayName = 'InertiaDeferred'

export default Deferred
