/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { AdCard } from '../components/AdSence'

export const MyAdCard = props => (
  <Styled.div {...props}>
    <AdCard {...props} />
  </Styled.div>
)
