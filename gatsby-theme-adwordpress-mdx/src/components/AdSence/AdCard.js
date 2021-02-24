import React, { useEffect } from 'react'
import { useSiteMetadata, useAllMdxWpPosts } from '../../Hooks'

export const AdCard = props => {
  const siteMetadata = useSiteMetadata()
  console.log('dataAdClient ' + siteMetadata.config.adSence.dataAdClient)
  console.log('dataAdSlot ' + siteMetadata.config.adSence.dataAdSlot)

  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV !== 'development') {
      console.log('ad on')
      window.adsbygoogle.push({})
    } else {
      console.log('ad off')
    }
  }, [])

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={siteMetadata.config.adSence.dataAdClient}
        data-ad-slot={siteMetadata.config.adSence.dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  )
}
