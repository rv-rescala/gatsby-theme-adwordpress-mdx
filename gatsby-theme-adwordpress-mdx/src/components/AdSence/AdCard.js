import React, { useEffect } from 'react'

export const AdCard = ({ dataAdClient, dataAdSlot }) => {
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
      <h1>こんばんは</h1>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={dataAdClient}
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  )
}
